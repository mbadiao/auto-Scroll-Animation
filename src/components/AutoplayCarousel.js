import React, { useEffect, useRef } from "react";
import "./autoplaycarousel.css";
import { cardDetails } from "./CarouselConfig";
import CarouselItem from "./CarouselItem";

export default function AutoplayCarousel() {
  const carouselTrackRef = useRef(null);

  useEffect(() => {
    const carouselTrack = carouselTrackRef.current;
    let autoScrollInterval;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        // Utiliser scrollLeft et scrollWidth pour un défilement fluide
        if (carouselTrack.scrollLeft >= carouselTrack.scrollWidth / 2) {
          carouselTrack.scrollLeft = 0; // Réinitialiser à zéro
        } else {
          carouselTrack.scrollLeft += 1; // Ajustez la vitesse ici
        }
      }, 10); // Ajustez l'intervalle ici
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    startAutoScroll();

    carouselTrack.addEventListener("mouseenter", stopAutoScroll);
    carouselTrack.addEventListener("mouseleave", startAutoScroll);
    // Nettoyer les écouteurs d'événements et l'intervalle de défilement automatique
    return () => {
      carouselTrack.removeEventListener("mouseenter", stopAutoScroll);
      carouselTrack.removeEventListener("mouseleave", startAutoScroll);
      stopAutoScroll();
    };
  }, []);

  const details = Object.keys(cardDetails).map((key) => cardDetails[key]);
  return (
    <div className="carousel-container" ref={carouselTrackRef}>
      <div className="carousel-track" >
        {details.concat(details).map((detail, index) => (
          <CarouselItem
            key={index}
            imgUrl={detail.imgUrl}
            imgTitle={detail.title}
          />
        ))}
      </div>
    </div>
  );
}
