import React from "react";
import Header from "./Header";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Button } from "@material-ui/core";
import { addToCart, removeProduct } from "../store/product-slice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  left: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  right: {
    display: "grid",
    placeContent: "center",
    gap: "40px",
  },
  cart: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
});

function ProductDescription({ name, img, description, id, price }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const isInCart = items && items.some((item) => item.id == id);

  const styles = useStyles();

  return (
    <div style={{ padding: "20px" }}>
      <Grid container direction="row" spacing={5}>
        <Grid className={styles.left} item xs={12} md={6}>
          <Typography variant="h3" align="center">
            {name.slice(0, 1).toUpperCase()}
            {name.slice(1)}
          </Typography>
          <img
            style={{
              maxWidth: "100%",
              margin: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={img}
          />
        </Grid>
        <Grid className={styles.right} item xs={12} md={6}>
          <Typography align="center" color="textPrimary" variant="h3">
            Description
          </Typography>
          <Typography color="textSecondary" variant="h6">
            {" "}
            {description}
          </Typography>
          <Typography variant="h5">Price: ${price}</Typography>

          <div className={styles.cart}>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  !isInCart &&
                    dispatch(
                      //ARROW FUNCTIONS ALWAYS WHEN DISPATCHING
                      addToCart({
                        id,
                        price,
                        name,
                        quantity: 1,
                      })
                    );
                  isInCart && dispatch(removeProduct(id));
                }}
                variant="contained"
              >
                <Typography variant="h4">
                  {isInCart ? "Added to cart" : "Add to Cart"}
                </Typography>
                <ShoppingCartIcon
                  color="primary"
                  style={{ fontSize: "40px", cursor: "pointer" }}
                />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDescription;
