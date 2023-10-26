import  FormInput   from "../components/FormInput";
import  AlertMessage from "../components/AlertMessage";
import  FormRowSelect from "../components/FormRowSelect";
import JobsContainer from '../components/JobsContainer';
import { useContextApp } from "../context/contextApp";
import "../layout/DashboardPage.css";
import { useState, useEffect } from "react";
import Info from "../components/Info";

const JobApplications = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    userid,
    jobTypeOptions,
    handleChange,
    addJob,
    editJob,
    jobStatusOptions,
    getAllJobs,
    jobType,
    position,
    jobLocation,
    jobStatus,
    company,
    dateOfInterview,
    clearValues,
    jobs,

    addEvent,
  } = useContextApp();

  const [pos, setPosition] = useState(position);
  const [jobtype, setJobType] = useState(jobType);
  const [joblocation, setJobLocation] = useState(jobLocation);
  const [jobstatus, setJobStatus] = useState(jobStatus);
  const [comp, setCompany] = useState(company);
  const [date, setDateOfInterview] = useState(dateOfInterview);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pos || !comp || !joblocation) {
      showAlert();
      return;
    }
    if (isEditing) {
      editJob(pos,
        comp,
        joblocation,
        jobtype,
        jobstatus, date);
        getAllJobs(userid);
        setPosition('');
        setJobType('');
        setJobLocation('');
        setJobStatus('');
        setCompany('');
        setDateOfInterview('');
      return;
    }
    addJob(pos,
      comp,
      joblocation,
      jobtype,
      jobstatus, date, userid);
    getAllJobs(userid);
  };

  useEffect(() => {
    getAllJobs(userid);
  }, [userid, isEditing]);
  

  return (
    <div className="jobCommon">
      <form className="form">
        <h3>{isEditing ? "Edit Job Status" : "Add New Job"}</h3>
        {showAlert && <AlertMessage />}
        <div>
          <Info text={jobs.length} icon={"Total Number of Applications"}></Info>
          <Info text={jobs.filter(j=>j.jobStatus === 'Interview Scheduled').length} icon={"Interview Scheduled"}></Info>
          <Info text={jobs.filter(j=>j.jobStatus === 'Awaiting Response').length} icon={"Awaiting Response"}></Info>
          <Info text={jobs.filter(j=>j.jobStatus === 'Rejected').length} icon={"Rejected"}></Info>
          <Info text={jobs.filter(j=>j.jobStatus === 'Accepted').length} icon={"Accepted"}></Info>

        </div>
        {/*HTML element for position field */}
        <div className="form-center">
          <FormInput
            type="text"
            name="position"
            labelText="Job Role"
            value={pos}
            handleChange={(e) => setPosition(e.target.value)}
            placeholder="Enter a job role"
          />
          {/* html element company */}
          <FormInput
            type="text"
            name="company"
            value={comp}
            handleChange={(e) => setCompany(e.target.value)}
            placeholder="Enter the company"
          />
          {/* html element for location */}
          <FormInput
            type="text"
            labelText="location"
            name="jobLocation"
            value={joblocation}
            handleChange={(e) => setJobLocation(e.target.value)}
            placeholder="Enter the job location"
          />
          {/* html element for job status */}
          <FormRowSelect
            name="status"
            value={jobstatus}
            handleChange={(e) => setJobStatus(e.target.value)}
            list={jobStatusOptions}
            placeholder="Enter the job status"
          />
          {/* html element for job type */}
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            value={jobtype}
            handleChange={(e) => setJobType(e.target.value)}
            list={jobTypeOptions}
          />
          <FormInput
            type="date"
            name="dateOfInterview"
            labelText="Interview Date"
            handleChange={(e) => setDateOfInterview(e.target.value)}
            value={date}
          />
          {/* html element for btn container */}
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
      <JobsContainer></JobsContainer>
    </div>
  );
};

export default JobApplications;
