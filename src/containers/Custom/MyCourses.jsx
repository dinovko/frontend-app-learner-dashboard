import React from "react";
import { useIntl } from "@edx/frontend-platform/i18n";
import { Badge } from "@openedx/paragon";

import { useIsCollapsed } from "../CoursesPanel/CourseList/hooks";
import { reduxHooks } from "hooks";
import track from "tracking";
import verifiedRibbon from "assets/verified-ribbon.png";
import useActionDisabledState from "../CourseCard/components/hooks";
import CourseProgress from "./CourseProgress";
import messages from "../CourseCard/messages";
import "./MyCourses.scss";

const { courseImageClicked } = track.course;

// Хелпер для определения статуса курса
const getCourseStatus = (isCompleted, isActive) => {
  if (isCompleted) return { class: "completed", text: "Завершен" };
  if (isActive) return { class: "active", text: "Активный" };
  return { class: "inactive", text: "Неактивный" };
};

// Компонент изображения курса
const CourseImage = ({ 
  bannerImgSrc, 
  formatMessage, 
  isVerified, 
  homeUrl, 
  handleImageClicked, 
  disableCourseTitle 
}) => {
  const imageElement = (
    <>
      <div
        style={{
          height: "150px",
          width: "200px",
          opacity: 1,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "none",
          }}
          src={bannerImgSrc || "/images/course1.jpg"}
          alt={formatMessage(messages.bannerAlt) || "course"}
        />
      </div>
      {isVerified && (
        <span
          className="course-card-verify-ribbon-container"
          title={formatMessage(messages.verifiedHoverDescription)}
        >
          <Badge as="div" variant="success" className="w-100">
            {formatMessage(messages.verifiedBanner)}
          </Badge>
          <img
            src={verifiedRibbon}
            alt={formatMessage(messages.verifiedBannerRibbonAlt)}
          />
        </span>
      )}
    </>
  );

  return disableCourseTitle ? (
    <div>{imageElement}</div>
  ) : (
    <a
      href={homeUrl}
      onClick={handleImageClicked}
      tabIndex="-1"
      style={{ textDecoration: "none" }}
    >
      {imageElement}
    </a>
  );
};

// Компонент кнопки действия курса
const CourseActionButton = ({ 
  isArchived, 
  isEntitlement, 
  hasStarted, 
  handleClickBegin, 
  handleClickResume, 
  disableResumeCourse,
  disableBeginCourse 
}) => {
  if (isArchived || isEntitlement) return null;

  const buttonProps = hasStarted 
    ? {
        onClick: handleClickResume,
        disabled: disableResumeCourse,
        text: "Продолжить"
      }
    : {
        onClick: handleClickBegin,
        disabled: disableBeginCourse,
        text: "Начать"
      };

  return (
    <a
      href="#"
      role="button"
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {buttonProps.text}
    </a>
  );
};

// Хук для получения данных курса
const useCourseData = (cardId) => {
  const execEdTrackingParam = reduxHooks.useCardExecEdTrackingParam(cardId);
  const { bannerImgSrc, displayName } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl, shortDescription, isStarted, isArchived, resumeUrl } = 
    reduxHooks.useCardCourseRunData(cardId);
  const { isVerified, isActive, isCompleted, hasStarted } = 
    reduxHooks.useCardEnrollmentData(cardId);
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const { disableCourseTitle, disableBeginCourse, disableResumeCourse } = 
    useActionDisabledState(cardId);

  return {
    execEdTrackingParam,
    bannerImgSrc,
    displayName,
    homeUrl,
    shortDescription,
    isStarted,
    isArchived,
    resumeUrl,
    isVerified,
    isActive,
    isCompleted,
    hasStarted,
    isEntitlement,
    isFulfilled,
    disableCourseTitle,
    disableBeginCourse,
    disableResumeCourse
  };
};

// Хук для обработчиков событий
const useCourseEventHandlers = (cardId, homeUrl, resumeUrl, execEdTrackingParam) => {
  const handleImageClicked = reduxHooks.useTrackCourseEvent(
    courseImageClicked,
    cardId,
    homeUrl
  );

  const handleClickBegin = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl + execEdTrackingParam
  );

  const handleClickResume = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    resumeUrl + execEdTrackingParam
  );

  return {
    handleImageClicked,
    handleClickBegin,
    handleClickResume
  };
};

// Основной компонент курса
const CourseItem = ({ cardId, formatMessage }) => {
  const courseData = useCourseData(cardId);
  const {
    execEdTrackingParam,
    bannerImgSrc,
    displayName,
    homeUrl,
    shortDescription,
    isArchived,
    resumeUrl,
    isVerified,
    isActive,
    isCompleted,
    hasStarted,
    isEntitlement,
    disableCourseTitle,
    disableBeginCourse,
    disableResumeCourse
  } = courseData;

  const { handleImageClicked, handleClickBegin, handleClickResume } = 
    useCourseEventHandlers(cardId, homeUrl, resumeUrl, execEdTrackingParam);

  const status = getCourseStatus(isCompleted, isActive);

  return (
    <div className="my-courses-container" key={cardId}>
      <div className="course-info">
        <CourseImage
          bannerImgSrc={bannerImgSrc}
          formatMessage={formatMessage}
          isVerified={isVerified}
          homeUrl={homeUrl}
          handleImageClicked={handleImageClicked}
          disableCourseTitle={disableCourseTitle}
        />

        <div>
          <h3>{displayName || "Обзор финансовой системы Казахстана"}</h3>
          <p>
            {shortDescription ||
              "Курс познакомит вас с основами финансовой системы Казахстана..."}
          </p>
          <div className="language">
            <p>Язык обучения: </p>
          </div>
          <div className="rating-people">
            <div className="people"></div>
            <div className="rating"></div>
          </div>
          <span className={`status ${status.class}`}>
            {status.text}
          </span>
          
          <CourseActionButton
            isArchived={isArchived}
            isEntitlement={isEntitlement}
            hasStarted={hasStarted}
            handleClickBegin={handleClickBegin}
            handleClickResume={handleClickResume}
            disableResumeCourse={disableResumeCourse}
            disableBeginCourse={disableBeginCourse}
          />
        </div>
      </div>
      <CourseProgress progress={50} testResult={100} />
    </div>
  );
};

// Главный компонент
export default function MyCourses({ courseListData }) {
  const { formatMessage } = useIntl();
  const { visibleList } = courseListData;
  const isCollapsed = useIsCollapsed();

  return (
    <section className="my-courses">
      <h2>Мои курсы</h2>
      {visibleList.map(({ cardId }) => (
        <CourseItem key={cardId} cardId={cardId} formatMessage={formatMessage} />
      ))}
    </section>
  );
}