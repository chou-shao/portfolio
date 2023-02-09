function ArticleTuscany() {
  return (
    <div className="article__tuscany">
      <h2 className="tuscany__title">Tuscany</h2>
      <div className="tuscany__pic__container">
        <img
          src="/images/articleTuscany1.jpg"
          className="tuscany__pic"
          alt="picture of a the Cathedral of Santa Maria del Fiore in Italy with mountains in the background"
        />
      </div>
      <h3 className="tuscany__subtitle">Explore Tuscany at your own pace!</h3>
      <div className="tuscany__text__container">
        
        <p className="tuscany__text">
          Take a stroll through Florence and visit one of the greatest museums
          in the world, the <b className="tuscany__text-bold">Gallerie Degli Uffizi.</b> The Uffizi features Italian Renaissance art, from masters such as Michelangelo and da Vinci.
        </p>
      </div>
      <h4 className="tuscany__cta">
          Book now for an unforgettable experience at in beautiful Tuscany!
        </h4>
    </div>
  );
}
export default ArticleTuscany;
