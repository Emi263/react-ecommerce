import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cart from "./Cart";

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
});

function Header({ toggleDark }) {
  const numberOfItems = useSelector((state) => state.products.numberOfItems);

  const history = useHistory();
  const [open, setOpen] = useState(false); //MODAL STATE
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar className={styles.appBar} position="relative">
        <Toolbar className={styles.Toolbar}>
          <div>
            <Switch onClick={toggleDark} color="secondary" />
          </div>
          <div onClick={() => history.push("/")}>
            <Typography
              style={{
                cursor: "pointer",
                fontFamily: "'Indie Flower', cursive",
              }}
              align="center"
              variant="h3"
            >
              Shopify
            </Typography>
          </div>
          <div onClick={() => setOpen(!open)}>
            <span className={styles.numberOfItems}>{numberOfItems}</span>
            <ShoppingCartIcon style={{ fontSize: "40px", cursor: "pointer" }} />
          </div>
        </Toolbar>
      </AppBar>

      <Cart open={open} setOpen={setOpen} />
    </div>
  );
}

export default Header;
