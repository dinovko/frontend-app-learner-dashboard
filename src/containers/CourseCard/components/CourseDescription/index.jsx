import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

export const CourseDescription = ({ cardId }) => {
  const courseData = reduxHooks.useCardCourseData(cardId);

  console.log(courseData);
  
  if (!courseData?.description) {
    return null;
  }

  return (
    <div className="course-description mt-3">
      <p className="text-muted mb-0" style={{ fontSize: '14px', lineHeight: '1.5' }}>
        {courseData.description}
      </p>
    </div>
  );
};

CourseDescription.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseDescription;
