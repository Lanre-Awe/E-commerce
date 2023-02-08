import { useEffect } from "react";
import classes from "./account.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { AuthAction } from "../store/AuthSlice";

const Account = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const history = useHistory();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);
  const logoutHandler = async () => {
    try {
      await logout();

      dispatch(AuthAction.onNewUser(""));
      history.push("/");
    } catch {}
  };
  //   useEffect(() => {
  //     if (!currentUser) localStorage.removeItem("CART");
  //   }, [currentUser]);

  return (
    <div className={classes.container}>
      <h2>Account</h2>
      <h4>
        <strong>Email: </strong>
        {user && user.email}
      </h4>
      <button onClick={logoutHandler}>LOG OUT</button>
    </div>
  );
};

export default Account;
