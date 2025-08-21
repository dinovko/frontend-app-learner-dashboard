import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { resumeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const execEdTrackingParam = reduxHooks.useCardExecEdTrackingParam(cardId);
  const { disableResumeCourse } = useActionDisabledState(cardId);

  const handleClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    resumeUrl + execEdTrackingParam,
  );
  
  return (
    <ActionButton
      disabled={disableResumeCourse}
      as="a"
      href="#"
      onClick={handleClick}
      className="d-flex align-items-center justify-content-center fw-semibold text-white border-0 rounded-3"
      style={{
        width: '139px',
        height: '34px',
        padding: '10px 20px',
        background: 'linear-gradient(0deg, #0D81FF, #0D81FF), #303340',
        borderRadius: '8px',
        fontSize: '16px',
        lineHeight: '19px',
        fontFamily: 'Inter, sans-serif',
        textDecoration: 'none'
      }}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};

ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ResumeButton;
