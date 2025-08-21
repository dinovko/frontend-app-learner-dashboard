import React from 'react';

const CoursesHeader = () => {
  return (
    <div className="d-flex align-items-center justify-content-start px-3 mx-auto py-4"
         style={{ maxWidth: '1400px', gap:'1rem' }}>
      <div className="d-flex align-items-center">
        <h1 className="h2 fw-bold text-dark mb-0">
          Мои курсы
        </h1>
      </div>
      
      <div className="d-flex align-items-center ms-4">
        <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
          <span className="text-muted fw-medium">
            Просмотреть мои курсы
          </span>
          <span className="text-muted">
            &gt;
          </span>
        </a>
      </div>
    </div>
  );
};

export default CoursesHeader;
