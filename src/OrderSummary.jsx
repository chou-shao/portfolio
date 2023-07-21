function OrderSummary({
  cartItems,
  onRemove,
  showSummaryDetails = false,
  handleContinueShopping,
  isOrderConfirmation,
  orderConfirmationItems,
}) {
  let subtotal;
  let orderItems;
  const shippingTotal = 0;
  if (isOrderConfirmation) {
    orderItems = orderConfirmationItems;
  } else {
    orderItems = cartItems;
  }
  subtotal = Object.values(orderItems).reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );
  const taxes = subtotal * 0.1;
  const orderTotal = subtotal + taxes + shippingTotal;

  return (
    <div className="order-summary">
      {isOrderConfirmation && (
        <>
          <h2 className="order-summary__title">Thank You!</h2>
          <p className="order-summary__confirmation">
            Your order has been received and is currently being processed.
          </p>
          <p className="order-summary__confirmation">
            An email with your receipt and confirmation details will be sent to
            you shortly. Should you have any questions, please contact us at
            sneakerhead/en-us/customer-service.
          </p>
        </>
      )}
      {Object.values(orderItems).map((item, index) => (
        <div key={`${item.id}-${index}`} className="order-summary__item">
          <img
            className="order-item__image"
            src={item.imageUrl}
            alt={item.brandName}
          />
          <div className="order-item__info-container">
            <div className="order-item__info">Brand: {item.brandName}</div>
            <div className="order-item__info">Product: {item.productName}</div>
          </div>
          <div className="order-item__price">
            Price: ${item.price ? item.price.toFixed(2) : "N/A"}
          </div>
          {onRemove && (
            <button onClick={() => onRemove(item.id)}>Remove</button>
          )}
        </div>
      ))}

      {showSummaryDetails && (
        <div className="order-summary__details-container">
          <div className="order-summary__subtotal">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <div className="order-sumamry__shipping">
            Shipping Total: ${shippingTotal.toFixed(2)}
          </div>
          <div className="order-summary__taxes">Taxes: ${taxes.toFixed(2)}</div>
          <div className="order-sumamry__total">
            Order Total: ${orderTotal.toFixed(2)}
          </div>
        </div>
      )}
      {isOrderConfirmation && (
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      )}
    </div>
  );
}
export default OrderSummary;
