import { useRef } from "react";
import { useState } from "react";
import { login } from "../../firebase/firebase";
import { signup } from "../../firebase/firebase";
import classes from "./form.module.css";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthenticationForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [signIn, setSignIn] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const OldUser = () => {
    setSignIn((prevState) => !prevState);
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    setConfirmError(false);
    setPasswordError(false);
    if (!signIn) {
      const emailInput = emailRef.current.value;
      const passwordInput = passwordRef.current.value;
      const passwordConfirmInput = passwordConfirmRef.current.value;
      if (passwordInput.trim().length < 8) {
        setPasswordError(true);
        return;
      } else if (
        passwordInput.trim().length > 7 &&
        passwordConfirmInput !== passwordInput
      ) {
        setConfirmError(true);
        return;
      } else {
        try {
          setLoading(true);
          console.log("trying");
          await signup(emailInput, passwordInput);
          history.push("/");
        } catch (e) {}
        setLoading(false);
      }
    }
    if (signIn) {
      const emailInput = emailRef.current.value;
      const passwordInput = passwordRef.current.value;
      try {
        setLoading(true);
        await login(emailInput, passwordInput);
        history.push("/");
      } catch {}
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && (
        <div className={classes.container}>
          <div className={classes.action}>
            <div className={classes.signUp}>
              {signIn ? "LOG IN" : "SIGN UP"}
            </div>
          </div>
          <div className={classes.formContainer}>
            <form onSubmit={createNewUser}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required ref={emailRef} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordRef}
                />
                {passwordError && (
                  <div className={classes.error}>
                    password should be at least 8 characters
                  </div>
                )}
              </div>
              {!signIn && (
                <div>
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    required
                    ref={passwordConfirmRef}
                  />
                  {confirmError && (
                    <div className={classes.error}>password does not match</div>
                  )}
                </div>
              )}
              <button type="submit" disabled={loading}>
                {signIn ? "LOG IN" : "CREATE ACCOUNT"}
                {loading ? "..." : ""}
              </button>
            </form>
            <div className={classes.login} onClick={OldUser}>
              <span>
                {signIn
                  ? "Create New Account"
                  : "Already have an account? LOG IN"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationForm;
