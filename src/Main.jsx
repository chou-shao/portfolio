import Home from "./Home";
import SpecialOffers from "./SpecialOffers";
import Privacy from "./Privacy";
import ContactUs from "./ContactUs";
import ThemeSwitcher from "./ThemeSwitcher";
import Articles from "./Articles";
import ArticleTuscany from "./ArticleTuscany";
import ArticleSantorini from "./ArticleSantorini";
import ArticleSouthBeach from "./ArticleSouthBeach.jsx";
import ArticleNice from "./ArticleNice.jsx";
import ArticleKohSamui from "./ArticleKohSamui.jsx";
import Dining from "./Dining.jsx";

import "./Main.css";

function Main({ page, onNav, theme, toggleTheme }) {
  return (
    <main id="main" className="main">
      {page === "Articles" && (
        <Articles onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      )}
      {page === "ArticleTuscany" && (
        <ArticleTuscany onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      )}
      {page === "ArticleSantorini" && (
        <ArticleSantorini
          onNav={onNav}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      {page === "ArticleSouthBeach" && (
        <ArticleSouthBeach
          onNav={onNav}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      {page === "ArticleNice" && (
        <ArticleNice onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      )}
      {page === "ArticleKohSamui" && (
        <ArticleKohSamui
          onNav={onNav}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      {page === "SpecialOffers" && (
        <SpecialOffers onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      )}

      {page === "Dining" && (
        <Dining onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      )}
      {page === "Privacy" && <Privacy />}
      {page === "Contact" && <ContactUs />}
    </main>
  );
}
export default Main;
