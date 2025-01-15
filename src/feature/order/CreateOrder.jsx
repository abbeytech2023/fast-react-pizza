import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../util/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user.username);

  const isLoadingAddress = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCarPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCarPrice * 0.2 : 0;
  const totalPrice = totalCarPrice + priorityPrice;

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="order/new">   OR*/}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="rounded-full border w-full border-stone-200 px-4 py-2 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400  md:px-6 md:py-3"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 p-2 rounded-md bg-red-100">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 w-full flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <input
            className="rounded-full border border-stone-200 px-4 py-2 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 w-full md:px-6 md:py-3"
            type="text"
            name="address"
            defaultValue={address}
            disabled={isLoadingAddress}
            required
          />
          {addressStatus === "error" && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {errorAddress} error
            </p>
          )}
          <span className="absolute right-[3px]">
            <Button
              disabled={isLoadingAddress}
              type="small"
              onClick={(e) => {
                e.preventDefault();
                console.log(fetchAddress);

                dispatch(fetchAddress());
              }}
            >
              Get position
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting} className="">
            {isSubmitting
              ? "placing order"
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//an acton function that gets information from the form
export async function action({ request }) {
  // A regular web api #request.form data
  const formData = await request.formData();
  console.log(formData);
  //converting the request.formData to an object
  const data = Object.fromEntries(formData);
  // console.log(data);

  //converting the cart to object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  //if no errors everything is ok, create new order and re-direct
  const newOrder = await createOrder(order);

  // Do not overuse
  store.dispatch(clearCart());

  // Redirect() is another function provided to us by react router
  //Basically to create a new response or request
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
