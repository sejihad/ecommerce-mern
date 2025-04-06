import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../component/layout/Loader/Loader.jsx";
import MetaData from "../../component/layout/MetaData.jsx";
import ProductCard from "../Home/ProductCard";
import "./Products.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => setCurrentPage(e);

  const priceHandler = (event, newPrice) => setPrice(newPrice);
  let count = filteredProductsCount;

  const toggleCategory = (cat) => {
    if (category === cat) {
      setCategory("");
    } else {
      setCategory(cat);
    }
  };

  const handleRatingsChange = useCallback((e, newRating) => {
    setRatings(newRating);
  }, []);

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />

          <div className="products-page">
            {/* Filters Sidebar */}
            <div className="products-sidebar">
              <div className="filterBox">
                <Typography
                  variant="h6"
                  component="h3"
                  className="filter-title"
                >
                  Filters
                </Typography>

                {/* Price Filter */}
                <div className="filter-section">
                  <Typography gutterBottom>Price Range</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                    color="primary"
                  />
                </div>

                {/* Categories Filter */}
                <div className="filter-section">
                  <Typography gutterBottom>Categories</Typography>
                  <ul className="categoryBox">
                    {categories.map((cat) => (
                      <li
                        className={`category-link ${
                          category === cat ? "active" : ""
                        }`}
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ratings Filter */}
                <div className="filter-section">
                  <Typography gutterBottom>Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={handleRatingsChange}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    color="primary"
                  />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="products-container">
              <h2 className="productsHeading">
                {keyword ? `Search Results for "${keyword}"` : "All Products"}
              </h2>

              <div className="products">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="no-products">
                    <Typography variant="h6">No Products Found</Typography>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
