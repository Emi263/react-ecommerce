import React, { useState } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../store/product-slice";
import { show, setMessage } from "../store/snackBar-slice";
import { useHistory } from "react-router";
export default function PayPalButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const totalAmount = useSelector((state) => state.products.total);
  const onSuccess = (payment) => {
    dispatch(emptyCart());
    dispatch(setMessage("success"));
    dispatch(show());
    history.push("/");
  };

  const onCancel = (data) => {
    dispatch(setMessage("cancel"));
    dispatch(show());
    history.push("/");
  };

  const onError = (err) => {
    dispatch(setMessage("error"));
    dispatch(show());
  };

  let env = "sandbox";
  let currency = "USD";

  const client = {
    sandbox: process.env.REACT_APP_SANDBOX_ID,
    production: "YOUR-PRODUCTION-APP-ID",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={totalAmount}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
}
