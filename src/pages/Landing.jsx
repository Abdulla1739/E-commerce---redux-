import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Row, Col, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/slice/productSlice";

const Landing = () => {
  const dispatch = useDispatch();

  const { allProducts, error, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <NavBar insideHome={true} />
      <div className="container container-fluid" style={{ marginTop: "80px" }}>
        {loading ? (
          <div className="text-center mt-5 fw-bolder">
            <Spinner className="me-2" animation="border" variant="info" />{" "}
            Loading...
          </div>
        ) : (
          <Row className="my-5">
            {allProducts?.length > 0 ? (
              allProducts?.map((product) => (
                <Col
                  key={product?.id}
                  className="mb-5"
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Card className="shadow rounded" style={{ width: "100%" }}>
                    <Card.Img
                      height={"200px"}
                      variant="top"
                      src={product.thumbnail}
                    />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0, 20)}..</Card.Title>
                      <div className="text-start mt-3">
                        <Link to={`${product.id}/view`}>View More ...</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="fw-bolder text-center mt-5 mb-5 text-danger">
                product not found
              </div>
            )}
          </Row>
        )}
      </div>
    </>
  );
};

export default Landing;
