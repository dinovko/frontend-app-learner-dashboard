import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
//'\\wsl.localhost\Ubuntu-22.04\home\sds\customs\frontend-app-learner-dashboard\src\containers\LearnerDashboardHeader\messages.js'
import messages from '../../containers/CoursesPanel/messages';
import messages2 from '../../containers/LearnerDashboardHeader/messages';

const Breadcrumbs = () => {
  const intl = useIntl();

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
          {intl.formatMessage(messages2.dashboard)}
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
        <a href='#' className="text-decoration-none fw-semibold">
          <span className="fw-semibold"
            style={{
              color: '#000000',
              fontSize: '16px',
              lineHeight: '19px',
              fontFamily: 'Inter, sans-serif'
            }}>
            {intl.formatMessage(messages.myCourses)}
          </span>
        </a>
      </div>
    </div>
  );
};

export default Breadcrumbs;
