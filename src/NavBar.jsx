function NavBar({ setPage }) {
  return (
    <div>
      <a
        data-page="Articles"
        href="home"
        onClick={onNav}
        // onClick={ (e) => onNav(e, 'Home')}
      >
        Home
      </a>
      <a
        date-page="Resources"
        href="resources"
        onClick={onNav}
        // onClick={(e) => onNav(e, 'Resources')}
      >
        About
      </a>
      <a
        date-page="About"
        href="about"
        onClick={onNav}
        // onClick={(e) => onNav(e, 'About')}
      >
        About
      </a>
    </div>
  );
}
export default NavBar;
