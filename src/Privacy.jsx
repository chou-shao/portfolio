import { useState } from "react";
import Accordion from "./Accordion.jsx";
import privacyPolicy from "./privacyPolicy.js";

import "./Privacy.css";

function Privacy() {
  const icon = <i className="privacy__accordian-icon">+</i>;
  const [showMenu, setShowMenu] = useState(false);
  // const [activeMenu, showActiveMenu] = useState(-1);

  const showClass = showMenu ? "privacy__text__container--open" : "";

  const list = privacyPolicy.map((item) => {
    return <Accordion title={item.title} content={item.blurb} key={item.id} />;
  });

  return (
    <div className="privacy__main-container">
      <ul className="privacy__main-list" aria-label="XXX">
        {list}
      </ul>
    </div>
  );
}
export default Privacy;
