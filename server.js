const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const {
  isValid,
  getUserData,
  addUserData,
  updateShippingAddress,
  getShippingAddress,
  incrementOrderCount,
  clearShoppingCart,
  addOrderToHistory,
} = require('./users');

const { makeShoppingCart } = require('./cart');

const { getProductByLink, getExclusiveProducts, getNonExclusiveProducts } = require('./products');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;
  if (!isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === 'dog') {
    res.status(403).json({ error: 'auth-disallowed' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = getUserData(username);
  if (!existingUserData) {
    const shoppingCart = makeShoppingCart();
    addUserData(username, shoppingCart);
  }
  res.cookie('sid', sid);
  const userData = getUserData(username);
  const cartItems = userData.shoppingCart.getCartItems();
  res.json({ cartItems });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (sid) {
    res.clearCookie('sid');
  }
  if (username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get('/api/v1/products', (req, res) => {
  const exclusive = req.query.exclusive;
  if (exclusive === 'true') {
    const exclusiveProducts = getExclusiveProducts();
    res.json(exclusiveProducts);
  } else {
    const nonExclusiveProducts = getNonExclusiveProducts();
    res.json(nonExclusiveProducts);
  }
});

app.get('/api/v1/products/:productLink', (req, res) => {
  const productLink = req.params.productLink;
  const product = getProductByLink(productLink);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'product not found' });
  }
});

app.post('/api/v1/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'not-logged-in-cart' });
    return;
  }
  const userData = getUserData(username);
  const shoppingCart = userData.shoppingCart;
  const { productId, selectedSize, quantity, imageUrl, brandName, productName, sku, price } = req.body;
  shoppingCart.addCartItem(username, productId, selectedSize, quantity, imageUrl, brandName, productName, sku, price);
  const cartItems = shoppingCart.getCartItems();
  res.json({ message: 'item-added' });
});

app.get('/api/v1/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const userData = getUserData(username);
  if (!userData) {
    res.status(404).json({ error: 'user-data-not-found' });
    return;
  }
  const cartItems = userData.shoppingCart.getCartItems();
  res.json(cartItems);
});

app.delete('/api/v1/cart/:itemId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  const itemId = req.params.itemId;
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const userData = getUserData(username);
  if (!userData) {
    res.status(404).json({ error: 'user-data-not-found' });
    return;
  }
  userData.shoppingCart.removeCartItem(itemId);
  const cartItems = userData.shoppingCart.getCartItems();
  res.json(cartItems);
});

app.post('/api/v1/checkout', (req, res) => {
  function isValidCardHolderName(name) {
    let isValid = true;
    isValid = !!name && name.trim();
    isValid = isValid && name.match(/^[A-Za-z]+(?: [A-Za-z]+)?$/);
    return isValid;
  }
  function isValidMonth(month) {
    let isValid = true;
    isValid = !!month && month.trim();
    isValid = isValid && month.match(/^(0[1-9]|1[0-2])$/);
    return isValid;
  }
  function isValidYear(year) {
    let isValid = true;
    isValid = !!year && year.trim();
    isValid = isValid && year.match(/^(202[3-9]|203[0-4])$/);
    return isValid;
  }
  function isValidSecurityCode(code) {
    let isValid = true;
    isValid = !!code && code.trim();
    isValid = isValid && code.match(/^\d{3,4}$/);
    return isValid;
  }
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { cardNumber, cardholderName, expirationMonth, expirationYear, securityCode } = req.body;
  if (!cardNumber || cardNumber.trim() === '') {
    res.status(400).json({ error: 'card-missing' });
    return;
  }
  const strippedCardNumber = cardNumber.replace(/\s+/g, '');
  const isCardNumberValid = /^\d{16}$/.test(strippedCardNumber);
  if (!isCardNumberValid) {
    res.status(400).json({ error: 'card-invalid' });
    return;
  }
  if (!isValidCardHolderName(cardholderName) || !isValidMonth(expirationMonth) || !isValidYear(expirationYear) || !isValidSecurityCode(securityCode)) {
    res.status(400).json({ error: 'card-invalid' });
    return;
  }
  const orderNumber = incrementOrderCount(username);
  const userData = getUserData(username);
  const cartItems = userData.shoppingCart.getCartItems();
  const cartItemsArray = Object.values(cartItems);
  const orderTotal = cartItemsArray.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const newOrder = {
    orderNumber,
    orderDate: new Date().toISOString(),
    orderTotal,
    orderItems: cartItemsArray
  };
  addOrderToHistory(username, newOrder);
  clearShoppingCart(username);
  res.json({ orderNumber });
});

app.post('/api/v1/address', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const shippingAddress = req.body;
  updateShippingAddress(username, shippingAddress);
  const updatedUserData = getUserData(username);
  res.json({ shippingAddress });
});

app.get('/api/v1/account', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const userData = getUserData(username);
  if (!userData) {
    res.status(404).json({ error: 'user-data-not-found' });
    return;
  }
  const orderHistory = userData.orderHistory.map(order => {
    const orderWithImages = {
      ...order,
      productImages: order.orderItems.map(item => item.imageUrl)
    };
    return orderWithImages;
  });
  const { shippingAddress } = userData;
  res.json({ orderHistory, shippingAddress });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



