import { useState, useEffect } from "react";
import OrderHistory from "./OrderHistory";
import SavedAddresses from "./SavedAddress";

import { fetchAccount } from "./services";

import "./Account.css";

function Account() {
  const [activeTab, setActiveTab] = useState("orderHistory");
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    fetchAccount()
      .then((data) => {
        setOrderHistory(data.orderHistory);
        setSavedAddresses(data.shippingAddress);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, []);

  return (
    <div className="account__container">
      <div className="account__sidebar">
        <ul className="account__tabs">
          <li
            className={`account__tab ${
              activeTab === "orderHistory" ? "active" : ""
            }`}
            onClick={() => setActiveTab("orderHistory")}
          >
            Order History
          </li>
          <li
            className={`account__tab ${
              activeTab === "addresses" ? "active" : ""
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </li>
        </ul>
      </div>
      <div className="account__content">
        {activeTab === "orderHistory" && (
          <>
            <OrderHistory orderHistory={orderHistory} />
          </>
        )}
        {activeTab === "addresses" && (
          <>
            <SavedAddresses address={savedAddresses} />
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
