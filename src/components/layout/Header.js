import { Link, useHistory } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { item } from "../category/CategoryDisplay";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { productAction } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = (props) => {
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
      if (searchedItem.toLowerCase() === itemProduct.category.toLowerCase()) {
        setSearchResult([{ name: `${searchedItem} in categories` }]);
        setUrl(`/${searchedItem}`);
      } else {
        itemProduct.list.forEach((itemList) => {
          const match = itemList.name.toLowerCase().match(searchedItem);
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

  console.log(user);
  return (
    <>
      <header className={styles.header}>
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
