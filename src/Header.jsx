import "./Header.css";

import { menuItems, getFilteredMenuItems } from "./menuItems";
import { LOGIN_STATUS } from "./constants";

import LoginForm from "./LoginForm";
import Logout from "./Logout";

function Header({ onNav, page, onLogin, loginStatus, onLogout, totalCartQuantity }) {

  const filteredMenuItems = getFilteredMenuItems(loginStatus);

  return (
    <header className="header">
      <div className="skip-to-main">
        <a className="skip-to-main__link" href="#main">
          Skip to content
        </a>
      </div>
      <nav className="menubar">
        <ul className="menubar__links">
          {filteredMenuItems.map((item) => (
            <li key={item.id} className="menubar__item">
              <a
                href={`/api/v1/${item.label.toLowerCase()}`}
                data-page={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(item.label === "Home" ? "Main" : item.label);
                }}
              >
                {item.label}
                {item.label === "Shopping Bag" && totalCartQuantity > 0 && ` (${totalCartQuantity})`}
              </a>
            </li>
          ))}
          {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <li className="menubar__item">
              <Logout onLogout={onLogout} />
            </li>
          )}
        </ul>
      </nav>
      {page === "Login" && loginStatus !== LOGIN_STATUS.IS_LOGGED_IN && (
        <LoginForm onLogin={onLogin} />
      )}
    </header>
  );
}
export default Header;
