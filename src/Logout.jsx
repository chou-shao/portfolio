function Logout({ onLogout }) {
  return (
    <div className="header__container">
      <form className="logout-form">
        <button
          onClick={onLogout}
          type="button"
          className="logout-form__button"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default Logout;
