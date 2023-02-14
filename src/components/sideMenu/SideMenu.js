import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "../UI/Modal";
import { categories } from "../topDisplay/Categories";
import classes from "./sidemenu.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sideAction } from "../../store/sideSlice";
const Menu = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(sideAction.control());
  };
  return (
    <>
      <div className={classes.categoryContainer}>
        <div className={classes.heading}>
          <span>Lanre Stands</span>
          <button onClick={closeModal} className={classes.buttonContainer}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
              className={classes.icons}
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
        </div>
        {categories.map((item) => {
          return (
            <div
              key={item.id}
              className={classes.itemContainer}
              onClick={closeModal}
            >
              <Link to={`/${item.category.toLowerCase()}`}>
                <span>{item.category}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
const SideMenu = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(<Menu />, document.getElementById("overlays"))}
    </Fragment>
  );
};

export default SideMenu;
