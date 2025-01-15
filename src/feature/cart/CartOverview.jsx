import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const getCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 uppercase text-stone-200 py-4 px-4 sm:px-6 md:text-base ">
      <p className="text-stone-300  sm:space-x=6 space-x-4 ">
        <span>{totalCartQuantity}</span>
        <span>${getCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
