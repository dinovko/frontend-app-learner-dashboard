import React from 'react';
import { getConfig } from '@edx/frontend-platform';

const Breadcrumbs = () => {
  const LMS_BASE_URL = `${getConfig().LMS_BASE_URL}/dashboard`;

  const BASE_URL = `${window.location.protocol}//${window.location.host}`;
  return (
    <div className="d-flex align-items-center gap-2 px-3 mx-auto"
      style={{ maxWidth: '1400px', paddingTop: '22px', paddingBottom: '22px', gap: '8px' }}>
      <div className="d-flex align-items-center gap-2" style={{ gap: '8px' }}>
        <a href={LMS_BASE_URL} className="text-decoration-none fw-semibold"
          style={{
            color: '#969696',
            fontSize: '16px',
            lineHeight: '19px',
            fontFamily: 'Inter, sans-serif'
          }}>
          Главная
        </a>

        {/* Chevron separator */}
        <span className="fw-semibold"
          style={{
            color: '#969696',
            fontSize: '16px',
            lineHeight: '19px',
            fontFamily: 'Inter, sans-serif'
          }}>
          &gt;
        </span>
        <a href={BASE_URL} className="text-decoration-none fw-semibold">
          <span className="fw-semibold"
            style={{
              color: '#000000',
              fontSize: '16px',
              lineHeight: '19px',
              fontFamily: 'Inter, sans-serif'
            }}>
            Мои курсы
          </span>
        </a>
      </div>
    </div>
  );
};

export default Breadcrumbs;
