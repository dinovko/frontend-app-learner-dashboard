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

import urls from "data/services/lms/urls";

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
  disableCourseTitle,
}) => {
  const imageElement = (
    <div className="course-image">
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bannerImgSrc || "/images/course1.jpg"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-label={formatMessage(messages.bannerAlt) || "course"}
      />

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
    </div>
  );

  return disableCourseTitle ? (
    imageElement
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
  disableBeginCourse,
}) => {
  if (isArchived || isEntitlement) return null;

  const buttonProps = hasStarted
    ? {
        onClick: handleClickResume,
        disabled: disableResumeCourse,
        text: "Продолжить",
      }
    : {
        onClick: handleClickBegin,
        disabled: disableBeginCourse,
        text: "Начать",
      };

  return (
    <button
      className="course-action-button"
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {buttonProps.text}
    </button>
  );
};

// Хук для получения данных курса
const useCourseData = (cardId) => {
  const execEdTrackingParam = reduxHooks.useCardExecEdTrackingParam(cardId);
  const a = reduxHooks.useCardCourseData(cardId);
  const { bannerImgSrc, courseName:displayName } =
    reduxHooks.useCardCourseData(cardId);
  const { homeUrl, shortDescription, isStarted, isArchived, resumeUrl } =
    reduxHooks.useCardCourseRunData(cardId);
  const { isVerified, isActive, isCompleted, hasStarted } =
    reduxHooks.useCardEnrollmentData(cardId);
  const { isEntitlement, isFulfilled } =
    reduxHooks.useCardEntitlementData(cardId);
  const { disableCourseTitle, disableBeginCourse, disableResumeCourse } =
    useActionDisabledState(cardId);

  console.log(
    `Course ID: ${cardId}, displayName:`,
    displayName,
    JSON.stringify(a)
  ); // Debug log

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
    disableResumeCourse,
  };
};

// Хук для обработчиков событий
const useCourseEventHandlers = (
  cardId,
  homeUrl,
  resumeUrl,
  execEdTrackingParam
) => {
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
    handleClickResume,
  };
};

// Компонент прогресса курса
const CourseProgressSection = ({ progress = 0, topics, testResult = 100 }) => {
  const topicsData = topics || [
    { name: "Модуль 1", completed: true },
    { name: "Модуль 2", completed: true },
    { name: "Модуль 3", completed: false },
    { name: "Модуль 4", completed: false },
  ];

  return (
    <div className="course-stat">
      <h3 className="stats-header">Статистика по курсу</h3>

      <div className="progress-section">
        <div className="progress-info">
          <span className="label">Курс изучен на:</span>
          <span className="percentage">{progress}%</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="topics-list">
          {topicsData.map((topic, index) => (
            <div
              key={index}
              className={`topic-item ${topic.completed ? "completed" : "incomplete"}`}
            >
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      <div className="test-section">
        <div className="test-info">
          <span className="label">Результаты последнего теста:</span>
          <span className="percentage">{testResult}%</span>
        </div>

        <div className="test-action">
          <button className="test-button">Пройти тест</button>
        </div>

        <div className="test-encouragement">
          Улучши результаты или закрепи знания
        </div>
      </div>
    </div>
  );
};
const CourseAdditionalInfo = ({ cardId }) => {
  // Здесь можно добавить дополнительные данные через API или Redux
  const [courseDetails, setCourseDetails] = React.useState({
    language: "Қазақша / Орысша",
    rating: 0,
    ratingCount: 0,
    enrolledCount: 0,
  });

  return (
    <div className="language-info">
      <div className="language-label">
        Язык обучения: {courseDetails.language}
      </div>
      <div className="stats-row">
        <div className="participants">
          <div className="icon">👥</div>
          <span className="count">{courseDetails.enrolledCount}</span>
        </div>
        <div className="rating">
          <div className="icon">⭐</div>
          <span className="value">
            {courseDetails.rating}{" "}({courseDetails.ratingCount})
          </span>
        </div>
      </div>
    </div>
  );
};

// Основной компонент курса
const CourseItem = ({ cardId, formatMessage, courseProvider }) => {
  const courseData = useCourseData(cardId);
  console.info('====',JSON.stringify(courseProvider))
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
    disableResumeCourse,
  } = courseData;

  const { handleImageClicked, handleClickBegin, handleClickResume } =
    useCourseEventHandlers(cardId, homeUrl, resumeUrl, execEdTrackingParam);

  const status = getCourseStatus(isCompleted, isActive);

  // Функция для обрезки описания
  const truncateDescription = (text, maxLength = 200) => {
    if (!text)
      return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="card" key={cardId}>
      <CourseImage
        bannerImgSrc={bannerImgSrc}
        formatMessage={formatMessage}
        isVerified={isVerified}
        homeUrl={homeUrl}
        handleImageClicked={handleImageClicked}
        disableCourseTitle={disableCourseTitle}
      />

      <div className="course-info">
        <div className="course-header">
          <h3 className="title">
            {displayName || ""}
          </h3>
          <div className="description">
            {/* {truncateDescription(shortDescription)} */}
            {truncateDescription(courseProvider.courseProvider.name)}
          </div>
        </div>

        <div className="course-details">
          <CourseAdditionalInfo cardId={cardId} />

          <div className="action-row">
            <span className={`status ${status.class}`}>{status.text}</span>

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
      </div>

      <div className="divider"></div>

      <CourseProgressSection progress={50} testResult={100} />
    </div>
  );
};

// Главный компонент
export default function MyCourses({ courseListData }) {
  const { formatMessage } = useIntl();
  const { visibleList } = courseListData;
  const isCollapsed = useIsCollapsed();

  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const [showAll, setShowAll] = React.useState(false);
  const displayedCourses = showAll ? visibleList : visibleList.slice(0, 2);

  // Отладочная информация
  React.useEffect(() => {
    console.log("Course List Data:", courseListData);
    console.log("Visible courses:", visibleList);

    // Выводим информацию о первом курсе для отладки
    if (visibleList.length > 0) {
      const firstCourseId = visibleList[0].cardId;
      console.log("First course ID:", firstCourseId);
    }
  }, [courseListData, visibleList]);

  return (
    <section className="my-courses">
      <div className="my-courses__header">
        <h2>Мои курсы</h2>
        {visibleList.length > 1 && (
          <a
            className="course-search-url"
            href={urls.baseAppUrl(courseSearchUrl)}
          >
            Посмотреть мои курсы
          </a>
        )}
      </div>

      <div className="my-courses-container">
        {displayedCourses.map(({ cardId }, index) => (
          <div
            key={cardId}
            className={`course-fade ${showAll && index > 0 ? "fade-in" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CourseItem cardId={cardId} formatMessage={formatMessage} courseProvider={displayedCourses[index]}  />
          </div>
        ))}
      </div>

      {visibleList.length === 0 && (
        <div className="no-courses-message">
          <p>У вас пока нет зарегистрированных курсов</p>
        </div>
      )}
    </section>
  );
}
