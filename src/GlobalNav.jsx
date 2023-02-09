import "./css-gg.css";
import "./GlobalNav.css";

import { useState } from "react";
import menu from "./menu";

function GlobalNav({ className, onNav }) {
  const [showMenu, setShowMenu] = useState(false);

  const list = menu.map((item) => {
    return (
      <li className="global__nav-item" key={item.name}>
        <a
          className="global__nav-link"
          href={item.href}
          onClick={onNav}
          data-page={item.page}
        >
          {item.name}
        </a>
      </li>
    );
  });

  const showClass = showMenu ? "global__nav__list--open" : "";

  return (
    <nav className={`global__nav ${className}`}>
      <button
        className="global__nav-button"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        aria-label={showMenu ? "Close Menu" : "Open Menu"}
      >
        <i className="gg-menu" />
      </button>
      <ul className={`global__nav__list ${showClass}`}>{list}</ul>
    </nav>
  );
}
export default GlobalNav;
