import "./Footer.css";
import footerMenu from "./footerMenu";


function Footer({ onNav, showClass }) {
  const list = footerMenu.map((item) => {
    return (
      <li className="footer__nav-item" key={item.name}>
        <a
          className="footer__nav-link"
          href={item.href}
          onClick={onNav}
          data-page={item.page}
        >
          {item.name}
        </a>
      </li>
    );
  });

  return (
    <footer className="footer">
      <nav className="footer__nav">
        <ul className="footer__nav__list">
            {list}
            </ul>
      </nav>
    </footer>
  );
}
export default Footer;
