import { useRef, useState } from "react";
import "./SpecialOffers.css";

function SpecialOffers() {
  const subscribeRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState("");
  const [showOffers, setShowOffers] = useState(false);
  return (
    <div className="special__offers">
      <dialog className="offers__modal" ref={subscribeRef}>
        <span className="offers__text">
          Yes I want to unlock special offers!
        </span>
        <div className="offers__controls">
          <button
            onClick={() => {
              subscribeRef.current.close();

              setIsUnlocked("unlocked");
              setShowOffers(true);
            }}
            className="offers__confirm"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              subscribeRef.current.close();
            }}
            className="offers__cancel"
          >
            Cancel
          </button>
        </div>
      </dialog>
      <h2 className="offers__title">
       Special Offers Just For You!
      </h2>
      <p className="offers__greeting">
        Take advantage of special savings and exclusive offers when you book
        directly with React Hotel Collection. Whatever it is you are
        celebrating, or if you are looking for a quick getaway trip, we have
        special packages available across all of our properties to fit your
        needs.
      </p>

      {showOffers && (
        <div className="offers__choices">
          <p className="offers__instruction">
            Please quote or input the offer code when booking your reservation. Thank you.
          </p>
          <ul className="offers__list">
            <li className="offers__items">
            Offer 1 - Free Couples Massage - (FREEMASSAGE)
            </li>
            <li className="offers__items">
            Offer 2 - Breakfast Voucher for your stay - (BFASTMEAL) 
              </li>
              <li className="offers__items">
              Offer 3 - Stay 2 Nights get the 3rd Night 30% off - (2FOR3) 
              </li>
              <li className="offers__items">
              Offer 4 - 10% off your reservation - (10OFF)
              </li>
              </ul>
        </div>
      )}

      <button
        className={`offers__open ${isUnlocked}`}
        onClick={() => {
          subscribeRef.current.showModal();
        }}
      >
        Unlock Offers
      </button>
    </div>
  );
}
export default SpecialOffers;
