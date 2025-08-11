import React from 'react';
import CourseCard from './CourseCard';
import './Recommendations.scss';

export default function Recommendations() {
  const courses = [
    { image: '/images/c1.jpg', title: 'Информатика', description: '...', lang: 'Казахский / Орысша', price: 25000 },
    { image: '/images/c2.jpg', title: 'Информатика', description: '...', lang: 'Казахский / Орысша', price: 25000 },
  ];

  return (
    <section className="recommendations">
      <h2>Рекомендации</h2>
      <div className="recommendations-list">
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
