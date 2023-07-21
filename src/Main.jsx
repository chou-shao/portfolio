import Loading from "./Loading";
import Product from "./Product";
import "./Main.css";

function Main({ onProductClick, productData, nonExclusiveProducts }) {
  if (!nonExclusiveProducts || nonExclusiveProducts.length === 0) {
    return (
      <div className="loading__container">
        <Loading className="loading__waiting">
          <i className="gg-spinner"></i>
          Loading Products
        </Loading>
      </div>
    );
  }

  return (
    <main id="main" className="main">
      <div className="hero-image__container">
        <img src="/images/hero-image-large-v2.jpg" className="hero-image"></img>
      </div>
      <Product
        onProductClick={onProductClick}
        productData={productData}
        nonExclusiveProducts={nonExclusiveProducts}
      ></Product>
    </main>
  );
}

export default Main;
