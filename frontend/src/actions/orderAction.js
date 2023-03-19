import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});
        console.log("It is working");

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        console.log("It is working")
        const {data} = await axios.post("/api/v1/order/new", order, config);

        dispatch({type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (error) {
        
    }
}




// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDERS_REQUEST});

        const {data} = await axios.get("/api/v1/orders/me");

        dispatch({type: MY_ORDERS_SUCCESS, payload: data.orders});
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.reponse.data.message,
        })
    }
}


// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/order/${id}`);

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.orders})
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            
        })
    }
}



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}