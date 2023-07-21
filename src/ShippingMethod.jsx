import { useState } from "react";

import "./ShippingMethod.css";

function ShippingMethod() {
  const [selectedMethod, setSelectedMethod] = useState("express");

  const calculateDeliveryDateRange = () => {
    const currentDate = new Date();

    const date1 = new Date(currentDate);
    date1.setDate(date1.getDate() + 3);

    const date2 = new Date(currentDate);
    date2.setDate(date2.getDate() + 5);

    const formatDate = (date) => {
      return (
        date.toLocaleString("default", { month: "short" }) +
        " " +
        date.getDate()
      );
    };
    return `${formatDate(date1)} - ${formatDate(date2)}`;
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="shipping-method__container">
      <h2 className="shipping-method__title">Shipping Method</h2>
      <div className="shipping-method__type">
        <input
          className="shipping-method__express"
          type="radio"
          id="express"
          name="shippingMethod"
          value="express"
          checked={selectedMethod === "express"}
          onChange={handleMethodChange}
        />
        <label htmlFor="express" className="shipping-method__label">
          $0.00 USD | Express Delivered by {calculateDeliveryDateRange()}
        </label>
      </div>
    </div>
  );
}

export default ShippingMethod;
