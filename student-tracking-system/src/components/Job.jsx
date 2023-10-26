
import { useContextApp } from "../context/contextApp";
import "../layout/Jobs.css";
import Info from "./Info";

const Job = ({
  userid, position,
  company,
  jobLocation,
  jobType,
  jobStatus, 
  jobId,
  dateOfInterview,
}) => {
  const { setEditJob, deleteJob } = useContextApp();


  return (
    <div className="jCommon">
    <header>
      <div className="main-icon">{company.charAt(0)}</div>
      <div className="info">
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
    </header>
    <div className="content">
      <div className="content-center">
        <Info  text={position} icon={"Position"}/> 
        <Info  text={company} icon={"Company"}/> 
        <Info  text={jobLocation} icon={"Job Location"}/>
        {/* <Info  text={date} /> */}
        <Info  text={jobType} icon={"Job Type"}/> 
        <Info  text={dateOfInterview} icon={"Date of Inteview"}/> 
        <div
          className={`status ${
            jobStatus === "Awaiting Response"
              ? "Awaiting"
              : jobStatus === "Interview Scheduled"
              ? "Interview"
              : jobStatus
          }`}
        >
          {jobStatus}
        </div>
      </div>
      <footer>
        <div>
          <a
            to="/add-job"
            className="btn edit-btn"
            onClick={() => setEditJob(jobId)}
          >
            Edit
          </a>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteJob(jobId)}
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
);
};

export default Job;
