import classes from "./sidedisplay.module.css";

const SideDisplay = () => {
  return (
    <div className={classes.container}>
      <div className={classes.advert}>
        <img
          className={classes.img}
          src="https://img.freepik.com/premium-vector/sale-poster-design-with-50-discount-offer-black-background_1302-30902.jpg"
          alt=""
        />
      </div>
      <div className={classes.advert}>
        <img
          className={classes.img}
          src="https://www.themebooster.com/assets/uploads/2019/07/free-delivery.png"
          alt=""
        />
      </div>
    </div>
  );
};
export default SideDisplay;
