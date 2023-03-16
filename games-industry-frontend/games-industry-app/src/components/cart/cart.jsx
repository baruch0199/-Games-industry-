import usersSerivce from "../../services/usersSerivce";
import { useEffect, useState, useContext } from "react";

import productServiceUser from "../../services/product-service-tools-for-user";
import Total from "../total";
import { useAuth } from "../contexts/auth-context";
import CartProducts from "../cart-products/cart-products";
import { CartContext } from "../contexts/cart-context";
import feedback from "../feedback";

const Cart = () => {
  const { user } = useAuth();
  const admin = user() ? user().admin : null;

  const { cartProducs, renderNow } = useContext(CartContext);

  const buyingProductsHandler = async () => {
    if (!user()) {
      feedback(
        "No products in the cart. You must sign in. If you have no account, sign up",
        10000
      );
      return;
    }

    if (!cartProducs.length) {
      feedback("you must add product", 10000);
      return;
    }

    if (cartProducs.length) {
      feedback("well done, you have bought products successfully", 10000);
    }

    const buyProducts = async () => {
      return await productServiceUser.buyProducts();
    };

    await buyProducts();
    renderNow();
  };

  return (
    <div className="cart-section-wrapper">
      <div className="cart-section">
        <div className="products-titles">
          <div className="delete-and-product-tile">
            <div className="delete-title">Delete</div>
            <div className="product-title">Product</div>
          </div>
          <div className="subtotal-title">Subtotal</div>
        </div>
        <CartProducts cartProducs={cartProducs} />
        <div className="products-form" noValidate autoComplete="off">
          <button className="products-btn " onClick={buyingProductsHandler}>
            buy
          </button>
          <Total cartProducs={cartProducs} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
