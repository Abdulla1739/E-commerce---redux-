import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../Redux/slice/wishlistSlice";
import { addToCart } from "../Redux/slice/cartSlice";

const View = () => {
  const [product, setproduct] = useState();
  const { id } = useParams();
  const userWishlist = useSelector((state) => state.wishlistReducer);
  const userCart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  console.log(userWishlist);
  console.log(userCart, "cart items");

  useEffect(() => {
    if (localStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(localStorage.getItem("allProducts"));
      setproduct(allProducts.find((item) => item.id == id));
    }
  }, []);

  const handleWishlist = () => {
    if (userWishlist?.includes(product)) {
      alert("item already in your wishlist");
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleCart =()=>{
    const existingProduct = userCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("item Added to cart")
    }else{
      dispatch(addToCart(product))
    }
  }

  return (
    <>
      <NavBar />
      <div
        className="container container-fluid d-flex justify-content-center align-items-center"
        style={{ marginTop: "80px" }}
      >
        <div className="row align-items-center my-5">
          <div className="col-lg-6 ">
            <img
              width={"100%"}
              className="rounded"
              src={product?.thumbnail}
              alt=""
            />
          </div>
          <div className="col-lg-6 p-lg-5 shadow">
            <h6>Product Id: {product?.id}</h6>
            <h1>{product?.title}</h1>
            <p className="text-justify">{product?.description} </p>
            <h5 className="text-danger">$ {product?.price}</h5>
            <div className="d-flex flex-column w-50 my-4">
              <button
                onClick={handleCart}
                className="mb-3 btn btn-warning border shadow"
              >
                <i className="fas fa-shopping-cart me-3"></i>Add to cart
              </button>
              <button
                onClick={handleWishlist}
                className="btn btn-danger border shadow"
              >
                <i className="fas fa-heart me-3"></i>Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
