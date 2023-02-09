import { useState } from "react";
import HotelCollection from "./HotelCollection.jsx";
import hotelImages from './hotel-images.js'

const carouselImages = hotelImages.map((pic) => {
  return (
      <img
      key={pic.image}
          className={`carousel__pic${pic.index}`}
         src={pic.image}
        ></img>
  )}
)



function Carousel(){
  const [currImage, setCurrImage] = useState(0);
  return(
<div className="carousel">
      {carouselImages}
      </div>

  )




}
export default Carousel;
