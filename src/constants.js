export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SHIPPING_ADDRESS_STATUS = {
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
};

export const SHIPPING_ADDRESS_MESSAGES = {
  [SHIPPING_ADDRESS_STATUS.SAVING]: 'Saving...',
  [SHIPPING_ADDRESS_STATUS.SAVED]: 'Shipping address saved successfully!',
  [SHIPPING_ADDRESS_STATUS.ERROR]: 'There was an error saving the shipping address.',
};


export const CARD_DETAILS_ERROR_MESSAGES = {
  CARD_NUMBER_LENGTH: "Invalid credit card number. Card number must be 16 digits.",
  SECURITY_CODE_LENGTH: "Security code must be between 3 to 4 digits.",
  NYAN_CAT_CARD: "Nyan Cat credit card is not allowed.",
  CARD_EXPIRATION_DATE: "Invalid credit card expiration date.",
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  AUTH_DISALLOWED: 'auth-disallowed',
  REQUIRED_USERNAME: 'required-username',
  NOT_LOGGED_IN_CART: 'not-logged-in-cart',
  CARD_MISSING: 'card-missing',
  CARD_INVALID: 'card-invalid'
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
  [SERVER.AUTH_DISALLOWED]: 'Your username cannot be dog.',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.NOT_LOGGED_IN_CART]: 'You must be logged in to add items to your shopping bag.',
  [SERVER.CARD_MISSING]: 'You must input your credit card number to checkout. Card number cannot be blank.',
  [SERVER.CARD_INVALID]: 'Invalid card details. Please check your card entry information.',
  default: 'Something went wrong.  Please try again',
};

