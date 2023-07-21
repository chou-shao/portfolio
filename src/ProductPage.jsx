import { useState } from "react";
import { addToCart, fetchCart } from "./services";

import "./ProductPage.css";
import { MESSAGES, SERVER } from "./constants.js";

function ProductPage({ product, onClose, onCartUpdate }) {
  const {
    id,
    sku,
    imageUrl,
    brandName,
    productName,
    productLink,
    price,
    description,
    materials,
    madeIn,
    availableSizes,
  } = product;

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  function handleAddToCart() {
    addToCart(product, selectedSize, 1)
      .then(() => {
        setMessage("Item added to cart!");
        setShowMessage(true);
        onCartUpdate();
        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      })
      .catch((error) => {
        setMessage(
          MESSAGES[error.error] || "An error occurred. Please try again."
        );
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      });
  }

  function handleSizeSelected(event) {
    setSelectedSize(event.target.value);
  }

  return (
    <div className="product-page__container">
      {showMessage && <div className="product-page__message">{message}</div>}
      <div className="product-page__left">
        <h1 className="product-page__brand">{brandName}</h1>
        <h2 className="product-page__product-name">{productName}</h2>
        <p className="product-page__description">{description}</p>
        <p className="product-page__description">Materials: {materials}</p>
        <p className="product-page__description">Made in {madeIn}</p>
        <p className="product-page__description">SKU: {sku}</p>
      </div>
      <div className="product-page__center">
        <img src={imageUrl} alt={productName} className="product-page__image" />
      </div>
      <div className="product-page__right">
        <p className="product-page__price">${price}</p>
        <select
          className="product-page__size-select"
          value={selectedSize}
          onChange={handleSizeSelected}
        >
          {availableSizes.map(({ size, isAvailable }) => (
            <option key={size} value={size} disabled={!isAvailable}>
              {size} {isAvailable ? "" : "(Unavailable)"}
            </option>
          ))}
        </select>
        <button className="product-page__add-to-bag" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <button className="product-page__close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default ProductPage;
