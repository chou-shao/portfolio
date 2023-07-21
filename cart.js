const uuid = require('uuid').v4;

function makeShoppingCart() {
  const cart = {};
  const cartItems = {};

  cart.contains = function contains(id) {
    return !!cartItems[id];
  };

  cart.getCartItems = function getCartItems() {
    return cartItems;
  };

  cart.addCartItem = function addCartItem(username, productId, selectedSize, quantity, imageUrl, brandName, productName, sku, price) {
    const existingItemKey = Object.keys(cartItems).find(key => {
      const item = cartItems[key];
      return item.productId === productId && item.selectedSize === selectedSize;
    });

    if (existingItemKey) {
      cartItems[existingItemKey].quantity += quantity;
    } else {
      const id = uuid();
      cartItems[id] = {
        username,
        id,
        productId,
        selectedSize,
        quantity,
        imageUrl,
        brandName,
        productName,
        sku,
        price
      };
    }
  };

  cart.getCartItem = function getCartItem(id) {
    return cartItems[id];
  };

  cart.updateCartItem = function updateCartItem(id, newProduct) {
    if (cartItems[id]) {
      cartItems[id].product = newProduct;
    }
  };

  cart.removeCartItem = function removeCartItem(id) {
    delete cartItems[id];
  };

  cart.clearCartItems = function clearCartItems() {
    Object.keys(cartItems).forEach((key) => {
      delete cartItems[key];
    });
  };
  return cart;
};

module.exports = {
  makeShoppingCart,
};
