import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import checkmark from "./checkmark.png";
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { cartActions } from "../../store/cartSlice";
import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cartItem = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalAmount);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState(false);
  const [initial, setInitial] = useState(localStorage.getItem("INITIAL"));
  const updating = useSelector((state) => state.cart.updating);
  const dispatch = useDispatch();

  const orderHandler = () => {
    if (currentUser) {
      setOrdered(true);

      setTimeout(() => {
        setOrdered(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const uid = JSON.parse(currentUser).uid;
      const cartDoc = doc(db, "cart-items", uid);

      if (loading && cartDoc) {
        const addCart = async () => {
          console.log("loading added docu");
          await setDoc(doc(db, "cart-items", uid), {
            uid: uid,
            cartItem: cartItem,
            totalPrice: totalPrice,
            quantity: quantity,
          });
        };
        addCart();
        const getUserCart = async () => {
          const cart = await getDoc(doc(db, "cart-items", uid));
          if (cart) {
            const cartDetail = cart.data();
            console.log(cartDetail);
            setUserCart(cartDetail);

            setLoading(false);
          }
        };
        getUserCart();
      } else if (cartDetail && updating) {
        console.log("update");
        setLoading(true);
        const updateCart = async () => {
          await updateDoc(cartDoc, {
            cartItem: cartItem,
            totalPrice: totalPrice,
            quantity: quantity,
          });
          console.log(loading);
          dispatch(cartActions.onNotUpdate());
        };
        updateCart();
        const getUserCart = async () => {
          console.log("gotten cart after updating");
          const cart = await getDoc(doc(db, "cart-items", uid));
          if (cart) {
            const cartDetail = cart.data();
            console.log(cartDetail);
            setUserCart(cartDetail);

            setLoading(false);
          }
        };
        getUserCart();
      }
    } else {
      setLoading(false);
    }
  }, [cartItem, totalPrice, quantity, updating, loading, dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "CART",
      JSON.stringify({
        cartItem: cartItem,
        totalPrice: totalPrice,
        quantity: quantity,
      })
    );
    localStorage.setItem("INITIAL", initial);
  }, [cartItem, totalPrice, quantity, initial]);

  const cartDetail = currentUser ? userCart.cartItem : cartItem;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {!loading &&
        cartDetail.map((item) => (
          <CartItem
            key={item.name}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            id={item.id}
            total={item.totalPrice}
            category={item.category}
            image={item.img}
          />
        ))}
    </ul>
  );

  const clearCart = () => {
    localStorage.removeItem("CART");
    setLoading(true);
    window.location.reload(true);
  };

  const modalActions = (
    <>
      <div className={classes.checkoutContainer}>
        <div className={classes.checkout}>
          <div className={classes.heading}>
            <span>CART SUMMARY</span>
          </div>
          <div className={classes.details}>
            <span className={classes.subtotal}>Subtotal</span>
            <span className={classes.totalPrice}>
              {!loading &&
                `NGN ${
                  currentUser
                    ? userCart.totalPrice.toLocaleString("en-US")
                    : totalPrice.toLocaleString("en-US")
                }`}
            </span>
          </div>
          {!currentUser ? (
            <Link to="/authentication">
              <button className={classes.button} onClick={orderHandler}>
                {!loading && totalPrice !== 0
                  ? `Checkout(NGN ${
                      currentUser
                        ? userCart.totalPrice.toLocaleString("en-US")
                        : totalPrice.toLocaleString("en-US")
                    })`
                  : "Proceed to Checkout"}
              </button>
            </Link>
          ) : (
            <button className={classes.button} onClick={orderHandler}>
              {!loading && totalPrice !== 0
                ? `Checkout(NGN ${
                    currentUser
                      ? userCart.totalPrice.toLocaleString("en-US")
                      : totalPrice.toLocaleString("en-US")
                  })`
                : "Proceed to Checkout"}
            </button>
          )}
        </div>
        <button className={classes.clear} onClick={clearCart}>
          clear cart
        </button>
      </div>
    </>
  );
  return (
    <>
      {ordered && (
        <Modal>
          <div className={classes.order}>
            <img src={checkmark} alt="" />
            <div>Order Placed Successfully</div>
          </div>
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && cartDetail.length < 1 && (
        <div className={classes.empty}>
          <span>cart empty</span>
          <Link to="/">
            <button>shop</button>
          </Link>
        </div>
      )}
      {!loading && cartDetail.length > 0 && (
        <div>
          <div className={classes.cartItem}>
            <div className={classes.cartQuantity}>
              Cart({currentUser ? userCart.quantity : quantity})
            </div>
            {cartItems}
          </div>

          {modalActions}
        </div>
      )}
    </>
  );
};

export default Cart;
