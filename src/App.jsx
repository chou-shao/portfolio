import { useState } from "react";

import "./App.css";

import SkipLink from "./SkipLink";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [page, setPage] = useState("Articles");
  const [theme, setTheme] = useState("light");

  function go(targetPage) {
    setPage(targetPage);
  }

  function onNav(event) {
    event.preventDefault();

    const target = event.target.dataset.page;

    go(target);
  }

  

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className={`app ${theme}`}>
      <SkipLink />
      <Header onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      <Main page={page} onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      <Footer onNav={onNav} theme={theme} toggleTheme={toggleTheme}/>
    </div>
  );
}

export default App;
