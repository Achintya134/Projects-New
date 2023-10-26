import { useContextApp } from "../context/contextApp";
import { useEffect } from "react";
import Loading from "./Loading";
import Course from "./Course";
import "../layout/JobContainer.css";
import PageBtnContainer from "./PageBtnContainer";

const CourseContainer = () => {
  const {
    getJobs,
    subjects,
    isLoading,
    getAllGrades,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    userid,
  } = useContextApp();

  useEffect(() => {
    getAllGrades(userid);
  }, [page, search, searchStatus, searchType, sort, userid]);
  if (isLoading) {
    return <Loading center />;
    return;
  }

  if (subjects.length === 0) {
    return (
      <div className="jobContaier">
        <h2>No Grades to Display...</h2>
      </div>
    );
  }

  return (
    <div className="jobContaier">
      <div className="jobs">
        {subjects.map((subject) => {
          return <Course {...subject} />;
        })}
      </div>
    </div>
  );
};

export default CourseContainer;
