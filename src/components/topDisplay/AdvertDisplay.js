import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { categoryAction } from "../../store/categorySlice";
import classes from "./advertdisplay.module.css";
import { categories } from "./Categories";

const AdvertDisplay = (props) => {
  const dispatch = useDispatch();
  const [showSub, setShowSub] = useState(false);

  const getCategory = (classItem) => {
    const cat = categories.filter((item) => {
      return item.subCategories[0].class === classItem;
    });
    dispatch(categoryAction.onShowCat(cat));
  };

  const { list } = props;
  useEffect(() => {
    if (list) {
      setShowSub(true);
    }
  }, [list]);
  const showHandler = () => {
    setShowSub(false);
  };
  return (
    <>
      {!showSub && (
        <div className={classes.container}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
          >
            <div className={classes.card}>
              <img
                className={classes.img1}
                src="https://cdn.dribbble.com/users/1846675/screenshots/5041176/nike_promo.png"
                alt=""
              />
            </div>
            <div className={classes.card}>
              <img
                className={classes.img1}
                src="https://4.bp.blogspot.com/-LVKISax63AU/Vs_4azP3q4I/AAAAAAAIcCQ/FnQ1b4-cKBM/s1600/1aabb.png"
                alt=""
              />
            </div>
            <div className={classes.card}>
              <img
                className={classes.img1}
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/20b55a91628085.5e3ef69d6c72d.png"
                alt=""
              />
            </div>
            <div className={classes.card}>
              <img
                className={classes.img1}
                src="https://d1lss44hh2trtw.cloudfront.net/assets/article/2020/06/11/ps5-console_feature.png"
                alt=""
              />
            </div>
          </Carousel>
        </div>
      )}
      {showSub && (
        <div onMouseLeave={showHandler} className={classes.classContainer}>
          <div className={classes.heading}>categories</div>
          {props.list.map((item) => {
            return (
              <div
                className={classes.item}
                onClick={getCategory.bind(this, item.class)}
              >
                <Link to={`/${item.category.toLowerCase()}`}>{item.class}</Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AdvertDisplay;
