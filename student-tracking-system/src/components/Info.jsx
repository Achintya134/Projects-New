import "../layout/JobDetails.css";

//component to add job icon and job details to each job
const Info = ({ icon, text }) => {
  return (
    <div className="jInfoCom">
      <span className="text"><b>{icon}:</b></span>
      <span className="text">{text}</span>
    </div>
  );
};

export default Info;

