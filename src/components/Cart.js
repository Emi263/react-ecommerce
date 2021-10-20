import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import { ListItemText, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../store/product-slice";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  Toolbar: {
    display: "flex",
    justifyContent: "space-around",
  },
  numberOfItems: {
    position: "absolute",
    transform: "translate(25px, -5px)",
    display: "block",
    backgroundColor: "black",
    padding: ".2rem .4rem",
    fontSize: "18px",
    borderRadius: "50%",
    color: "yellow",
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "2rem",
    gap: "20px",
  },
  total: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
});

function Cart({ open, setOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.products.items);
  const numberOfItems = useSelector((state) => state.products.numberOfItems);
  const total = useSelector((state) => state.products.total);

  useEffect(() => {
    window.localStorage.setItem("prodInCart", JSON.stringify(productsInCart));
    window.localStorage.setItem("numOfItems", JSON.stringify(numberOfItems));
    window.localStorage.setItem("total", JSON.stringify(total));
  }, [productsInCart]);

  const styles = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const closeContainer = (e) => {
    if (e.target.classList.contains("MuiDialog-container")) {
      setOpen(false);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="cart">
      <Dialog
        onClick={closeContainer}
        aria-labelledby="customized-dialog-title"
        onPointerEnterCapture
        open={open}
      >
        <div>
          {productsInCart.length == 0 && (
            <Typography
              color="textPrimary"
              variant="h5"
              style={{ textAlign: "center", padding: "1rem" }}
            >
              The cart is empty! Try to add some products
            </Typography>
          )}

          <List>
            {!productsInCart.length == 0 && (
              <ListItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <div style={{ flex: "0.25", fontSize: "20px" }}>Product</div>
                <div style={{ fontSize: "20px", flex: "0.3" }}>Quantity</div>
                <div style={{ fontSize: "20px", flex: "0.8" }}>Price</div>
              </ListItem>
            )}
            {productsInCart.map((prod) => (
              <ListItem>
                <ListItemText
                  style={{ fontWeight: "bold", fontSize: "30px" }}
                  primary={`${prod.name
                    .slice(0, 1)
                    .toUpperCase()}${prod.name.slice(1)}`}
                ></ListItemText>
                <ListItemText secondary={prod.quantity}></ListItemText>
                <ListItemText secondary={`$${prod.price}`}></ListItemText>
                <div style={{ padding: ".5rem", display: "flex", gap: "20px" }}>
                  <Button
                    onClick={() => dispatch(decreaseQuantity(prod.id))}
                    variant="contained"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => dispatch(increaseQuantity(prod.id))}
                    variant="contained"
                  >
                    +
                  </Button>
                </div>{" "}
              </ListItem>
            ))}
          </List>
        </div>
        <div className={styles.total}>
          <Typography variant="h6">Total: </Typography>{" "}
          <Typography variant="h6">${total}</Typography>
        </div>
        <div className={styles.buttons}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close the Cart
          </Button>
          <Button
            disabled={total == 0 ? true : false}
            onClick={() => history.push("/checkout")}
            style={{ display: "inline-block" }}
            variant="contained"
            color="primary"
          >
            Proceed to checkout
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default Cart;
