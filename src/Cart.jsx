import { useState } from "react";
import { fetchRemoveCartItem } from "./services";

import "./Cart.css";

function Cart({
  cartItems: initialCartItems,
  username,
  onLogout,
  onNav,
  handleRemoveFromCart,
}) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const cartItemsArray = Object.values(cartItems);
  const subtotal = cartItemsArray.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const orderTotal = subtotal;

  const handleRemove = (itemId) => {
    fetchRemoveCartItem(itemId)
      .then((updatedCartItems) => {
        setCartItems(updatedCartItems);
        handleRemoveFromCart(itemId);
      })
      .catch((error) => {});
  };

  const handleSwitchUser = () => {
    onLogout();
    onNav("Shopping Bag");
  };

  return (
    <div className="shopping-bag__container">
      <h2 className="shopping-bag__title">Shopping Bag</h2>
      {cartItemsArray.length === 0 && <p>Your shopping bag is empty.</p>}
      {cartItemsArray.length > 0 && (
        <div className="shopping-bag__display-container">
          <div className="shopping-bag__items">
            {cartItemsArray.map((item, index) => (
              <div key={`${item.id}-${index}`} className="shopping-bag__item">
                <img
                  src={item.imageUrl}
                  alt={item.brandName}
                  className="shopping-bag__item--image"
                />
                <div className="shoppin-bag__item--info-container">
                  <p className="shopping-bag__item--info">
                    Brand: {item.brandName}
                  </p>
                  <p className="shopping-bag__item--info">
                    Product: {item.productName}
                  </p>
                  <p className="shopping-bag__item--info">SKU: {item.sku}</p>
                  <p className="shopping-bag__item--info">
                    Size: {item.selectedSize}
                  </p>
                  <p className="shopping-bag__item--info">
                    Price: ${item.price ? item.price.toFixed(2) : "N/A"}
                  </p>
                  <p className="shopping-bag__item--info">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="shopping-bag__remove-container">
                  <button
                    className="shopping-bag__remove-button"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary__container">
            <div className="cart-summary__user">
              LOGGED IN AS:{" "}
              <span className="cart-summary__current-user">{username}</span>
            </div>
            <div className="switch-account">
              Not your account?{" "}
              <a
                href="#"
                className="switch-account__link"
                onClick={handleSwitchUser}
              >
                Sign in as another user
              </a>
            </div>
            <p className="order-summary__subtotal">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className="order-summary__shipping">
              Shipping estimate: Calculate at Checkout
            </p>
            <p className="order-summary__total">
              Order Total: ${orderTotal.toFixed(2)}
            </p>
            <button
              className="checkout-button"
              onClick={() => onNav("Checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
