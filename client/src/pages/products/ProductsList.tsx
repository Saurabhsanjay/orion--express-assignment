import { trimDescription, trimTitle } from "../../helpers/stringHelpers";
import styles from "./styles/ProductList.module.css";
import { useState } from "react";
import { Product } from "./types/products";

//interfaces
interface Props{
    products:Product[]
}


const ProductsList = ({ products }: Props) => {
  //states
  const [sortOrderRating, setSortOrderRating] = useState<"asc" | "desc">("asc");
  const [sortOrderPrice, setSortOrderPrice] = useState<"asc" | "desc">("asc");

  //for calculating the stars review
  const getStarRating = (rating: number) => {
    const filledStars = "★".repeat(Math.floor(rating));
    const hasHalfStar = rating % 1 !== 0;
    const halfStar = hasHalfStar ? "½" : "";
    const emptyStars = "☆".repeat(5 - Math.ceil(rating));
    return (
      <span>
        <span className={styles.filledStar}>
          {filledStars}
          {halfStar}
        </span>
        <span className={styles.emptyStar}>{emptyStars}</span>
      </span>
    );
  };

  //for sorting the data in asc dsc order
  const handleSortRating = () => {
    setSortOrderRating((prevSortOrder) =>
      prevSortOrder === "asc" ? "desc" : "asc"
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrderRating === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  //for sorting the data in asc dsc order
  const handleSortPrice = () => {
    setSortOrderPrice((prevSortOrder) =>
      prevSortOrder === "asc" ? "desc" : "asc"
    );
  };

  const sortedProductsByPrice = [...sortedProducts].sort((a, b) => {
    if (sortOrderPrice === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  //jsx
  return (
    <div className={styles.main}>
      {products.length === 0 ? (
        <table className={styles.table}>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={7}>
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>
                Reviews{" "}
                <button
                  className={styles.sortButton}
                  onClick={handleSortRating}
                >
                  {sortOrderRating === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>
                Price{" "}
                <button className={styles.sortButton} onClick={handleSortPrice}>
                  {sortOrderPrice === "asc" ? "↑" : "↓"}
                </button>
              </th>
              <th>Buy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedProductsByPrice?.map((el, index: number) => (
              <tr key={el.id}>
                <td>{index + 1}</td>
                <td className={styles.productCell}>
                  <div className={styles.contentWrapper}>
                    <img
                      width="50px"
                      height="40px"
                      src={el.thumbnail}
                      alt="Product"
                    />
                    <span>{trimTitle(el.title)}</span>
                  </div>
                </td>
                <td>{trimDescription(el.description)}</td>
                <td>{getStarRating(el.rating)}</td>
                <td className={styles.Price}>₹ {el.price}</td>
                <td>
                  <input
                    type="number"
                    className={styles.QtyInput}
                    min="1"
                    max="10"
                    step="1"
                    value={1}
                  />
                </td>
                <td>
                  <button className={styles.button}>Add To Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsList;
