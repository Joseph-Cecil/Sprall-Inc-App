import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Product";
import Search from "./component/Product/Search";
import Contact from "./component/Product/Contact";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import Cart from "./component/Cart/Cart";
import Delivery from "./component/Cart/Delivery";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/delivery" component={Delivery} />
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/process/payment" component={Payment} />
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <Switch>
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
