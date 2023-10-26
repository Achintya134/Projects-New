import moment from "moment";
import { useContextApp } from "../context/contextApp";
import "../layout/Jobs.css";
import Info from "./Info";

const Course = ({
  userid, courseName, subjectCode, gpa, semester, status, credits, subId
}) => {
  const { setEditGrade, deleteGrade } = useContextApp();

  return (
    <div className="jCommon">
      <header>
        <div className="main-icon">{courseName.charAt(0)}</div>
        <div className="info">
          <h5>{courseName}</h5>
          <p>Semester:{semester}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
        {/* //add icon */}
          <Info text={subjectCode} icon={'Subject Code'}/>
          <Info text={gpa} icon={"GPA"}/>
          <Info text={credits} icon={"Credits"}/>
          <div
            className={`status ${
              status === "Not Started"
                ? "Awaiting"
                : status === "In Progress"
                ? "Interview"
                : status === "Completed"
                ? "Accepted"
                : "Rejected"
            }`}
          >
            {status}
          </div>
        </div>
        <footer>
          <div>
            <a
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditGrade(subId)}
            >
              Edit
            </a>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteGrade(subId)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Course;
