import React from 'react';
import './CourseCard.scss';

export default function CourseCard({ image, title, description, lang, price }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <div className="course-content">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="course-footer">
          <span>{lang}</span>
          <span className="price">{price} ₸</span>
        </div>
      </div>
    </div>
  );
}
