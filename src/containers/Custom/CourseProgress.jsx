import React from 'react';
import './CourseProgress.scss';

export default function CourseProgress({ progress, testResult }) {
  return (
    <div className="course-progress">
      <p>Курс изучен на: <span>{progress}%</span></p>
      <div className="progress-bar">
        <div className="fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Результат последнего теста: <span>{testResult}%</span></p>
      <button>Пройти тест</button>
    </div>
  );
}
