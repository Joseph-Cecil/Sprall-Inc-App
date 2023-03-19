import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {useSelector, useDispatch} from "react-redux";
import {addItemsToCart, removeItemsFromcart} from "../../actions/cartAction";
import { Link } from 'react-router-dom';
import {Typography} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"

const Cart = ({history}) => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity,Stock) => {
        const newQty = quantity + 1;
        if(Stock <= quantity){
            return
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity){
            return
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromcart(id));
    };

    const checkOutHandler = () => {
        history.push("/login?redirect=delivery")
    }

  return ( 
    <Fragment>
        {cartItems.length === 0 ? (
            <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <Typography>No Products In Your Cart</Typography>
                <Link to="/products" >View Products</Link>
            </div>
        )  : (
            
        <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item) => (
                <div className="cartContainer">
                <CartItemCard item={item} deleteCartItems = {deleteCartItems}/>
                <div className="cartInput" >
                    <button onClick={()=> decreaseQuantity(item.product, item.quantity, item.Stock)}>-</button>
                    <input type="number"  value={item.quantity} readOnly/>
                    <button onClick={()=>increaseQuantity(item.product, item.quantity, item.Stock)}>+</button>
                </div>
                <p className="cartSubtotal">{`Ghc ${
                    item.price * item.quantity
                }`}</p>
            </div>
            ))}

            
            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`Ghc${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price, 0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Cart