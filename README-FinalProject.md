# SNEAKERHEAD - INFO6250 Final Project

## Intro

SNEAKERHEAD is a React.js single-page application (SPA) that serves as an e-commerce platform for purchasing sneakers. The web-app provides different functionality for general users and members.

## Users

1. General Users: Users who are not signed up with the website (i.e., not logged in).
2. Members: Users who are logged in.

## Features and Functionality
### General Users

- Can view products on the home page. These are non-exclusive products.
- Cannot add items to the shopping bag or proceed to checkout.
- Do not have Saved Addresses, or Order History

### Members

- Can view and access everything general users can
- Can view exclusive products located in the "Members Only" section
- Can add items to the shopping bag
- Can manage items in the shopping bag (remove items only)
- Can proceed to Checkout if happy with items in shopping bag
- Can input Shipping Address and Card Payment Details in the "Checkout Page"
  - Shipping Address can be saved to their account for convenience
- Can view Order History and Saved Address(es) in their "Account Page"

### User Flow

1. Start the application (server and client).
2. User is directed to the home page to view products.
3. User logs in.
4. Upon successful login, member is shown exclusive products on the "Members Only" page.
5. Member can continue browsing and add items to the cart.
6. Access the shopping bag and view items in the cart.
7. Click "Checkout" button and input address and payment details.
8. Inputted address can be saved (can be viewed later in the "Account" page). On future orders, the Saved Address will pre-populate the Shipping Address fields.
9. Payment details are validated according to criteria on front-end and back-end.
10. User clicks "Place Order" and if validation criteria is met, directed to the order confirmation page, which has a CTA to continue shopping (or can navigate via header nav bar).
11. User can view the order in their "Account" page under "Order History".

### Input Validation

- Login username cannot be "dog" and cannot contain blank spaces
- Card number must be 16 digits (no symbols, letters, special characters, cannot be blank)
- CVV must be 3 or 4 digits (no letters)
- Cardholder name must not be blank

## How to Run the Web-App

The application requires both the server and client to start. Follow the steps below to run the web-app:

1. Install dependencies:
   - `npm install`
2. Start the server
   - On Windows: use `npm run start-win`
   - On Mac: use `npm run start`
3. Start the client
   - `npm run dev`
4. Open browser and go to `http://localhost:3000` to access the application, if this doesn't happen automatically
5. Browse the web-app
6. Login to gain access to the full experience

## Images & Licensing

All images obtainedImages obtained from https://unsplash.com/ under the license: https://unsplash.com/license

nike air force 1
https://unsplash.com/photos/x5aavOm7PFc

Nike dunk low retro
https://unsplash.com/photos/QbDe8JxtUp0

Yeezy Semi Frozen Yellow
https://unsplash.com/photos/qK7fGCftQi0

Exclusive shoes
nike off white (box)
https://unsplash.com/photos/tV8yaU09t7w

hero-image-v2
https://unsplash.com/photos/PvObYzFkTAE

## Tools

- express
- cookie-parser
- uuid
- create-react-app

## Implementation
- Login & user validation
- Polling (to display timed notification that item was successfully added to shopping bag)
- End to end checkout experience with cart management (remove item), and payment validation
- Multiple "Pages," some locked behind members-only access (different levels of authorization for exclusive and non-exclusive products)
- Minimalist styling (CSS)
- Order History and Saved Address retrieval
- Logout
