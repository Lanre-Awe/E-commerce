import { useState } from "react";
import AdvertDisplay from "./AdvertDisplay";
import Categories from "./Categories";
import SideDisplay from "./SideDisplay";
import classes from "./advertdisplay.module.css";
import { item } from "../category/CategoryDisplay";
import { useRef } from "react";
import { productAction } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TopDisplay = () => {
  const [searchResult, setSearchResult] = useState([]);
  const matchArr = [];
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [url, setUrl] = useState(false);
  const [subCategory, setSubcategory] = useState(null);
  const searchInputRef = useRef();
  const dispatch = useDispatch();
  const recieveSubCat = (subCategories) => {
    setTimeout(() => {
      setSubcategory(subCategories);
    }, 300);
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

  return (
    <>
      <div className={classes.formContainer}>
        <input type="text" ref={searchInputRef} />
        <button onClick={searchItem}>search</button>
      </div>
      {showSearchResult && (
        <div className={classes.searchResult}>
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

      <div className={classes.mainContainer}>
        <Categories onHover={recieveSubCat} />
        <AdvertDisplay list={subCategory} />
        <SideDisplay />
      </div>
    </>
  );
};
export default TopDisplay;
