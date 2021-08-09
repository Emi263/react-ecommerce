import React from "react";
import Product from "./Product";
import { products } from "./productData";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

function ProductsList() {
  return (
    <div style={{ padding: "20px" }}>
      <Grid style={{ marginTop: "50px" }} spacing={5} container direction="row">
        {products.map((prod) => (
          <Grid key={prod.id} item xs={12} lg={4}>
            {" "}
            <Link to={`/product/${prod.name.toLowerCase()}`}>
              <Product
                key={prod.id}
                name={prod.name}
                img={prod.img}
                price={prod.price}
              />{" "}
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductsList;
