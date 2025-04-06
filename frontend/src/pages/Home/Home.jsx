import React, { useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../actions/productAction.jsx";
import Loader from "../../component/layout/Loader/Loader.jsx";
import MetaData from "../../component/layout/MetaData.jsx";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce - Shop the Best Products" />
          <section className="hero-banner">
            <div className="hero-content">
              <p className="hero-subtitle">Welcome to Ecommerce</p>
              <h1 className="hero-title">Discover Amazing Products</h1>
              <a href="#products" className="scroll-button">
                <button className="hero-cta">
                  Explore <FaArrowDown className="cta-icon" />
                </button>
              </a>
            </div>
          </section>

          <section className="featured-products" id="products">
            <div className="section-header">
              <h2 className="section-title">Featured Products</h2>
              <div className="divider"></div>
            </div>
            <div className="products-grid">
              {products?.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
