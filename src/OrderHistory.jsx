function OrderHistory({ orderHistory }) {
  if (orderHistory.length === 0) {
    return (
      <div className="order-history">
        <p className="order-history__text">No order history found.</p>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2 className="order-history__title">Order History</h2>
      <ul className="order-list">
        {orderHistory.map((order, index) => (
          <div key={index} className="order-list__separator">
            <li className="order-item">
              <div className="order-item__details">
                <p className="order-item__details--date">
                  Order Date: {order.orderDate}
                </p>
                <p className="order-item__details--number">
                  Order Number: {order.orderNumber}
                </p>
                <p className="order-item__details--total">
                  Total: ${order.orderTotal.toFixed(2)}
                </p>
              </div>
              <div className="order-item__image-container">
                {order.productImages.map((imageUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imageUrl}
                    alt="Product"
                    className="order-item__image"
                  />
                ))}
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
