import { useState, useId } from "react";
import "./ContactUs.css";
function ContactUs() {
  const id = useId();

  const validateForm = () => {
    let isValid = true;
    let err = {};
    if (formData.form__name.trim() === "") {
      err.name = "*Name cannot be blank";
      isValid = false;
    }
    if (formData.form__email.trim() === "") {
      err.email = "*Email cannot be blank";
      isValid = false;
    } else if (!formData.form__email.includes("@")) {
      err.email = "*Email must include @";
      isValid = false;
    }
    if (formData.form__address.trim() === "") {
      err.address = "*Address is required";
      isValid = false;
    }
    if (!formData.form__terms__and__conditions) {
      err.terms__and__conditions =
        "*You must agree to the terms and conditions";
      isValid = false;
    }
    if (
      formData.form__occupation === "" ||
      (formData.form__occupation === "other" &&
        formData.form__occupation__other.trim() === "")
    ) {
      err.occupation = "*You must share your occupation information";
      isValid = false;
    }
    setFormError({ ...err });

    return isValid;
  };

  const [formData, setFormData] = useState({
    form__name: "",
    form__email: "",
    form__address: "",
    form__occupation: "",
    form__occupation__other: "",
    form__terms__and__conditions: false,
  });

  const [formError, setFormError] = useState({});

  const onChangeHandler = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    if (
      event.target.name === "form__occupation" &&
      event.target.value !== "other"
    ) {
      console.log("clearing out other");
      setFormData({
        ...formData,
        form__occupation: event.target.value,
        form__occupation__other: "",
      });
    } else if (event.target.name === "form__terms__and__conditions") {
      console.log(event.target.checked);
      setFormData({
        ...formData,
        form__terms__and__conditions: event.target.checked,
      });
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      //submit the form
    }
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      Home
      <p className="form__greeting">
        In order for us to best assist you, please provide your information and
        message, and we will get back to you within 24 hours.
      </p>
      <p className="form__required__fields">
        All fields marked with (*) are required.
      </p>
      <div className="form__row name__container">
        <label name="name" htmlFor={`${id}-name`}>
          Name *:
        </label>
        <input
          className="form__name"
          onChange={onChangeHandler}
          id={`${id}-name`}
          placeholder="Enter your Name"
          type="text"
          name="form__name"
        />
        <div className="form__offset"></div>
        <span className="form__invalid">{formError.name}</span>
      </div>
      <div className="form__row email__container">
        <label name="form__email" htmlFor={`${id}-email`}>
          Email *:
        </label>
        <input
          className="form__email"
          onChange={onChangeHandler}
          id={`${id}-email`}
          type="text"
          name="form__email"
          placeholder="example@gmail.com"
        />
        <div className="form__offset"></div>
        <span className="form__invalid">{formError.email}</span>
      </div>
      <div className="form__row name__container">
        <label className="form__address" htmlFor={`${id}-address`}>
          Address *:
        </label>
        <input
          className="form__address"
          onChange={onChangeHandler}
          id={`${id}-address`}
          type="text"
          name="form__address"
          placeholder="123 Fake St, Seattle, WA, 12345"
        />
        <div className="form__offset"></div>
        <span className="form__invalid">{formError.address}</span>
      </div>
      <div className="form__row occupation__container">
        <label>Occupation :</label>
        <select
          class="form__occupation"
          name="form__occupation"
          onChange={onChangeHandler}
          value={formData.occupation}
        >
          <option value="">Please select</option>
          <option value="doctor">Doctor</option>
          <option value="lawyer">Lawyer</option>
          <option value="software_engineer">Software Engineer</option>
          <option value="accountant">Accountant</option>
          <option value="other">Other</option>
        </select>
      </div>
      {formData.form__occupation === "other" && (
        <div className="form__row name__container">
          <label
            className="form__occupation__other"
            htmlFor={`${id}-occupation__other`}
          >
            What is your occupation? *:
          </label>
          <input
            className="form__occupation__other"
            onChange={onChangeHandler}
            id={`${id}-occupation__other`}
            type="text"
            name="form__occupation__other"
          />
          <div className="form__offset"></div>
          <span className="form__invalid">{formError.occupation}</span>
        </div>
      )}
      <div className="form__row terms__and__conditions__container">
        <label for="message" className="message">
          Your Message * :
        </label>
        <textarea
          className="form__message"
          name="form__message"
          type="text"
          placeholder="Your message"
          id="message"
          rows="4"
        ></textarea>
        <div className="form__offset"></div>
        <span className="form__invalid">{formError.email}</span>
      </div>
      <div className="form__row terms__and__conditions__container">
        <input
          className="form__terms__and__conditions"
          type="checkbox"
          name="form__terms__and__conditions"
          id="terms__and__conditions"
          onChange={onChangeHandler}
        />
        <label
          className="terms__and__conditions"
          htmlFor="terms__and__conditions"
          name="terms__and__conditions"
        >
          I agree to the Terms and Conditions
        </label>
        <div className="form__offset"></div>
        <span className="form__invalid">
          {formError.terms__and__conditions}
        </span>
      </div>
      <div className="form__row button__container">
        <button className="form__submit" type="submit" value="Submit">
          Register
        </button>
      </div>
    </form>
  );
}
export default ContactUs;
