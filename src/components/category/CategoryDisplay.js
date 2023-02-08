import { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productAction } from "../../store/productSlice";
import { showAction } from "../../store/showSlice";
import ShowCategories from "../topDisplay/showCategory";

import classes from "./categorydisplay.module.css";

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

export const item = [
  {
    id: 1,
    category: "Supermarket",
    list: [
      {
        id: 1,
        name: "William Lawsom's",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/92/681138/1.jpg?1173",
        price: 5000,
        category: "supermarket",
      },
      {
        id: 2,
        name: "Sunlight 2in1 Detergent",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/21/985689/1.jpg?8358",
        price: 2500,
        category: "supermarket",
      },
      {
        id: 3,
        name: "Sprite Drink",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/53/467018/1.jpg?7209",
        price: 1800,
        category: "supermarket",
      },
      {
        id: 4,
        name: "Jameson Black Barrel 70cl",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/460869/1.jpg?5420",
        price: 15000,
        category: "supermarket",
      },
      {
        id: 5,
        name: "Predator Energy Drink",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/37/467018/1.jpg?2645",
        price: 2440,
        category: "supermarket",
      },
      {
        id: 6,
        name: "Nestle Pure Life",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/76/467018/1.jpg?9999",
        price: 1550,
        category: "supermarket",
      },
      {
        id: 7,
        name: "Mama's Choice Rice",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/934348/1.jpg?7267",
        price: 37500,
        category: "supermarket",
      },
    ],
  },
  {
    id: 2,
    category: "Health & Beauty",
    list: [
      {
        id: 1,
        name: "NIVEA perfect",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/15/1713401/1.jpg?6213",
        price: 3785,
        category: "health & beauty",
      },
      {
        id: 2,
        name: "NIVEA Roll-on",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/5723401/1.jpg?0856",
        price: 2366,
        category: "health & beauty",
      },
      {
        id: 3,
        name: "Sure FW Invisible",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/06/7284951/1.jpg?1756",
        price: 1470,
        category: "health & beauty",
      },
      {
        id: 4,
        name: "Givinas",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/62/6600221/1.jpg?6468",
        price: 1554,
        category: "health & beauty",
      },
      {
        id: 5,
        name: "HAN RIVER",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/76/9312241/1.jpg?9493",
        price: 2440,
        category: "health & beauty",
      },
      {
        id: 6,
        name: "Hair Dryer",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/3762241/1.jpg?3865",
        price: 4775,
        category: "health & beauty",
      },
      {
        id: 7,
        name: "Dettol Pink",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/362729/1.jpg?0545",
        price: 1600,
        category: "health & beauty",
      },
    ],
  },
  {
    id: 3,
    category: "Home & Office",
    list: [
      {
        id: 1,
        name: "Haier Thermocool 200LTR",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/1332231/1.jpg?7974",
        price: 204045,
        category: "home & office",
      },
      {
        id: 2,
        name: "Skyrun 138-Litres",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/21/306344/1.jpg?0094",
        price: 164890,
        category: "home & office",
      },
      {
        id: 3,
        name: "Binatone Blender",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/81/895389/1.jpg?6890",
        price: 21470,
        category: "home & office",
      },
      {
        id: 4,
        name: "Quinix Ceramic Candle",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/66/750733/1.jpg?5037",
        price: 4400,
        category: "home & office",
      },
      {
        id: 5,
        name: "Tedbar Sound Bar",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/95/091308/1.jpg?6959",
        price: 32440,
        category: "home & office",
      },
      {
        id: 6,
        name: "Blue Gate UPS",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/513854/1.jpg?1734",
        price: 24145,
        category: "home & office",
      },
      {
        id: 7,
        name: "Cloud Energy 16inches",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/375164/1.jpg?8139",
        price: 25600,
        category: "home & office",
      },
    ],
  },
  {
    id: 4,
    category: "Phones & Tablets",
    list: [
      {
        id: 1,
        name: "Samsung Galaxy A73",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/1037521/1.jpg?5999",
        price: 358700,
        category: "phones & tablets",
      },
      {
        id: 2,
        name: "Samsung Galaxy A33",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/67/4927521/1.jpg?5116",
        price: 243700,
        category: "phones & tablets",
      },
      {
        id: 3,
        name: "Samsung Galaxy A23",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/85/8739302/1.jpg?2507",
        price: 168470,
        category: "phones & tablets",
      },
      {
        id: 4,
        name: "Tecno Spark 8P",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/0230261/1.jpg?8416",
        price: 96400,
        category: "phones & tablets",
      },
      {
        id: 5,
        name: "Apple Ipad Pro 9.7 -inch",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/330632/1.jpg?8890",
        price: 32440,
        category: "phones & tablets",
      },
      {
        id: 6,
        name: "Tecno Spark 9T",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/7361791/1.jpg?0686",
        price: 104145,
        category: "phones & tablets",
      },
      {
        id: 7,
        name: "Samsung Galaxy A03",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/49/5724202/2.jpg?6589",
        price: 64600,
        category: "phones & tablets",
      },
    ],
  },
  {
    id: 5,
    category: "Computing",
    list: [
      {
        id: 1,
        name: "HP ProBook 11 inches",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/61/832227/1.jpg?5847",
        price: 205045,
        category: "computing",
      },
      {
        id: 2,
        name: 'Apple MacBook Pro 14"',
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/300209/1.jpg?0441",
        price: 864890,
        category: "computing",
      },
      {
        id: 3,
        name: "Asus E203NA",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/9032361/1.jpg?1214",
        price: 99990,
        category: "computing",
      },
      {
        id: 4,
        name: "HP Pavilion 15",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/04/3777021/1.jpg?3128",
        price: 500000,
        category: "computing",
      },
      {
        id: 5,
        name: "Lenovo Ideapad",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/91/284077/1.jpg?3207",
        price: 190000,
        category: "computing",
      },
      {
        id: 6,
        name: "Blue Gate UPS",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/513854/1.jpg?1734",
        price: 24145,
        category: "computing",
      },
      {
        id: 7,
        name: "Lenovo AMD RYZEN",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/47/124177/1.jpg?9117",
        price: 256600,
        category: "computing",
      },
    ],
  },
  {
    id: 6,
    category: "Electronics",
    list: [
      {
        id: 1,
        name: "LG ALL IN ONE HiFi",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/3796591/1.jpg?9803",
        price: 86565,
        category: "electronics",
      },
      {
        id: 2,
        name: "Samsung T400",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/34/0736921/1.jpg?5991",
        price: 41890,
        category: "electronics",
      },
      {
        id: 3,
        name: 'Bruhum 32" LED TV',
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/60/3192502/1.jpg?3149",
        price: 57240,
        category: "electronics",
      },
      {
        id: 4,
        name: "Century CVR_TUB",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/4442231/1.jpg?8424",
        price: 31050,
        category: "electronics",
      },
      {
        id: 5,
        name: "Polystar 32 inch LED TV",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/01/4268301/1.jpg?5488",
        price: 103700,
        category: "electronics",
      },
      {
        id: 6,
        name: "LG AUD 4RP XBOOM",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/79/1742821/1.jpg?1662",
        price: 154105,
        category: "electronics",
      },
      {
        id: 7,
        name: "Royal 20L Microwave",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/66/1655591/2.jpg?1468",
        price: 47600,
        category: "electronics",
      },
    ],
  },
  {
    id: 7,
    category: "Fashion",
    list: [
      {
        id: 1,
        name: "ADIDAS Adilette Aqua",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/03/959568/1.jpg?9935",
        price: 17435,
        category: "fashion",
      },
      {
        id: 2,
        name: "Nike Air Max",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/88/182997/1.jpg?1879",
        price: 43890,
        category: "fashion",
      },
      {
        id: 3,
        name: "Nike Venture",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/4560331/1.jpg?9273",
        price: 51240,
        category: "fashion",
      },
      {
        id: 4,
        name: "ADIDAS Core Sneakers",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/885248/1.jpg?9631",
        price: 43050,
        category: "fashion",
      },
      {
        id: 5,
        name: "Women Bag Crossbody",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/94/216606/1.jpg?0615",
        price: 7700,
        category: "fashion",
      },
      {
        id: 6,
        name: "Steampunk Sunglasses",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/42/0418341/1.jpg?8794",
        price: 990,
        category: "fashion",
      },
      {
        id: 7,
        name: "Men Casual Pants",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/35/7598901/1.jpg?4350",
        price: 5900,
        category: "fashion",
      },
    ],
  },
  {
    id: 8,
    category: "Baby Products",
    list: [
      {
        id: 1,
        name: "Molfix Junior",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/45/227177/1.jpg?4909",
        price: 765,
        category: "baby products",
      },
      {
        id: 2,
        name: "ADIDAS Sports",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/65/009869/1.jpg?8759",
        price: 16890,
        category: "baby products",
      },
      {
        id: 3,
        name: "Pears Baby Jelly 225g",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/62/485689/1.jpg?6937",
        price: 1240,
        category: "baby products",
      },
      {
        id: 4,
        name: "Non-Slip Sandals",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/19/667398/1.jpg?4605",
        price: 3050,
        category: "baby products",
      },
      {
        id: 5,
        name: "Infant Baby Clothes",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/42/238476/1.jpg?0711",
        price: 4200,
        category: "baby products",
      },
      {
        id: 6,
        name: "Vaseline Petroleun Jelly",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/026248/1.jpg?2207",
        price: 1790,
        category: "baby products",
      },
      {
        id: 7,
        name: "Molfix Junior 28x1",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/227177/1.jpg?4720",
        price: 3700,
        category: "baby products",
      },
    ],
  },
  {
    id: 9,
    category: "Gaming",
    list: [
      {
        id: 1,
        name: "Sony PS4 Slim 500GB",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/67/892597/1.jpg?2988",
        price: 188500,
        category: "gaming",
      },
      {
        id: 2,
        name: "EA FIFA 23",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/70/8116491/1.jpg?2394",
        price: 35400,
        category: "gaming",
      },
      {
        id: 3,
        name: "SONY PS4 Controller",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/7386671/1.jpg?9528",
        price: 10240,
        category: "gaming",
      },
      {
        id: 4,
        name: "Scrabble Big Board Game",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/829818/1.jpg?4294",
        price: 4200,
        category: "gaming",
      },
      {
        id: 5,
        name: "Monopoly Classic",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/56/162789/1.jpg?3892",
        price: 6000,
        category: "gaming",
      },
      {
        id: 6,
        name: "2K PS4 NBA 2K23",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/4229102/1.jpg?4165",
        price: 38000,
        category: "gaming",
      },
      {
        id: 7,
        name: "God Of War 4",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/330389/1.jpg?1074",
        price: 12900,
        category: "gaming",
      },
    ],
  },
  {
    id: 10,
    category: "Sporting Goods",
    list: [
      {
        id: 1,
        name: "ADIDAS Tiro Club Ball",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/46/1623591/1.jpg?4409",
        price: 13500,
        category: "sporting goods",
      },
      {
        id: 2,
        name: "ADIDAS Core Pants",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/18/9617011/1.jpg?8896",
        price: 51450,
        category: "sporting goods",
      },
      {
        id: 3,
        name: "Sports Nassa Boots",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/5684501/1.jpg?3285",
        price: 12500,
        category: "sporting goods",
      },
      {
        id: 4,
        name: "Tummy Trimmer",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/74/080976/1.jpg?2517",
        price: 5999,
        category: "sporting goods",
      },
      {
        id: 5,
        name: "Fitbit Charge 4",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/33/980219/1.jpg?4728",
        price: 76000,
        category: "sporting goods",
      },
      {
        id: 6,
        name: "Defacto Woman Short",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/1594531/1.jpg?1435",
        price: 3040,
        category: "sporting goods",
      },
      {
        id: 7,
        name: "Danami Waterproof Bag",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/93/742789/1.jpg?1563",
        price: 3900,
        category: "sporting goods",
      },
    ],
  },
  {
    id: 11,
    category: "Automobile",
    list: [
      {
        id: 1,
        name: "Austone 205 65R15",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/356996/1.jpg?5724",
        price: 65500,
        category: "automobile",
      },
      {
        id: 2,
        name: "12V Car Jump Starter",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/91/748646/1.jpg?7611",
        price: 12480,
        category: "automobile",
      },
      {
        id: 3,
        name: "Creative Car Clock ",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/637842/1.jpg?1787",
        price: 6940,
        category: "automobile",
      },
      {
        id: 4,
        name: "Edge Power Steering",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/86/398054/1.jpg?0006",
        price: 39999,
        category: "automobile",
      },
      {
        id: 5,
        name: "Honda Acura Oil Filter",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/127323/1.jpg?7802",
        price: 2500,
        category: "automobile",
      },
      {
        id: 6,
        name: "Camshaft Sensor",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/59/816846/1.jpg?3144",
        price: 7640,
        category: "automobile",
      },
      {
        id: 7,
        name: "Toyota 6pcs Spark Plugs",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/252574/1.jpg?5394",
        price: 12300,
        category: "automobile",
      },
    ],
  },
  {
    id: 12,
    category: "Other categories",
    list: [
      {
        id: 1,
        name: "Lonen Rechargable Lamp",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/6626491/1.jpg?3450",
        price: 7500,
        category: "other categories",
      },
      {
        id: 2,
        name: "Maxi Generator 2Kw",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/9076591/1.jpg?2250",
        price: 186480,
        category: "other categories",
      },
      {
        id: 3,
        name: "Oraimo Power Bank",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/27/465887/1.jpg?0785",
        price: 12000,
        category: "other categories",
      },
      {
        id: 4,
        name: "Mercury 5KVA Solar Power",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/87/983887/1.jpg?8064",
        price: 489999,
        category: "other categories",
      },
      {
        id: 5,
        name: "Power Plus Inverter",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/184558/1.jpg?9855",
        price: 145500,
        category: "other categories",
      },
      {
        id: 6,
        name: "JBL Charge 5 Portable",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/00/109289/1.jpg?0372",
        price: 115000,
        category: "other categories",
      },
      {
        id: 7,
        name: "360° Swivel Chair",
        img: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/06/066119/1.jpg?1189",
        price: 32000,
        category: "other categories",
      },
    ],
  },
];

const CategoryDisplay = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const [pageDisplay, setPageDisplay] = useState([]);
  const show = useSelector((state) => state.show.show);

  useEffect(() => {
    const pageItem = item.filter(
      (item) => item.category.toLowerCase() === categoryName
    );
    console.log(pageItem);
    setPageDisplay(pageItem);
  }, [categoryName]);

  const productDetailHandler = (id, item) => {
    const productDetail = item.filter((product) => product.id === id);
    dispatch(productAction.onView(productDetail));
  };
  const showHandler = () => {
    dispatch(showAction.onShow());
  };

  const closeHandler = () => {
    dispatch(showAction.onClose());
  };
  useEffect(() => {
    dispatch(showAction.onClose());
  }, []);
  return (
    <div>
      {pageDisplay.map((items) => {
        return (
          <>
            <div className={classes.redirect}>
              <span className={classes.home} onMouseOver={showHandler}>
                <Link to="/home">home</Link>
              </span>{" "}
              {">"} <span>{items.category.toLowerCase()}</span>
            </div>
            {show && (
              <div className={classes.others} onMouseLeave={closeHandler}>
                <ShowCategories />
              </div>
            )}
            <div className={classes.heading}>
              <span> {items.category}</span>
            </div>
            <div className={classes.container}>
              <div className={classes.itemHead}>
                <div className={classes.deal}>Deals</div>
                <div className={classes.see}>See All</div>
              </div>
              <div>
                <Carousel responsive={responsive}>
                  {items.list.map((itemProduct) => {
                    return (
                      <div
                        className={classes.itemContainer}
                        onClick={productDetailHandler.bind(
                          this,
                          itemProduct.id,
                          items.list
                        )}
                      >
                        <Link
                          to={`/${categoryName.toLowerCase()}/${itemProduct.name.toLowerCase()}`}
                        >
                          <div className={classes.imgContainer}>
                            <img src={itemProduct.img} alt="" />
                          </div>
                          <div className={classes.title}>
                            <span>{itemProduct.name}</span>
                          </div>
                          <div className={classes.price}>
                            <span>
                              ₦ {itemProduct.price.toLocaleString("en-US")}
                            </span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CategoryDisplay;
