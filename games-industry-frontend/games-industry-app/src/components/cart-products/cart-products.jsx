import "./cart-products.scss";

import { useContext } from "react";
import { CartContext } from "../contexts/cart-context";

const CartProducts = () => {
  const { removeProductFromCart, cartProducs } = useContext(CartContext);

  return (
    <>
      {cartProducs.map((product) => {
        const { title, image, worth, _id } = product;
        return (
          <div className="products" key={_id}>
            {/* <Link to={`../delete-game-test/${_id}`}>delete</Link> */}
            <div className="cart-products-delete-wrapper">
              <div
                className="bi bi-trash3 cart-products-delete"
                onClick={() => removeProductFromCart(_id)}></div>
            </div>
            <div className="products-image-and-title">
              <div className="products-image-wrapper">
                <img className="products-image" src={image} alt={image} />
              </div>
              <div className="products-title">{title}</div>
            </div>
            <div className="products-worth">{worth}</div>
          </div>
        );
      })}
    </>
  );
};

export default CartProducts;
