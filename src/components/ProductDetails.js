import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { products } from "./productData";
import ProductDescription from "./ProductDescription";
function ProductDetails({ dark, setDark }) {
  const { name } = useParams();

  const singleProduct = products.filter(
    (prod) => prod.name.toLowerCase() == name
  );
  console.log(singleProduct);
  const toggleDark = () => {
    setDark(!dark);
  };
  return (
    <>
      {" "}
      <Header toggleDark={toggleDark} />
      <ProductDescription
        img={singleProduct[0].img}
        name={singleProduct[0].name}
        description={singleProduct[0].description}
        price={singleProduct[0].price}
        id={singleProduct[0].id}
      />
    </>
  );
}

export default ProductDetails;
