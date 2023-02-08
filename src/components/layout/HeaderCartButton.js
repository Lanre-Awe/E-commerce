import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const HeaderCartButton = (props) => {
  const quantity = useSelector((state) => state.cart.totalAmount);

  return (
    <Link to="/cart" className={styles.cartLink}>
      <button className={styles.button} onClick={props.show}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{quantity}</span>
      </button>
    </Link>
  );
};

export default HeaderCartButton;
