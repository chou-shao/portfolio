import "./MembersOnly.css";

function MembersOnly({
  onProductClick,
  exclusiveProducts,
  isLoggedIn,
  onNav,
  username,
}) {
  function handleClick(productLink) {
    onProductClick(productLink);
  }
  if (!Array.isArray(exclusiveProducts)) {
    return <div>No products available</div>;
  }
  if (!isLoggedIn) {
    return (
      <div className="members-only__container">
        <h1>Welcome to the Members Only Page!</h1>
        <p className="members-only-text">
          To gain access to the exclusive products, you need to be logged in to
          access this page.
        </p>
        <button onClick={() => onNav("Login")}>Click here to Log in</button>
      </div>
    );
  }

  return (
    <div className="members-only__container">
      <h1 className="members-only__greeting">
        Welcome to the Members Only Page, {username}!
      </h1>
      <div className="exclusive-products">
        <h2 className="exclusive-products__title">Exclusive Products:</h2>
        <div className="product-cards__container">
          {exclusiveProducts.map((product) => (
            <div key={product.sku} className="product-card">
              <a
                href={`/${product.productLink}`}
                className="product-card__link"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(product.productLink);
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="product-card__image"
                />
                <div className="product-card__brand">
                  Brand: {product.brandName}
                </div>
                <div className="product-card__item-name">
                  Product: {product.productName}
                </div>
                <div className="product-card__price">
                  Price: ${product.price}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersOnly;
