import React,{Fragment, useEffect, useRef} from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import axios from 'axios';
import "./Payment.css"
import { createOrder,clearErrors } from '../../actions/orderAction';

const Payment = ({history}) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const payBtn = useRef(null);

    const {deliveryInfo, cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user)
    const {error} = useSelector((state) => state.newOrder)

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        deliveryInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        deliveryCharges: orderInfo.deliveryCharges,
        totalPrice: orderInfo.totalPrice
    }
    const result = {
        billing_details: {
            name: user.name,
            email: user.email,
            address: {
                line1: deliveryInfo.address
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        const config ={
            headers: {
                "Content-Type" : "application/json",
            },
        };

          const {data} = axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
        );

        const client = data;
        if(submitHandler) return;

        const result = {
            billing_details: {
                name:user.name,
                email:user.email,
                address: {
                    line1: deliveryInfo.area,
                    street: deliveryInfo.streetName,
                    house: deliveryInfo.houseNum,
                    city: deliveryInfo.phoneNo
                },
            }
        }

        if (result.error) {
            alert.error(result.error.message);
        }else {
            if(result.paymentIntent.status === "succeeded") {
                history.push("/success")
            }else{
                alert.error("There was an aerror while processing")
            }
           
        }

        
        
        
    }

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
    }
    }, [dispatch,error, alert])
    
  return (
    <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className ="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Payment Method -- Cash On Delivery</Typography>
        

        <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice} on Delivery`}
            ref={payBtn}
            onClick= { (createOrder(order))}
                
            className="paymentFormBtn"
            />
            </form>
            </div>
    </Fragment>
  )
}

export default Payment