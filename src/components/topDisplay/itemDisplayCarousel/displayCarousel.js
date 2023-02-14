import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import classes from "./displaycarousel.module.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 6, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const item = [
  {
    id: 1,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/phones_220x220.png",
    category: "Phones & Tablets",
  },
  {
    id: 2,
    productImg:
      "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/refreigerator.jpg",
    category: "Electronics",
  },
  {
    id: 3,
    productImg:
      "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Television.jpg",
    category: "Home & Office",
  },
  {
    id: 4,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/fashion_220x220.png",
    category: "Fashion",
  },
  {
    id: 5,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/electronics_220x220.png",
    category: "Home & Office",
  },
  {
    id: 6,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/portable-power_220x220.png",
    category: "Electronics",
  },
  {
    id: 7,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/accessories_220x220.png",
    category: "Gaming",
  },
  {
    id: 8,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/sporting-goods_220x220.png",
    category: "Sporting goods",
  },
  {
    id: 9,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/health-beauty_220x220.png",
    category: "Health & Beauty",
  },
  {
    id: 10,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/brand-days/16-dec-scanfrost/thumbnail.jpg",
    category: "Home & Office",
  },
  {
    id: 11,
    productImg:
      "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/groceries_220x220.png",
    category: "Supermarket",
  },
];

const DisplayCarousel = () => {
  return (
    <div className={classes.container}>
      <Carousel responsive={responsive}>
        {item.map((product) => {
          return (
            <div className={classes.imgContainer} key={product.id}>
              <Link to={`/${product.category.toLowerCase()}`}>
                <img src={product.productImg} alt="" />
                <div>{product.category}</div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default DisplayCarousel;
