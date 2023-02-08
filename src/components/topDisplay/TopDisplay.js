import { useState } from "react";
import AdvertDisplay from "./AdvertDisplay";
import Categories from "./Categories";
import SideDisplay from "./SideDisplay";
import classes from "./advertdisplay.module.css";

const TopDisplay = () => {
  const [subCategory, setSubcategory] = useState(null);

  const recieveSubCat = (subCategories) => {
    setTimeout(() => {
      setSubcategory(subCategories);
    }, 300);
  };

  return (
    <div className={classes.mainContainer}>
      <Categories onHover={recieveSubCat} />
      <AdvertDisplay list={subCategory} />
      <SideDisplay />
    </div>
  );
};
export default TopDisplay;
