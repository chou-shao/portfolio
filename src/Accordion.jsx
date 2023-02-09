import React, { useState } from "react";
import "./Privacy.css";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  const icon = <i className="privacy__accordian-icon">+</i>;

  const showClass = "privacy__text__container--open";
  return (
    <li className="privacy__accordian-item">
      <div className="privacy__section">
        <div className="privacy__accordian-row">
          <button
            className="privacy__accordian-button"
            aria-label={`Click here to read more about ${title}`}
            onClick={() => setIsActive(!isActive)}
          >
            <h3 className="privacy__accordian-title">{title}</h3>
            {icon}
          </button>
        </div>
        {isActive && (
          <div className={`privacy__text__container ${showClass}`}>
            <p className="privacy__accordian-text">{content}</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default Accordion;
