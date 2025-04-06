import { Search as SearchIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../component/layout/MetaData";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search Products -- ECOMMERCE" />
      <div className="search-container">
        <div className="search-content">
          <h1 className="search-title">Find Your Perfect Product</h1>
          <form className="search-form" onSubmit={searchSubmitHandler}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search for products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="search-input"
                aria-label="Search products"
              />
              <button type="submit" className="search-button">
                <SearchIcon className="search-icon" />
                <span>Search</span>
              </button>
            </div>
            <p className="search-hint">
              Try searching for "shoes", "electronics", or "accessories"
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
