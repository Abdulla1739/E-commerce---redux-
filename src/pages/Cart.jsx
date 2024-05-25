import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import {
  decrementQuantity,
  emptyCart,
  incrementQuantity,
  removeCartItem,
} from "../Redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const userCart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartTotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (userCart?.length > 0) {
      setTotalPrice(
        userCart?.map((item) => item.totalPrice).reduce((t1, t2) => t1 + t2)
      );
    } else {
      setTotalPrice(0);
    }
  });

  const checkOut = () => {
    dispatch(emptyCart());
    alert("Order placed successfully, Thank you for Purchasing with us");
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="container container-fluid" style={{ marginTop: "80px" }}>
        {userCart?.length > 0 ? (
          <div className="cart my-5 ">
            <h1 className="my-5">Cart Summary</h1>
            <div className="row mt-5">
              <div className="col-lg-8">
                <table className="table shadow">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  {userCart.map((item, index) => (
                    <tbody key={item?.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td style={{ width: "20%" }}>
                          {item?.title.slice(0, 20)}...
                        </td>
                        <td>
                          <img
                            width={"80px"}
                            height={"80px"}
                            src={item?.thumbnail}
                            alt=""
                          />
                        </td>
                        <td>
                          <div className="d-flex flex-row">
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                              className="btn"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item?.quantity}
                              style={{ width: "50px" }}
                              className="fw-bolder me-1 ms-1"
                              readOnly
                            />
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(item.id))
                              }
                              className="btn"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(item?.totalPrice || 0).toFixed(2)}</td>
                        <td>
                          <button
                            onClick={() => dispatch(removeCartItem(item?.id))}
                            className="btn"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                <div className="float-end">
                  <button
                    onClick={() => dispatch(emptyCart())}
                    className="btn btn-danger me-2"
                  >
                    Empty Cart
                  </button>
                  <Link to={"/"} className="btn btn-primary">
                    Shop More
                  </Link>
                </div>
              </div>
              {/* <div className="col"></div> */}
              <div className="col-lg-4  p-5">
                <h4>
                  Total Amount:{" "}
                  <span className="text-danger">${cartTotalPrice}</span>
                </h4>
                <hr />
                <div className="d-grid">
                  <button onClick={checkOut} className="btn btn-success w-100">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ height: "60vh" }}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvUXOZ5IZeNZP2hCdsa2NL4s9os8EM_pKHbwFpQYphw&s"
              alt=""
            />
            <h6 className="text-danger mt-3">Your Cart is empty</h6>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
