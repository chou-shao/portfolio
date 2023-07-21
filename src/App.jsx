import { useState, useEffect } from "react";
import "./App.css";
import { LOGIN_STATUS, CLIENT, MESSAGES } from "./constants";
import {
  fetchProductItemPage,
  fetchProducts,
  fetchExclusiveProducts,
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchCart,
  fetchCheckout,
} from "./services";

import Header from "./Header";
import Main from "./Main";
import ProductPage from "./ProductPage";
import MembersOnly from "./MembersOnly";
import Account from "./Account";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  const [error, setError] = useState("");
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [exclusiveProducts, setExclusiveProducts] = useState([]);
  const [nonExclusiveProducts, setNonExclusiveProducts] = useState([]);
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [username, setUsername] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState("Main");
  const [cartItems, setCartItems] = useState({});
  const [orderSummary, setOrderSummary] = useState(null);
  const [placedOrderItems, setPlacedOrderItems] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");

  const isLoggedIn = loginStatus === LOGIN_STATUS.IS_LOGGED_IN;

  function onNav(targetPage) {
    setPage(targetPage);
  }

  function handleContinueShopping() {
    setPage("Main");
  }

  function onPlaceOrder(cardNumber) {
    const requestBody = { cardNumber };
    return fetchCheckout(requestBody)
      .then((response) => {
        setPlacedOrderItems(cartItems);
        clearCart();
        setOrderSummary(response);
        onNav("Order Confirmation");
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        const errorCode = error.error;
        const errorMessage = MESSAGES[errorCode] || MESSAGES.default;
        setCheckoutError(errorMessage);
      });
  }

  function clearCart() {
    setCartItems({});
  }

  function handleRemoveFromCart(itemId) {
    const updatedCartItems = { ...cartItems };
    delete updatedCartItems[itemId];
    setCartItems(updatedCartItems);
  }

  const totalCartQuantity = getTotalCartQuantity();

  function getTotalCartQuantity() {
    return Object.values(cartItems).reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
  }

  function onUpdateCartItems() {
    fetchCart()
      .then((cartItems) => {
        setCartItems(cartItems);
      })
      .catch((error) => {});
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setCartItems({});
    setPage("Main");
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((response) => {
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setCartItems(response.cartItems);
        checkForSession();
        setPage("Members Only");
      })
      .catch((error) => {});
  }

  useEffect(() => {
    checkForSession();
    onUpdateCartItems();
  }, []);

  function handleProductClick(productLink) {
    setPage("ProductPage");
    fetchProductItemPage(productLink)
      .then((productData) => {
        setFetchedProduct(productData);
      })
      .catch((error) => {});
  }

  function handleCloseProductPage() {
    setFetchedProduct(null);
    setPage("Main");
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchExclusiveProducts();
      })
      .then((exclusiveProductsData) => {
        setExclusiveProducts(exclusiveProductsData);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION || err?.error === "noSession") {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        } else {
          return Promise.reject(err);
        }
      })
      .finally(() => {
        fetchProducts()
          .then((nonExclusiveProductsData) => {
            setNonExclusiveProducts(nonExclusiveProductsData);
          })
          .catch((err) => {
            setError(err?.error || "ERROR");
          });
      });
  }

  return (
    <div className="app">
      <Header
        onNav={onNav}
        page={page}
        onLogin={onLogin}
        loginStatus={loginStatus}
        onLogout={onLogout}
        totalCartQuantity={totalCartQuantity}
      />
      {page === "Members Only" ? (
        <MembersOnly
          onProductClick={handleProductClick}
          exclusiveProducts={exclusiveProducts}
          isLoggedIn={isLoggedIn}
          onNav={onNav}
          username={username}
        />
      ) : (
        <>
          {page === "Main" && (
            <Main
              onProductClick={handleProductClick}
              productData={fetchedProduct}
              nonExclusiveProducts={nonExclusiveProducts}
            />
          )}
          {page === "ProductPage" && fetchedProduct && (
            <ProductPage
              product={fetchedProduct}
              onClose={handleCloseProductPage}
              onCartUpdate={onUpdateCartItems}
            />
          )}

          {page === "Account" && <Account />}

          {page === "Shopping Bag" && (
            <Cart
              cartItems={cartItems}
              username={username}
              onLogout={onLogout}
              onNav={onNav}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )}
          {page === "Checkout" && (
            <Checkout
              onNav={onNav}
              username={username}
              onPlaceOrder={onPlaceOrder}
              onUpdateCartItems={onUpdateCartItems}
              cartItems={cartItems}
              checkoutError={checkoutError}
              handleContinueShopping={handleContinueShopping}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
