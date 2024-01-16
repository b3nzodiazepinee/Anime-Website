import React from "react";
import "./Card.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const Card = ({ id, title, poster }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <Link
      to={{
        pathname: `/anime/${id}`,
      }}
    >
      <div ref={ref} className="card">
      {
        inView ? <img className="card__img" src={"https://anilibria.tv" + poster} alt=""/> : <div className="card__img__skeleton" /> 
      }
        <div className="name__anime">
          {title.length > 35 ? title.slice(0, 35) + "..." : title}
        </div>
      </div>
    </Link>
  );
};

export default Card;
