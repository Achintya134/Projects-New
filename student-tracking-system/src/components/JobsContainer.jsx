import { useContextApp } from "../context/contextApp";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import "../layout/JobContainer.css";


const JobsContainer = () => {
  const {
    getJobs,
    isLoading,
    getAllJobs,
    page,
    jobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    userid,
  } = useContextApp();

  useEffect(() => {
    //getJobs();
    // eslint-disable-next-line
    getAllJobs(userid);
  }, [userid]);
  if (isLoading) {
    return <Loading center />;
    return;
  }

  if (jobs.length === 0) {
    return (
      <div className="jobContaier">
        <h2>Add Jobs to View...</h2>
      </div>
    );
  }

  return (
    <div className="jobContaier">
      <div className="jobs">
        {jobs.map((jobs) => {
          return <Job {...jobs} />;
        })}
      </div>
    </div>
  );
};

export default JobsContainer;
