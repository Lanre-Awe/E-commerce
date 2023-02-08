import { Fragment, useEffect } from "react";
import Header from "./components/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";
import Home from "./pages/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import CategoryDisplay from "./components/category/CategoryDisplay";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import { auth } from "./firebase/firebase";
import { AuthAction } from "./store/AuthSlice";
import Account from "./components/Account";
let initial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const loading = useSelector((state) => state.auth.loading);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const closeNotif = () => {
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 2000);
    };
    const sendCart = async () => {
      const response = await fetch(
        "https://react-http-684ce-default-rtdb.firebaseio.com/cartItem.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Item added to Cart",
        })
      );
      closeNotif();
    };

    if (initial) {
      initial = false;
      return;
    }
    sendCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "failed",
          message: "Could not add Item to Cart",
        })
      );
      closeNotif();
    });
  }, [cart, dispatch]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(AuthAction.onNewUser(JSON.stringify(user)));
      }
      dispatch(AuthAction.onLoading());
    });
    console.log(currentUser);
    return unsubscribe;
  }, [currentUser, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <header>{!loading && <Header />}</header>
      <Switch>
        {!loading && (
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        )}
        {!loading && (
          <Route path="/home" exact>
            <Home />
          </Route>
        )}
        {!loading && (
          <Route path="/authentication">
            <AuthPage />
          </Route>
        )}
        {!loading && (
          <Route path="/cart">
            <CartPage />
          </Route>
        )}
        {!loading && (
          <Route path="/account">
            <Account />
          </Route>
        )}
        {!loading && (
          <Route path="/:categoryName" exact>
            <CategoryDisplay />
          </Route>
        )}
        {!loading && (
          <Route path="/:categoryName/:product" exact>
            <ProductDetail />
          </Route>
        )}
      </Switch>
    </Fragment>
  );
}

export default App;
