const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, shoppingCart) {
  users[username] = { shoppingCart, orderCount: 0, orderHistory: [], savedAddresses: [] };
}

function getOrderHistory(username) {
  const userData = getUserData(username);
  if (!userData) {
    return null;
  }
  return userData.orderHistory;
}

function addOrderToHistory(username, order) {
  const userData = getUserData(username);
  if (!userData) {
    return;
  }
  userData.orderHistory.push(order);
}

function incrementOrderCount(username) {
  const userData = getUserData(username);
  if (!userData) {
    return null;
  }
  userData.orderCount += 1;
  return `${username}-${userData.orderCount}`;
}

function updateShippingAddress(username, shippingAddress) {
  const userData = getUserData(username);
  if (!userData) {
    return;
  }
  const addressExists = userData.savedAddresses.some(addr => JSON.stringify(addr) === JSON.stringify(shippingAddress));
  if (!addressExists) {
    userData.savedAddresses.push(shippingAddress);
  }
  userData.shippingAddress = shippingAddress;
}

function getShippingAddress(username) {
  return users[username]?.shippingAddress || null;
}


function clearShoppingCart(username) {
  const userData = getUserData(username);
  if (!userData) {
    return;
  }
  userData.shoppingCart.clearCartItems();
}

module.exports = {
  isValid,
  getUserData,
  addUserData,
  updateShippingAddress,
  getShippingAddress,
  incrementOrderCount,
  clearShoppingCart,
  addOrderToHistory,
  getOrderHistory,
};
