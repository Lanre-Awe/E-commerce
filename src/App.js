import { Fragment, useEffect } from "react";
import Header from "./components/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";
import { Redirect, Route, Switch } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { AuthAction } from "./store/AuthSlice";
import React from "react";
import { Suspense } from "react";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import SideMenu from "./components/sideMenu/SideMenu";
let initial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const loading = useSelector((state) => state.auth.loading);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const showSide = useSelector((state) => state.showSide.showSide);
  const AuthPage = React.lazy(() => import("./pages/AuthPage"));
  const CategoryDisplay = React.lazy(() =>
    import("./components/category/CategoryDisplay")
  );
  const Account = React.lazy(() => import("./components/Account"));
  // const Home = React.lazy(() => import("./pages/Home"));

  useEffect(() => {
    const closeNotif = () => {
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 2000);
    };
    const sendCart = async () => {
      dispatch(uiActions.onAdd());
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
          message: "cart update successful",
        })
      );
      dispatch(uiActions.onAdd());
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
          message: "Could not add update Cart",
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
      {showSide && <SideMenu />}
      <header>{!loading && <Header />}</header>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </Fragment>
  );
}

export default App;
