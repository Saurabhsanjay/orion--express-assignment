import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import styles from "./styles/ProductsPage.module.css";
import { Product } from "./types/products";

const ProductsPage:React.FC = () => {
  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //fetching the data from server
const fetchProductsData = async (offset: number, limit: number): Promise<void> => {
  setIsLoading(true);
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/products?offset=${offset}&limit=${limit}`
    );
    if (res.ok) {
      const data = await res.json();
    setProducts(data.products);
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};


  //for rendering the data
useEffect(() => {
  fetchProductsData(0, limit);
}, []);

  //for debounce
const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


//for infinite scroll
useEffect(() => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

    if (isScrolledToBottom) {
        setLimit((prevLimit) => prevLimit + 20);
        fetchProductsData(limit, 20);
    }
    
  };

  const debouncedHandleScroll = debounce(handleScroll, 1000); 

  window.addEventListener("scroll", debouncedHandleScroll);
  return () => window.removeEventListener("scroll", debouncedHandleScroll);
}, [limit]);




  //for resetting all the filters
  const resetFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSearchQuery('');
  };

  //for category filter
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  //for brand filter
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  //for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on the selected category and search query
  const filteredProducts = products.slice(0, limit).filter((product,i) => {
    if (i >= limit) return false;
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }

    if (
      searchQuery &&
      !Object.values(product).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.main}>
      {/* filters */}
      <div className={styles.filters}>
        <h3>Filters</h3>
        <div className={styles.customSelect}>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option selected value="">
              Categories
            </option>
            {[...new Set(products?.map((el) => el.category))].map(
              (category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.customSelect}>
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option selected value="">
              Brand
            </option>
            {[...new Set(products?.map((el) => el.brand))].map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className={styles.reset} onClick={resetFilters}>
            <i className="fa fa-refresh"></i> Reset
          </button>
        </div>

        <div>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.SearchInput}
          />
        </div>
      </div>

      {/* products list  */}
      <div className={styles.productList}>
        {isLoading && <div className={styles.loader}>Loading...</div>}
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
