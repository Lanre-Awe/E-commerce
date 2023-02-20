import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { productAction } from "../../store/productSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items);

  const price = `NGN ${props.price.toLocaleString("en-US")}`;

  const increaseItem = () => {
    dispatch(
      cartActions.onAdd({
        price: props.price,
        id: props.id,
        name: props.name,
      })
    );

    dispatch(cartActions.onUpdate());
  };

  const removeItem = () => {
    dispatch(
      cartActions.onRemove({
        id: props.id,
        price: props.price,
        name: props.name,
      })
    );
    dispatch(cartActions.onUpdate());
  };
  const getProduct = (name) => {
    const product = cartItem.filter((productItem) => productItem.name === name);
    dispatch(productAction.onView(product));
  };

  return (
    <li
      className={classes["cart-item"]}
      onClick={getProduct.bind(this, props.name, props.category)}
    >
      <Link to={`/${props.category}/${props.name.toLowerCase()}`}>
        <div>
          <div className={classes.imgContainer}>
            <img src={props.image} alt="" />
          </div>
          <div className={classes.itemName}>{props.name}</div>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
          </div>
        </div>
      </Link>
      <div className={classes.actions}>
        <button onClick={removeItem}>−</button>
        <span className={classes.amount}>x {props.quantity}</span>
        <button onClick={increaseItem}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
