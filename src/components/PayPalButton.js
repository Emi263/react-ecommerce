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
    // Congratulation, it came here means everything's fine!
    dispatch(emptyCart());
    dispatch(setMessage("success"));
    dispatch(show());
    history.push("/");

    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    dispatch(setMessage("cancel"));
    dispatch(show());
    history.push("/");
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    dispatch(setMessage("error"));
    dispatch(show());
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox";
  let currency = "USD";

  const client = {
    sandbox: process.env.REACT_APP_SANDBOX_ID,
    production: "YOUR-PRODUCTION-APP-ID",
  };
  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
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
