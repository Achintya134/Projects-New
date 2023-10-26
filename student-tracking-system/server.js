const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const user = require("./User");
const sessions = require("./sessions");
const expenditure = require("./expenditure");
const grades = require("./getAllGrades");
const jobs = require("./manageJobs");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());


app.post("/api/v1/auth/register", (req, res) => {
  const { username, userid, lastname, location } = req.body;

  if (user.checkUser(userid) === 'User already exists!') {
    res.status(400).json({ error: 'User already exists!' });
    return;
  }

  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "Enter A Valid Username" });
    return;
  }

  
  user.addUser({ username, userid, lastname, location });
  
  res.json({ username, userid, lastname, location });
});

app.post("/api/v1/auth/login", (req, res) => {
  //const sid = req.cookies.sid;
  const { userid } = req.body;
  
  if (!userid ) {
    res.status(400).json({ error: 'Please provide all values' });
    return;
  }
  else if( !user.verifyLogin(userid)){
    res.status(401).json({ error: 'Your credentials are incorrect!' });
    return;
  }
  const sid = sessions.addSession(userid);
  res.cookie('sid', sid);
  res.json({ user:user.username, userid, sid, location: user.location });
  
});

app.post(`/Profile`, (req, res) => {
  const sids = req.cookies.sid;
  const { token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  
  const userData = user.getUser(userid);
  res.json({userData});
});

app.post(`/api/v1/user/updateUser`, (req, res) => {
  const sids = req.cookies.sid;
  const { username, userid, lastname, location, token } = req.body;
  const user_id = sids ? sessions.getSessionUser(sids) : "";
  if (!sids || user_id === "") {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  
  user.updateUser(username, userid, lastname, location);
  const msg="User Updated server!"
  res.json({username, userid, lastname, location , msg});
});

app.post("/api/v1/user/addExpense", (req, res) => {
  const sids = req.cookies.sid;
  const { storename,
    itemname, 
    amount, 
    date, token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
 
  
  const msg = expenditure.addExpenditure(userid, storename,itemname, amount, date);
  if (msg === 'Information Missing' ) {
    res.status(400).json({ error: 'Please provide all values' });
    return;
  }
  res.json({msg,storename,itemname, amount, date});
})

app.post(`/getAllGrades`, (req, res) => {
  const sids = req.cookies.sid;
  const { token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids ) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const userData = grades.getAllGrades(userid);
  res.json({userData});
});

app.post(`/getAllExpenses`, (req, res) => {
  const sids = req.cookies.sid;
  const { token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const userData = expenditure.getAllExpenses(userid);
  res.json({userData});
});


app.post(`/addGrades`,(req,res) => {
  const sids = req.cookies.sid;
  const { courseName, subjectCode, gpa, semester, status, credits, token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids ) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  grades.addGrades(courseName, subjectCode, gpa, semester, status, credits, userid);

  res.json({msg:'Gardes Added Successfully!'});
})

app.post(`/getAllJobs`, (req, res) => {
  const sids = req.cookies.sid;
  const { token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const userData = jobs.getAllJobs(userid);
  res.json({userData});
});


app.post(`/addJob`,(req,res) => {
  const sids = req.cookies.sid;
  const { position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, token } = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  
  jobs.addJob(position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, userid);

  res.json({msg:'Gardes Added Successfully!'});
})

app.patch(`/editJob/:editJobId`,(req,res) => {
  const sids = req.cookies.sid;
  const { position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, editJobId, token} = req.body;
  const userid = token ? sessions.getSessionUser(token) : "";
  if (!sids ) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  
  jobs.editJob(position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, editJobId);

  res.json({msg:'Job Updated Successfully!'});
})

app.delete(`/deleteJob/:editJobId`,(req,res) => {
  const sids = req.cookies.sid;
  const {editJobId, token} = req.body;
  if (!sids ) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  
  jobs.deleteJob(editJobId);

  res.json({msg:'Job Deleted Successfully!'});
})

app.patch(`/editExpense/:editJobId`,(req,res) => {
  const sids = req.cookies.sid;
  const { itemname, storename, amount, date, editJobId, token} = req.body;
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  expenditure.editExpenditure(itemname, storename, amount, date, editJobId);

  res.json({msg:'Expenditure Updated Successfully!'});
})

app.delete(`/deleteExpense/:editJobId`,(req,res) => {
  const sid = req.cookies.sid;
  const {editJobId} = req.body;
  expenditure.deleteExpenditure(editJobId);

  res.json({msg:'Expenditure Deleted Successfully!'});
})

app.patch(`/editGrade/:editJobId`,(req,res) => {
  const sids = req.cookies.sid;
  const { courseName, subjectCode, gpa, semester, status, credits, editJobId, token} = req.body;
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
    grades.editGrade(courseName, subjectCode, gpa, semester, status, credits, editJobId);

  res.json({msg:'Grade Updated Successfully!'});
})

app.delete(`/deleteGrade/:editJobId`,(req,res) => {
  const sids = req.cookies.sid;
  const {editJobId, token } = req.body;
  if (!sids) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  grades.deleteGrade(editJobId);

  res.json({msg:'Grade Deleted Successfully!'});
})


app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {


    sessions.deleteSession(sid);
  }
  res.json( `user logged out`);
});

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const userid = sid ? sessions.getSessionUser(sid) : "";
  if (!sid) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(true);
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
