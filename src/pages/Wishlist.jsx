import React from "react";
import NavBar from "../components/NavBar";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../Redux/slice/wishlistSlice";
import { addToCart } from "../Redux/slice/cartSlice";


const Wishlist = () => {
  const yourWishlist = useSelector(state=>state.wishlistReducer)
  const userCart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()


  const handleCart =(item)=>{
    const existingProduct = userCart?.find(product=>product.id==item.id)
    if(existingProduct){
      dispatch(addToCart(item))
      dispatch(removeWishlistItem(item.id))
      alert("item Added to cart")
    }else{
      dispatch(addToCart(item))
      dispatch(removeWishlistItem(item.id))
    }
  }





  return (
    <>
      <NavBar />
      <div className="container container-fluid" style={{ marginTop: "80px" }}>
        <h3>Your Wishlist</h3>
        <Row className="my-5">
          {yourWishlist?.length>0?(
            yourWishlist.map(item=>(
              <Col key={item?.id} className="mb-5 me-2" sm={12} md={6} lg={4} xl={3}>
            <Card className="shadow rounded" style={{ width: "100%" }}>
              <Card.Img
                height={"200px"}
                variant="top"
                src={item?.thumbnail}
              />
              <Card.Body>
                <Card.Title>{item?.title.slice(0,20)}...</Card.Title>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <button onClick={()=>dispatch(removeWishlistItem(item.id))} className="btn">
                    <i className="fas fa-heart me-3"></i>
                  </button>
                  <button onClick={()=>handleCart(item)} className="btn">
                    <i className="fas fa-shopping-cart me-3"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>

            ))
            
          ):(

           <div style={{height:"60vh"}} className="d-flex align-items-center justify-content-center flex-column">
            <img src="https://www.mestores.com/assets/img/empty-wishlist@2x.png" alt="" />
                <h6 className="text-danger mt-3">Your Wishlist is empty</h6>
  
           </div>
          )

          }
        </Row>
      </div>
    </>
  );
};

export default Wishlist;
