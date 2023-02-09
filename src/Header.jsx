import "./Header.css";
import {useState} from 'react';
import GlobalNav from "./GlobalNav";
import ThemeSwitcher from "./ThemeSwitcher";

function Header({ onNav, theme, toggleTheme }) {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="header">
      <GlobalNav 
        showMenu={showMenu} 
        onNav={onNav} 
        className="header__nav"
        />
      
      <h1 className="header__title">React Hotel Collection</h1>
      <ThemeSwitcher className="header__theme-switcher" theme={theme} toggleTheme={toggleTheme}/>
      {/* <img src="/images/homeIcon.jpg" className="header__icon" alt="" /> */}
      <span className="header__subtitle">A Luxury Hotel Collection</span>

    </header>
  );
}
export default Header;
