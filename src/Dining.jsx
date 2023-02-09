import './Dining.css';

function Dining() {
  return (
    <div className="restaurants">
      <h2 className="restaurant__title>"> Fine Dining at React Hotel Collection</h2>
      <div className="restaurant__container">
     
      <div className="restaurant__panel-left">
            <h3 className="restaurant__subtitle">The Promenade, a signature restaurant by RHC</h3>
           <div className="restaurant__text__container">
            <p className="restaurant__text"> A collection of exceptional dining for your enses to discover. Serving you the freshest and yummiest cuisine.</p> 
            <p className="restaurant__text"> Our signature restaurants offer contemporary interpretaions of traditional local cuisine. Our ingredients are locally sourced from farm to table and will give you the most memorable experience. </p>
            </div>
      </div>
   
      <div className="restaurant__panel-right">
      <img className="restaurant__pic" src="./images/dining1.jpg"></img>
      </div>
    </div>
    </div>
  );
}
export default Dining;
