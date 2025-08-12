import React, { useRef } from "react";
import "./Recommendations.scss";
import EmplyCourseImage from "../../assets/empty-course.svg";

const cards = [
  {
    id: 1,
    img: "https://via.placeholder.com/300x200?text=Card+1",
    title: "Информатика» оқу пәні бойынша жобалық іс-әрекет",
    desc: "Информатика мұғалімдеріне арналған жобалық құзыреттілік курсы",
    lang: "Қазақша / Орысша",
    students: 2245,
    rating: 4.8,
    reviews: 164,
    price: "25 000 ₸",
  },
  {
    id: 2,
    img: "https://via.placeholder.com/300x200?text=Card+2",
    title: "Информатика» оқу пәні бойынша жобалық іс-әрекет",
    desc: "Информатика мұғалімдеріне арналған жобалық құзыреттілік курсы",
    lang: "Қазақша / Орысша",
    students: 2245,
    rating: 4.8,
    reviews: 164,
    price: "25 000 ₸",
  },
  {
    id: 3,
    img: "https://via.placeholder.com/300x200?text=Card+3",
    title: "Информатика» оқу пәні бойынша жобалық іс-әрекет",
    desc: "Информатика мұғалімдеріне арналған жобалық құзыреттілік курсы",
    lang: "Қазақша / Орысша",
    students: 2245,
    rating: 4.8,
    reviews: 164,
    price: "25 000 ₸",
  },
  // Последняя карточка будет Skeleton
];

export default function Recommendations() {
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="recommendations-wrapper">
      <div className="recommendations">
        <div className="header">
          <h2>Рекомендации</h2>
          <a href="#">Посмотреть все ></a>
        </div>

        <div className="cards" ref={scrollRef}>
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <img src={EmplyCourseImage} alt="" />
              <div className="card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="info">
                  <span>{card.lang}</span>
                  <span>{card.students} 👥</span>
                </div>
                <div className="rating">
                  ⭐ {card.rating} ({card.reviews})
                </div>
                <div className="card-footer">
                  <a href="#" className="details">Подробнее ></a>
                  <a href="#" className="basket">{card.price}</a>
                </div>
              </div>
            </div>
          ))}

          {/* Skeleton */}
          <div className="card skeleton">
            <div className="img"></div>
            <div className="line short"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line short"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
