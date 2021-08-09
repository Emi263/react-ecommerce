import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Test from "./Test";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Product from "./components/Product";
import { store } from "./store/store";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import { Provider } from "react-redux";
import PayPal from "./components/PayPal";
import { useSelector } from "react-redux";
import SnackBar from "./components/SnackBar";
import { Paper } from "@material-ui/core";
function App() {
  // const count = useSelector((state) => state.counter.value);
  //const dispatch = useDispatch();
  const [dark, setDark] = React.useState(false);
  const toggleDark = () => {
    setDark(!dark);
  };

  const theme = createTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: purple[500],
        dark: "#000000",
      },
      secondary: {
        main: purple[300],
        dark: purple[700],
        contrastText: "#ffcc00",
      },
    },
  });

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Paper>
            <Switch>
              <Route exact path="/">
                <SnackBar />
                <div className="App">
                  <Header toggleDark={toggleDark} />
                  <ProductsList />
                </div>{" "}
              </Route>

              <Route path="/product/:name">
                <ProductDetails dark={dark} setDark={setDark} />
              </Route>

              <Route path="/checkout">
                <PayPal />
              </Route>
            </Switch>
          </Paper>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
