import React, { useState } from "react";
import "./ShippingAddress.css";

function ShippingAddress({ onSave, handleCancel, savedAddress = {} }) {
  console.log("Saved address prop:", savedAddress);
  const [address, setAddress] = useState({
    firstName: savedAddress.firstName || "",
    lastName: savedAddress.lastName || "",
    street: savedAddress.street || "",
    city: savedAddress.city || "",
    state: savedAddress.state || "",
    zipCode: savedAddress.zipCode || "",
    phone: savedAddress.phone || "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="shipping-address__container">
        <div className="shipping-address__text">
          <h2 className="shipping-address__title">Shipping Address</h2>
          <div>
            {address.firstName} {address.lastName}
          </div>
          <div className="shipping-address__">{address.street}</div>
          <div className="shipping-address__info">
            {address.city}, {address.state} {address.zipCode}
          </div>
          <div className="shipping-address__info">{address.phone}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="shipping-address__form-container">
      <h2 className="shipping-address__title">Shipping Address</h2>
      <form className="shipping-address__form" onSubmit={handleSubmit}>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            id="firstName"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            id="lastName"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="street">
            Street Address
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            id="street"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="city">
            City
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            id="city"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            id="zipCode"
            placeholder="11234"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="country">
            Country/Region
          </label>
          <select
            name="country"
            value={address.country}
            onChange={handleChange}
            id="country"
          >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="state">
            State
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            id="state"
          />
        </div>
        <div className="shipping-address__field-group">
          <label className="shipping-address__label" htmlFor="phone">
            Phone
          </label>
          <input
            className="shipping-address__input"
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            id="phone"
          />
        </div>
        <div className="shipping-address__button-row">
          <button className="shipping-address__button--save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;
