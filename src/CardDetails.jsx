import React, { useState } from "react";
import { CARD_DETAILS_ERROR_MESSAGES } from "./constants";

import "./CardDetails.css";

function CardDetails({ onCardDetailsChange, handleCardValidationChange }) {
  const [card, setCard] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [blurredFields, setBlurredFields] = useState({});

  const setFieldError = (fieldName, errorMessage) => {
    setValidationErrors({ ...validationErrors, [fieldName]: errorMessage });
  };

  const handleBlur = (fieldName) => {
    setBlurredFields({ ...blurredFields, [fieldName]: true });
  };

  function validateSecurityCode(securityCode) {
    let isValid = true;

    if (securityCode.length < 3 || securityCode.length > 4) {
      setFieldError(
        "securityCode",
        CARD_DETAILS_ERROR_MESSAGES.SECURITY_CODE_LENGTH
      );
      isValid = false;
    } else {
      setFieldError("securityCode", "");
    }
    handleCardValidationChange(validationErrors);
    return isValid;
  }
  function validateExpirationMonth(expirationMonth) {
    let isValid = true;

    if (expirationMonth.length !== 2) {
      setFieldError(
        "cardExpirationDate",
        CARD_DETAILS_ERROR_MESSAGES.CARD_EXPIRATION_DATE
      );
      isValid = false;
    } else {
      setFieldError("cardExpirationDate", "");
    }
    handleCardValidationChange(validationErrors);
    return isValid;
  }
  function validateExpirationYear(expirationYear) {
    let isValid = true;

    if (expirationYear.length !== 4) {
      setFieldError(
        "cardExpirationDate",
        CARD_DETAILS_ERROR_MESSAGES.CARD_EXPIRATION_DATE
      );
      isValid = false;
    } else {
      setFieldError("cardExpirationDate", "");
    }
    handleCardValidationChange(validationErrors);
    return isValid;
  }

  function handleCardNumberChange(e) {
    const cardNumber = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1 ").trim();
    setCard({ ...card, cardNumber: formattedCardNumber });
    onCardDetailsChange({ ...card, cardNumber: formattedCardNumber });
    if (cardNumber.length !== 16) {
      setFieldError(
        "cardNumber",
        CARD_DETAILS_ERROR_MESSAGES.CARD_NUMBER_LENGTH
      );   
    } else {
      setFieldError("cardNumber", "");
    }
    handleCardValidationChange(validationErrors);  
  }

  function handleCardholderNameChange(e) {
    const cardholderName = e.target.value.replace(/[^a-zA-Z\s]/g, "").trim();
    setCard({ ...card, cardholderName });
    onCardDetailsChange({ ...card, cardholderName: cardholderName });
    handleCardValidationChange(validationErrors);
  }

  function handleSecurityCodeChange(e) {
    const securityCode = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCard({ ...card, securityCode });
    onCardDetailsChange({ ...card, securityCode: securityCode });
    validateSecurityCode(securityCode);
  }

  function handleMonthChange(e) {
    const expirationMonth = e.target.value;
    setCard({ ...card, expirationMonth });
    onCardDetailsChange({ ...card, expirationMonth: expirationMonth });
    validateExpirationMonth(expirationMonth);
  }

  function handleYearChange(e) {
    const expirationYear = e.target.value;
    setCard({ ...card, expirationYear });
    onCardDetailsChange({ ...card, expirationYear: expirationYear });
    validateExpirationYear(expirationYear);
  }

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthValue = String(i + 1).padStart(2, "0");
      return (
        <option key={monthValue} value={monthValue}>
          {monthValue}
        </option>
      );
    });
  };

  const generateYearOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const yearValue = 2023 + i;
      return (
        <option key={yearValue} value={yearValue}>
          {yearValue}
        </option>
      );
    });
  };

  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();

  return (
    <div className="card-details__container">
      <h2 className="card-details__title">Card Details</h2>
      <div className="card-details__form__container">
        <form className="card-details__form card-details__form-grid">
          <div className="card-details__field-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={card.cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
              onBlur={() => handleBlur("cardNumber")}
            />
          </div>
          {blurredFields.cardNumber && validationErrors.cardNumber && (
            <span className="error-message">{validationErrors.cardNumber}</span>
          )}
          <div className="card-details__field-group">
            <label className="card-details__label" htmlFor="expirationMonth">
              Expiration Date
            </label>
            <div className="card-details__expiration-selection">
              <select
                name="expirationMonth"
                value={card.expirationMonth}
                onChange={handleMonthChange}
                id="expirationMonth"
              >
                <option value="" disabled>
                  Month
                </option>
                {monthOptions}
              </select>
              <select
                name="expirationYear"
                value={card.expirationYear}
                onChange={handleYearChange}
                id="expirationYear"
              >
                <option value="" disabled>
                  Year
                </option>
                {yearOptions}
              </select>
            </div>
          </div>
          <div className="card-details__field-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={card.cardholderName}
              onChange={handleCardholderNameChange}
            />
          </div>
          <div className="card-details__field-group">
            <label className="card-details__label" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              value={card.securityCode}
              onChange={handleSecurityCodeChange}
              maxLength="4" 
              onBlur={() => handleBlur("securityCode")}
            />
          </div>
          {validationErrors.securityCode && (
            <p className="error-message">{validationErrors.securityCode}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CardDetails;
