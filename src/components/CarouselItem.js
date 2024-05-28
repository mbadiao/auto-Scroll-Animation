import React from "react";

function CarouselItem({ imgUrl, imgTitle }) {
  return (
    <div className="carousel-card">
      <img src={imgUrl} alt={imgTitle}></img>
    </div>
  );
}

export default CarouselItem