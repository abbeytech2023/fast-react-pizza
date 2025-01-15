import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./feature/menu/Menu";
import Cart from "./feature/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./feature/order/CreateOrder";
import Order, { loader as orderLoader } from "./feature/order/Order";
import AppLayout from "./UI/Applayout";
import Error from "./UI/Error";
import { action as UpdateOrderAction } from "./feature/order/UpdateOrder";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
