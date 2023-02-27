import { Fragment, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import { showAction } from "../../store/showSlice";
import ShowCategories from "../topDisplay/showCategory";
import classes from "./Product.module.css";
import ReactImageMagnify from "react-image-magnify";
import { item } from "../category/CategoryDisplay";
import NotFound from "../../pages/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 6, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Product = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalAmount);
  const product = useSelector((state) => state.product.product);
  const show = useSelector((state) => state.show.show);
  const [availableProduct, setAvailableProduct] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const addCartHandler = (name, id, price, image, category) => {
    dispatch(
      cartActions.onAdd({
        name: name,
        price: price,
        id: id,
        img: image,
        category: category,
      })
    );
    dispatch(cartActions.onUpdate());
  };
  useEffect(() => {
    localStorage.setItem(
      "CART",
      JSON.stringify({
        cartItem: cartItem,
        totalPrice: totalPrice,
        quantity: quantity,
      })
    );
  }, [cartItem, totalPrice, quantity]);
  useEffect(() => {
    const productItemList = item.find(
      (category) => category.category.toLowerCase() === params.categoryName
    );
    const productItem = productItemList.list.filter(
      (products) => products.name.toLowerCase() === params.product
    );
    if (productItem.length > 0) {
      setAvailableProduct(true);
    }
    setLoading(false);
    localStorage.setItem("PRODUCT", JSON.stringify(product));
  }, [product]);

  const showHandler = () => {
    dispatch(showAction.onShow());
  };

  const closeHandler = () => {
    dispatch(showAction.onClose());
  };

  return (
    <>
      <div className={classes.mainContainer}>
        {loading && <LoadingSpinner />}
        {availableProduct &&
          !loading &&
          product.map((item) => {
            return (
              <Fragment key={item.id}>
                <div className={classes.redirect}>
                  <span className={classes.home} onMouseOver={showHandler}>
                    <Link to="/home">home</Link>
                  </span>{" "}
                  {">"}{" "}
                  <span>
                    <Link to={`/${item.category}`}> {item.category}</Link>
                  </span>{" "}
                  {">"} <span>{item.name}</span>
                </div>
                {show && (
                  <span className={classes.others} onMouseLeave={closeHandler}>
                    <ShowCategories />
                  </span>
                )}
                <div className={classes.productContainer} key={item.name}>
                  <div className={classes.display}>
                    <div className={classes.imgContainer}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: item.name,
                            isFluidWidth: true,
                            src: item.img,
                          },
                          largeImage: {
                            src: item.img,
                            width: 1800,
                            height: 1800,
                          },
                          isHintEnabled: true,
                        }}
                      />
                    </div>
                    <div>
                      <Carousel responsive={responsive}>
                        <div className={classes.carouselDiv}>
                          <img src={item.img} alt="" />
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <div className={classes.info}>
                    <div className={classes.name}>{item.name}</div>
                    <div>
                      <div className={classes.price}>
                        ₦ {item.price.toLocaleString("en-US")}
                      </div>
                      <div className={classes.stock}>in stock</div>
                    </div>
                    <div className={classes.buttonContainer}>
                      <button
                        onClick={addCartHandler.bind(
                          this,
                          item.name,
                          item.id,
                          item.price,
                          item.img,
                          item.category
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={classes.icon}
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>{" "}
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>

                <div className={classes.ad}>
                  <div className={classes.advert}>
                    <img
                      src="https://img.freepik.com/premium-vector/sale-poster-design-with-50-discount-offer-black-background_1302-30902.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className={classes.productDetailContainer}>
                    <div className={classes.title} id="productDetail">
                      Product details
                    </div>
                    <div className={classes.description}>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Officiis est aut nostrum ad animi, ipsa enim
                        cupiditate vel eius recusandae harum deleniti sed
                        laudantium dolore ducimus aliquam nemo dolores fugit?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas magni inventore quidem quam distinctio enim
                        explicabo eius quaerat doloremque alias?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsam rem quis eum vel voluptates ut delectus ad
                        voluptate blanditiis, quam, similique consequatur
                        laborum excepturi, aspernatur temporibus quibusdam
                        recusandae culpa adipisci. Veritatis at illum sequi
                        ipsam corporis fugit est. Consequuntur perspiciatis,
                        voluptates quae sequi beatae rem ducimus voluptate
                        quisquam numquam sunt!
                      </p>
                    </div>
                  </div>
                  <div className={classes.sideDetail}>
                    <div className={classes.detailInfo}>
                      <div className={classes.linkDiv}>
                        <a href="#productDetail">product details</a>{" "}
                      </div>
                    </div>
                    <div className={classes.productCart}>
                      <div>
                        <img src={item.img} alt="" />
                        <div className={classes.productName}>
                          <div className={classes.modalName}>{item.name}</div>
                          <div className={classes.modalPrice}>
                            ₦ {item.price.toLocaleString("en-US")}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={addCartHandler.bind(
                          this,
                          item.name,
                          item.id,
                          item.price,
                          item.img,
                          item.category
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={classes.modalIcon}
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>{" "}
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        {!availableProduct && !loading && <NotFound />}
      </div>
    </>
  );
};

export default Product;
