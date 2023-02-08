import ShopItem from "./ShopItem";
import styles from "./shoplist.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export const DummyData = [
  {
    id: 1,
    name: "Austone 205 65R15",
    img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/356996/1.jpg?5724",
    price: 65500,
    category: "automobile",
  },
  {
    id: 6,
    name: "Defacto Woman Short",
    img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/1594531/1.jpg?1435",
    price: 3040,
    category: "sporting goods",
  },
  {
    id: 6,
    name: "2K PS4 NBA 2K23",
    img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/4229102/1.jpg?4165",
    price: 38000,
    category: "gaming",
  },
  {
    id: 1,
    name: "ADIDAS Adilette Aqua",
    img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/03/959568/1.jpg?9935",
    price: 17435,
    category: "fashion",
  },
  {
    id: 3,
    name: 'Bruhum 32" LED TV',
    img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/60/3192502/1.jpg?3149",
    price: 57240,
    category: "electronics",
  },
];

const Shoplist = () => {
  return (
    <>
      <div className={styles.heading}>FAST DEALS</div>
      <div className={styles.container}>
        {DummyData.map((item) => {
          return (
            <ShopItem
              key={item.name}
              id={item.id}
              name={item.name}
              price={item.price}
              img={item.img}
              category={item.category}
            />
          );
        })}
      </div>
    </>
  );
};

export default Shoplist;
