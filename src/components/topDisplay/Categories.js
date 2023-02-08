import classes from "./categories.module.css";
import { Link } from "react-router-dom";
export const categories = [
  {
    id: 1,
    category: "Supermarket",
    subCategories: [{ id: 1, class: "food", category: "Supermarket" }],
  },
  {
    id: 2,
    category: "Health & Beauty",
    subCategories: [{ id: 1, category: "Health & Beauty", class: "cosmetics" }],
  },
  {
    id: 3,
    category: "Home & Office",
    subCategories: [{ id: 1, category: "Home & Office", class: "gadgets" }],
  },
  {
    id: 4,
    category: "Phones & Tablets",
    subCategories: [{ id: 1, category: "Phones & Tablets", class: "andriod" }],
  },
  {
    id: 5,
    category: "Computing",
    subCategories: [{ id: 1, category: "Computing", class: "desktop" }],
  },
  {
    id: 6,
    category: "Electronics",
    subCategories: [{ id: 1, category: "Electronics", class: "appliances" }],
  },
  {
    id: 7,
    category: "Fashion",
    subCategories: [{ id: 1, class: "mens's clothing", category: "Fashion" }],
  },
  {
    id: 8,
    category: "Baby Products",
    subCategories: [{ id: 1, class: "diapers", category: "Baby Products" }],
  },
  {
    id: 9,
    category: "Gaming",
    subCategories: [{ id: 1, class: "console", category: "Gaming" }],
  },
  {
    id: 10,
    category: "Sporting Goods",
    subCategories: [
      { id: 1, class: "track suits", category: "Sporting Goods" },
    ],
  },
  {
    id: 11,
    category: "Automobile",
    subCategories: [{ id: 1, category: "Automobile", class: "spare parts" }],
  },
  {
    id: 12,
    category: "Other categories",
    subCategories: [
      { id: 1, category: "Other categories", class: "miscellenous" },
    ],
  },
];
const Categories = (props) => {
  const showClassHandler = (subCat) => {
    props.onHover(subCat);
  };

  return (
    <>
      <div className={classes.categoryContainer}>
        {categories.map((item) => {
          return (
            <div
              key={item.id}
              className={classes.itemContainer}
              onMouseOver={showClassHandler.bind(item, item.subCategories)}
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

export default Categories;
