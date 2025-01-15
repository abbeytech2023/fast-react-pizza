import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
    console.log(pizzaId);
  }
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={handleDeleteItem} type="small">
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
