import  FormInput   from "../components/FormInput";
import  AlertMessage from "../components/AlertMessage";
import  FormRowSelect from "../components/FormRowSelect";
import CourseContainer from '../components/CourseContainer'
import { useContextApp } from "../context/contextApp";
import {useState, useEffect} from "react";
import "../layout/DashboardPage.css";
import Info from "../components/Info";

const ManageGrades = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    semester,
    semesterOptions,
    handleChange,
    createJob,
    editJob,
    statusOptions,
    addGrades,
    getAllGrades,
    addEvent,
    userid,
    editGrade,
    courseName,
    subjectCode,
    status,
    credits,
    gpa,
    subjects,
    clearValues,


  } = useContextApp();

  const [coursename, setCoursename] = useState(courseName);
  const [subjectcode, setsubjectCode] = useState(subjectCode);
  const [sem, setSemester] = useState(semester);
  const [stat, setStatus] = useState(status);
  const [credit, setCredits] = useState(credits);
  const [gpa_chk, setGpa] = useState(gpa);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subjectcode ||
      !credit ||
      !sem ||
      stat === "" ||
      !coursename || gpa_chk<0.0 || gpa_chk>4.0) {
      showAlert();
      return;
    }
    else if(stat === "Completed" && gpa_chk===0.00)
    {
      showAlert();
      return;
    }
    if (isEditing) {
      editGrade(coursename, subjectcode, gpa_chk, sem, stat, credit);
      getAllGrades(userid);
      setCoursename('');
      setsubjectCode('');
      setSemester(1);
      setStatus('');
      setCredits(0);
      setGpa(0.0);
      return;
    }
    addGrades(coursename, subjectcode, gpa_chk, sem, stat, credit, userid);
    getAllGrades(userid);
  };

  const calcGPA = () =>{
    let gpa =0.0;
    let credit = 0
    let agg =0.0;
    let ctr = 0;
    subjects.map((s) => {
        if(s.status === 'Completed')
        {
          agg = agg+(s.gpa * s.credits);
          credit=credit+(1*s.credits);
        }
    });
    if(credit === 0){
      return 'No Subjects Completed Yet!'
    }  
    else {
      gpa = agg/credit;
      return {gpa, credit};
    }
  }


  useEffect(() => {
    getAllGrades(userid);

  }, [isEditing]);

  return (
    <div className="jobCommon">
      <form className="form">
        <h3>{isEditing ? "Edit Course Status" : "Add New Course"}</h3>
        {showAlert && <AlertMessage />}
        <div>
          <Info text={calcGPA().gpa} icon={"GPA"}></Info>
          <Info text={subjects.length} icon={"Total Subjects"}></Info>
          <Info text={calcGPA().credit} icon={"Total Credits Earned:"}></Info>

        </div>

        {/*HTML element for position field */}
        <div className="form-center">
          <FormInput
            type="text"
            name="courseName"
            labelText="Course Name"
            value={coursename}
            handleChange={(e)=>setCoursename(e.target.value)}
            placeholder="Enter your Course Name here.."
          />
          {/* html element company */}
          <FormInput
            type="text"
            name="subjectCode"
            labelText="Subject Code"
            value={subjectcode}
            handleChange={(e)=>setsubjectCode(e.target.value)}
            placeholder="Enter the Subject Code"
          />
          {/* html element for location */}
          <FormInput
            type="number"
            min="0.0"
            max="4.0"
            step="0.01"
            labelText="GPA"
            name="GPA"
            value={gpa_chk}
            handleChange={(e)=>setGpa(e.target.value)}
            placeholder="Enter your GPA here..."
          />
          {/* html element for job status */}
          <FormRowSelect
            name="Status"
            value={stat}
            handleChange={(e)=>setStatus(e.target.value)}
            list={statusOptions}
          />
          {/* html element for job type */}
          <FormRowSelect
            name="semester"
            labelText="Semester"
            value={sem}
            handleChange={(e)=>setSemester(e.target.value)}
            list={semesterOptions}
          />
          <FormInput
            type="number"
            min="0"
            max="4"
            name="credits"
            value={credit}
            labelText="Credits"
            handleChange={(e)=>setCredits(e.target.value)}
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
      <CourseContainer></CourseContainer>
    </div>
  );
};

export default ManageGrades;
