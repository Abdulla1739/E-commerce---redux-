import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../Redux/slice/productSlice";

const NavBar = ({ insideHome }) => {
  const dispatch = useDispatch();
  const yourWishlist = useSelector((state) => state.wishlistReducer);
  const userCart = useSelector((state) => state.cartReducer);

  return (
    <div>
      <Navbar className="bg-warning" fixed="top" expand="lg">
        <Container>
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className="fw-bold py-2"
          >
            <Navbar.Brand style={{ color: "white" }}>
              <i className="fab fa-opencart me-2"></i> EKart
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {insideHome && (
              <div className="d-flex ms-auto w-50">
                <Form.Control
                  type="search"
                  placeholder="Search Product here"
                  className="rounded p-1 w-100"
                  onChange={(e) =>
                    dispatch(searchProducts(e.target.value.toLowerCase()))
                  }
                />
              </div>
            )}
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link
                  to={"/cart"}
                  style={{ color: "black", textDecoration: "none" }}
                  className="fw-bold py-2"
                >
                  <i className="fas fa-shopping-cart me-3"></i>Cart
                </Link>
                <Badge className="ms-2" bg="secondary">
                  {userCart?.length}
                </Badge>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={"/wishlist"}
                  style={{ color: "black", textDecoration: "none" }}
                  className="fw-bold py-2 ms-lg-3"
                >
                  <i className="fas fa-heart me-3"></i>Wishlist
                </Link>
                <Badge className="ms-2" bg="secondary">
                  {yourWishlist?.length}
                </Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
