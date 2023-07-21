import "./Product.css";

function Product({ onProductClick, nonExclusiveProducts }) {
  const handleClick = (productLink) => {
    onProductClick(productLink);
  };

  if (!Array.isArray(nonExclusiveProducts)) {
    return <div>No products available</div>;
  }

  return (
    <div className="product">
      <div className="product-cards__container">
        {nonExclusiveProducts.map((product) => (
          <div key={product.sku} className="product-card">
            <a
              href={`/${product.productLink}`}
              className="product-card__link"
              onClick={(e) => {
                e.preventDefault();
                handleClick(product.productLink);
              }}
            >
              <div className="product-card__image-container">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="product-card__image"
                />
              </div>
              <p className="product-card__brand">Brand: {product.brandName}</p>
              <p className="product-card__item-name">
                Product: {product.productName}
              </p>
              <p className="product-card__price">Price: ${product.price}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
