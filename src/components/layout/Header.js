import { Link, useHistory } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { item } from "../category/CategoryDisplay";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { productAction } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { sideAction } from "../../store/sideSlice";
const Header = () => {
  const dispatch = useDispatch();
  const matchArr = [];

  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [url, setUrl] = useState(false);
  const [user, setUser] = useState();
  const searchInputRef = useRef();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.auth.loading);

  const returnHome = () => {
    history.push("/home");
  };

  const searchItem = () => {
    const searchedItem = searchInputRef.current.value;
    if (!searchedItem) {
      return;
    }
    item.forEach((itemProduct) => {
      if (
        itemProduct.category.toLowerCase().includes(searchedItem.toLowerCase())
      ) {
        setSearchResult([{ name: `${searchedItem} in categories` }]);
        setUrl(`/${searchedItem}`);
      } else {
        itemProduct.list.forEach((itemList) => {
          const match = itemList.name
            .toLowerCase()
            .match(searchedItem.toLowerCase());
          if (match) {
            const matchObj = itemProduct.list.find(
              (items) => items.name.toLowerCase() === match.input
            );
            matchArr.push(matchObj);
          } else {
            setSearchResult([{ name: "Search not found" }]);
          }
        });
        setShowSearchResult(true);
      }
    });

    if (matchArr.length !== 0) {
      setSearchResult(matchArr);
    }
  };
  const getProductUrl = (results) => {
    dispatch(productAction.onView([results]));
    setShowSearchResult(false);
    setUrl(false);

    console.log("wow");
  };
  const setUrlFalse = () => {
    setUrl(false);
    setShowSearchResult(false);
  };
  useEffect(() => {
    if (!loading) {
      setUser(currentUser);
    }
  }, [currentUser, user, loading]);
  const showHandler = () => {
    dispatch(sideAction.control());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.burgerContainer} onClick={showHandler}>
          <div className={styles.burger}></div>
          <div className={styles.burger}></div>
          <div className={styles.burger}></div>
        </div>
        <h2 onClick={returnHome}>Lanre Stand</h2>
        <div className={styles.formContainer}>
          <input type="text" ref={searchInputRef} />
          <button onClick={searchItem}>search</button>
        </div>

        {user && (
          <Link to="/account" className={styles.account}>
            account
          </Link>
        )}
        {!user && (
          <Link to="/authentication" className={styles.account}>
            Sign in
          </Link>
        )}
        <div className={styles.iconContainer}>
          <Link to={user ? "/account" : "/authentication"}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="white"
              class="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              className={styles.icons}
            >
              <g>
                <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
              </g>
            </svg>
          </Link>
        </div>

        <HeaderCartButton current={currentUser} />
      </header>
      {showSearchResult && (
        <div className={styles.searchResult}>
          {searchResult.map((results) => {
            return (
              <div
                onClick={url ? setUrlFalse : getProductUrl.bind(this, results)}
                key={results.name}
              >
                <Link
                  to={
                    url
                      ? url
                      : `/${results.category}/${results.name.toLowerCase()}`
                  }
                >
                  {results.category
                    ? `${results.name} in ${results.category}`
                    : `${results.name}`}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Header;
