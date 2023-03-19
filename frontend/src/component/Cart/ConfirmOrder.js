import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({history}) => {
  const { deliveryInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item)=> acc + item.quantity * item.price,
    0
  );

  const deliveryCharges = subtotal > 30 ? 5 : 3;

  const totalPrice = subtotal + deliveryCharges;

  const address = `${deliveryInfo.area}, ${deliveryInfo.streetName}, ${deliveryInfo.houseNum}`

  const proceedToPayment = () => {
    const data = {
      subtotal,
      deliveryCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment")
  }


  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmDeliveryAddress">
            <Typography>Delivery Info</Typography>
            <div className="confirmDeliveryAddressBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{deliveryInfo.phoneNum}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">

            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity}X Ghc{item.price} ={" "}
                      <b>Ghc{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {/* */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Ghc{subtotal}</span>
              </div>
              <div>
                <p>Delivery Fee</p>
                <span>Ghc{deliveryCharges}</span>
              </div>
             </div>
 
             <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span>Ghc{totalPrice}</span>
             </div>

             <button onClick={proceedToPayment}>Proceed To Payment</button>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
