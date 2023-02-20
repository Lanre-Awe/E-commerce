import styles from "./ShopItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { productAction } from "../../store/productSlice";
import { DummyData } from "./Shoplist";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader";

const ShopItem = (props) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalAmount);
  const adding = useSelector((state) => state.ui.adding);
  const [item, setItem] = useState("");

  const addHandler = (index) => {
    setItem(index);
    dispatch(
      cartActions.onAdd({
        name: props.name,
        price: props.price,
        id: props.id,
        img: props.img,
        category: props.category,
      })
    );
    dispatch(cartActions.onUpdate());
  };

  useEffect(() => {
    setTimeout(() => {
      setItem("");
    }, 1000);
  }, [item]);
  useEffect(() => {
    localStorage.setItem(
      "CART",
      JSON.stringify({
        cartItem: cartItem,
        totalPrice: totalPrice,
        quantity: quantity,
      })
    );
  }, [cartItem, totalPrice, quantity]);
  const detailHandler = (name) => {
    const productDetail = DummyData.filter((product) => product.name === name);
    dispatch(productAction.onView(productDetail));
  };

  return (
    <div className={styles.card}>
      <Link to={`/${props.category}/${props.name.toLowerCase()}`}>
        <div
          className={styles.imgBox}
          onClick={detailHandler.bind(this, props.name)}
        >
          <img src={props.img} alt="mouse corsair" className={styles.mouse} />
        </div>
      </Link>

      <div className={styles.contentBox}>
        <Link to={`/${props.category}/${props.name.toLowerCase()}`}>
          <div
            className={styles.name}
            onClick={detailHandler.bind(this, props.name)}
          >
            {props.name}
          </div>
        </Link>
        <div className={styles.price}>
          ₦ {props.price.toLocaleString("en-US")}
        </div>
        <button
          disabled={adding ? true : false}
          className={styles.buy}
          onClick={addHandler.bind(this, props.index)}
        >
          {item === props.index && adding ? <Loader /> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
