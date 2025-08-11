import { reduxHooks } from 'hooks';
import { useCourseListData } from "../CoursesPanel/hooks";
import SearchBar from "./SearchBar";
import MyCourses from "./MyCourses";
import Recommendations from "./Recommendations";
import "./CoursesPage.scss"; // общие стили страницы

export default function CoursesPage() {
  const courseListData = useCourseListData();
  const hasCourses = reduxHooks.useHasCourses();
  return (
    <div className="courses-page">
      {/* Навигация (хлебные крошки) */}
      <div className="breadcrumbs">
        Главная <span>›</span> Мои курсы
      </div>

      {/* TO DO найти API поиска */}
      {/* Поиск и фильтры */}
      <SearchBar {...courseListData.filterOptions} />

      {/* Мои курсы */}
      {hasCourses ? <MyCourses courseListData={courseListData} /> : <>Нет курсов</>}
      

      {/* Рекомендации */}
      {/* <Recommendations /> */}
    </div>
  );
}
