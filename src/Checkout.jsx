import { useState, useEffect } from "react";

import {
  fetchSaveShippingAddress,
  fetchCheckout,
  fetchAccount,
} from "./services";

import {
  SHIPPING_ADDRESS_MESSAGES,
  SHIPPING_ADDRESS_STATUS,
  MESSAGES,
} from "./constants";

import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import CardDetails from "./CardDetails";
import Loading from "./Loading";
import OrderSummary from "./OrderSummary";

import "./Checkout.css";
import "./OrderSummary.css";

function Checkout({
  cartItems,
  username,
  onUpdateCartItems,
  handleContinueShopping,
}) {
  const [userSavedAddress, setUserSavedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [useAsBilling, setUseAsBilling] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [cardDetails, setCardDetails] = useState({});
  const [cardValidationDetails, setCardValidationDetails] = useState({});
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");
  const [isOrderConfirmation, setIsOrderConfirmation] = useState(false);
  const [orderConfirmationItems, setOrderConfirmationItems] = useState();

  useEffect(() => {
    fetchAccount()
      .then((data) => {
        setUserSavedAddress(data.shippingAddress);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  function handleCardDetailsChange(updateCardDetails) {
    setCardDetails(updateCardDetails);
  }
  function handleCardValidationChange(updateCardValidationDetails) {
    setCardValidationDetails(updateCardValidationDetails);
  }

  function handlePlaceOrder() {
    setCheckoutErrorMessage("");
    fetchCheckout(cardDetails)
      .then((response) => {
        setOrderConfirmationItems(cartItems);
        onUpdateCartItems();
        setIsOrderConfirmation(true);
      })
      .catch((response) => {
        const errorCode = response.error;
        const errorMessage = MESSAGES[errorCode] || MESSAGES.default;
        setCheckoutErrorMessage(errorMessage);
      });
  }

  function handleSaveShippingAddress(shippingAddress) {
    setSaveStatus(SHIPPING_ADDRESS_STATUS.SAVING);
    fetchSaveShippingAddress(username, shippingAddress)
      .then(() => {
        setSaveStatus(SHIPPING_ADDRESS_STATUS.SAVED);
      })
      .catch((error) => {
        setSaveStatus(SHIPPING_ADDRESS_STATUS.ERROR);
      });
  }

  function handleCancel() {
    setShippingAddress({});
  }

  function handleUseAsBillingChange(checked) {
    setUseAsBilling(checked);
  }

  return (
    <div className="checkout__container">
      <div className="checkout__wrapper">
        {!isOrderConfirmation && (
          <div className="checkout__content">
            {saveStatus && <p>{SHIPPING_ADDRESS_MESSAGES[saveStatus]}</p>}
            <h2>Checkout</h2>
            {isLoading ? (
              <Loading />
            ) : (
              <ShippingAddress
                onSave={handleSaveShippingAddress}
                useAsBilling={useAsBilling}
                onUseAsBillingChange={handleUseAsBillingChange}
                onCancel={handleCancel}
                savedAddress={userSavedAddress}
              />
            )}
            <ShippingMethod />
            <CardDetails
              onCardDetailsChange={handleCardDetailsChange}
              handleCardValidationChange={handleCardValidationChange}
            />
          </div>
        )}

        <div className="order-summary__container">
          {cartItems && Object.keys(cartItems).length > 0 && (
            <OrderSummary
              cartItems={cartItems}
              orderConfirmationItems={orderConfirmationItems}
              showSummaryDetails={true}
              showContinueShoppingButton={true}
              handleContinueShopping={handleContinueShopping}
              isOrderConfirmation={isOrderConfirmation}
            />
          )}
          {orderConfirmationItems &&
            Object.keys(orderConfirmationItems).length > 0 && (
              <OrderSummary
                cartItems={cartItems}
                showSummaryDetails={true}
                showContinueShoppingButton={true}
                handleContinueShopping={handleContinueShopping}
                isOrderConfirmation={isOrderConfirmation}
                orderConfirmationItems={orderConfirmationItems}
              />
            )}
        </div>
      </div>
      {checkoutErrorMessage && (
        <p className="error-message">{checkoutErrorMessage}</p>
      )}
      {!isOrderConfirmation && (
        <button className="checkout__button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
}

export default Checkout;
