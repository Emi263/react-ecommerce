import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  img: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
  },
});
function Product({ img, name, price }) {
  const classes = useStyles();
  return (
    <div className="product">
      <Card style={{ borderRadius: "20px" }}>
        <img className={classes.img} src={img} />
        <CardContent>
          <Typography variant="h6">
            {name.slice(0, 1).toUpperCase()}
            {name.slice(1)}
          </Typography>{" "}
          <Typography color="success">${price}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Product;
