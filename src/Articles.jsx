import "./Articles.css";
import articleData from "./article-data";

function Articles({ onNav }) {
  const list = articleData.map((article) => {
    return (
      <li className="articles__list-item" key={article.id}>
        <div className="article__card">
          <img
            className="article__pic"
            src={article.pic}
            alt={article.alt}
          ></img>
          <div className="article__card-text__container">
          <h3 className="article__title">{article.title}</h3>
            <p className="article__blurb">{article.blurb}</p>
            <a
              className="article__link"
              href={`${article.title.replaceAll(" ", "-")}`}
              onClick={onNav}
              data-page={article.id}
              aria-label={article.title}
            >
              More about {article.title}
              <i className="gg-arrow-right-o"></i>
            </a>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="articles">
      <div className="articles__intro-container">
        <h2 className="articles__intro-title">
          React Luxury Hotels is a collection of the finest independent luxury
          hotels in the world. Find out more!
        </h2>
        <p className="articles__intro-body">
          Beautiful views of the crystal-clear waters of the sea are
          standard in all of our five-star hotels and luxury villas. You can
          look forward to destination roof-top bars and restaurants,
          award-winning luxury spas, boutiques, and even a personal butler.
        </p>
        <p className="articles__intro-body">
          We have partnered with world-reknowned interior designers to bring you
          suites that are effortelessly elegant. Modern interior design, natural
          lighting, and a panoramic view of the sea. Book your next holiday or
          event with us today, and check our special offers to experience the
          best the world's coast has to offer. Find out more at
          reservations@6150sea.com or +911.
        </p>
      </div>
      <ul className="articles__list">{list}</ul>
    </div>
  );
}
export default Articles;
