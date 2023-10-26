import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import{
    SHOW_ALERT,
    HIDE_ALERT,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESSFUL,
    USER_REGISTER_ERROR,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESSFUL,
    USER_LOGIN_ERROR,
    CHANGE_PAGE,
    USER_UPDATE_START,
    USER_UPDATE_SUCCESSFULL,
    USER_UPDATE_ERROR,
    SET_USER_PROFILE,
    ADD_EXPENDITURE_START,
    ADD_EXPENDITURE_SUCCESSFULL,
    ADD_EXPENDITURE_ERROR,
    GET_ALL_GRADES_ERROR,
    GET_ALL_GRADES_START,
    GET_ALL_GRADES_SUCCESSFULL,
    GET_ALL_EXPENDITURE_ERROR,
    GET_ALL_EXPENDITURE_START,
    GET_ALL_EXPENDITURE_SUCCESSFULL,
    SET_GRADES_ERROR,
    SET_GRADES_START,
    SET_GRADES_SUCCESSFULL,
    ADD_JOB_ERROR,
    ADD_JOB_SUCCESSFULL,
    ADD_JOB_START,
    GET_ALL_JOBS_ERROR,
    GET_ALL_JOBS_START,
    GET_ALL_JOBS_SUCCESSFULL,
    USER_LOGOUT,
    JOB_EDIT_SUCCESSFULL,
    JOB_EDIT_ERROR,
    JOB_EDIT_START,
    JOB_DELETE_BEGIN,
    JOB_DELETE_COMPLETE,
    SET_JOB_EDIT,
    EXPENSE_DELETE_BEGIN,
    EXPENSE_DELETE_COMPLETE,
    EXPENSE_EDIT_ERROR,
    EXPENSE_EDIT_START,
    EXPENSE_EDIT_SUCCESSFULL,
    GRADE_DELETE_BEGIN,
    GRADE_DELETE_COMPLETE,
    GRADE_EDIT_ERROR,
    GRADE_EDIT_START,
    GRADE_EDIT_SUCCESSFULL,
    SET_EXPENSE_EDIT,
    SET_GRADE_EDIT,
    VALUES_CLEAR,


} from './actions.js';
import { render } from "react-dom";

// setting default when user refreshes the page
const sid = localStorage.getItem("sid");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const userid = localStorage.getItem("userid");


//setting up the initial state
const State = {
  isLoading: false,
  displayAlertMsg: false,
  alertMsg: "",
  alertType: "",
  user: user || '',
  userid:userid || '',
  token: sid,
  userLocation: userLocation || " ",
  lastName:"",
  showSidebar: false,
  isEditing: false,
  editJobId: 0,
  storeName:"",
  itemName: "", 
  amountSpent: 0.0, 
  dateOfExpenditure: "",
  expenses:[],
  courseName: "",
  subjectCode: "",
  gpa: 0.0,
  semesterOptions: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12,],
  semester: 1,
  statusOptions: ["",
    "Completed",
    "In Progress",
    "Not Started",
  ],
  status: "Not Started",
  subjects: [],
  position:"",
  company:"",
  jobLocation: "",
  dateOfInterview:"",
  jobId:"",
  jobTypeOptions: ["Full-Time", "Internship", "Hybrid", "Remote"],
  jobType: "Full-Time",
  jobStatusOptions: [
    "Interview Scheduled",
    "Rejected",
    "Awaiting Response",
    "Accepted",
  ],
  jobStatus: "Awaiting Response",
  jobs: [],
  totalJobs: 0,
  totalSubjects: 0,
  numOfPages: 1,
  page: 1,
  pageName: 'page1',
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "All",
  searchType: "All",
  sort: "Latest",
  sortOptions: ["Latest", "oldest", "a-z", "z-a"],
  credits: 0,
  isLogin: false,
};

const ContextApp = React.createContext();

function ProviderApp({ children }) {
  // const [state, setState] = useState(State);
  const [state, dispatch] = useReducer(reducer, State);

  const showAlert = () => {
    dispatch({ type: SHOW_ALERT });
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, sid, location, userid }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("sid", sid);
    localStorage.setItem("location", location);
    localStorage.setItem("userid", userid);
  };

  //to remove the user from local storage after logout
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("sid");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
    localStorage.removeItem("userid");
  };

  const userRegistration = async (currentUser) => {
    dispatch({ type: USER_REGISTER_START });
    const {name, password, email} = currentUser
    return  fetch("/api/v1/auth/register", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({username:name, userid:email, lastname:'', location:''}),
      })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
      if (response.ok) {
        
        const { username, userid, sid, location } = response.json();
        dispatch({
            type: USER_REGISTER_SUCCESSFUL,
            payload: {
            user: username,
            location: location,
            userid,
            },
      });
      addUserToLocalStorage({ username, sid, location, userid});
      hideAlert();
      //console.log(state.user);
      return;
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => {
            dispatch({
                type: USER_REGISTER_ERROR,
                payload: { msg: err.error },
                });
            hideAlert();
        });
    });
  };

  const clearValues = () => {
    dispatch({ type: VALUES_CLEAR });
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: USER_LOGIN_START });

        fetch("/api/v1/auth/login",{
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({userid:currentUser}),
      })
      .catch(()=>{
        dispatch({
            type: USER_LOGIN_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
      .then((response) => {
          if(response.ok){
            response
            .json()
            .then((response) => {

                addUserToLocalStorage({ username, sid, location, userid});
                //localStorage.setItem("pagename", "login_successfull");
                const { username, userid, sid, location } = response;
                hideAlert();
                dispatch({
                    type: USER_LOGIN_SUCCESSFUL,
                    payload: {
                      username,
                      sid,
                      location,
                      userid,
                      pageName: "login_successfull",
                    },
              });
            })
        }
        else{
          return response
        .json()
        .catch((err) => {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload: { msg: err.error },
                });
            hideAlert();    
        })
        .then((err) => {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload: { msg: err.error },
                });
            hideAlert();
        });}
    });
  };

  const updateUser = async (name, email, lastname, loc) => {
    dispatch({ type: USER_UPDATE_START });

      fetch("/api/v1/user/updateUser",{
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({username: name, userid: email, lastname:lastname, location:loc, token:state.token}),
      })
      .catch(()=>{
        dispatch({
            type: USER_UPDATE_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
      .then((response) => {
          if(response.ok){
            return response
            .json()
            .then((response) => {
            const { username, userid, lastname, location, msg  } = response;
            dispatch({
                type: USER_UPDATE_SUCCESSFULL,
                payload: {
                    username, 
                    userid, 
                    lastname, 
                    location,
                    msg,
                },
            });
            hideAlert();
        });
        }
          return response
        .json()
        .catch((error) => {
        dispatch({
            type: USER_UPDATE_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
        .then((err) => {
            dispatch({
                type: USER_UPDATE_ERROR,
                payload: { msg: err.error },
                });
            hideAlert();
        });
    });

  }

  const addExpenditure = async (userid,storename,
    itemname, 
    amount, 
    date) => {
    dispatch({ type: ADD_EXPENDITURE_START });

      fetch("/api/v1/user/addExpense",{
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({storename,
            itemname, 
            amount, 
            date, 
            token:state.token}),
      })
      .catch(()=>{
        dispatch({
            type: ADD_EXPENDITURE_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
      .then((response) => {
          if(response.ok){
              
            //const { msg,storename,itemname, amount, date  } = response.json();
            return response.json()
            .then((response) => 
            {
                const msg = response.msg;
                const storename = response.storename;
                const itemname = response.itemname;
                const amount = response.amount;
                const date = response.date;
                dispatch({
                    type: ADD_EXPENDITURE_SUCCESSFULL,
                    payload: {
                        msg,storename,itemname, amount, date
                    },
                });
                hideAlert();
          });
        }
          return response
        .json()
        .catch((error) => {
        dispatch({
            type: ADD_EXPENDITURE_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
        .then((err) => {
            dispatch({
                type: ADD_EXPENDITURE_ERROR,
                payload: { msg: err },
                });
            hideAlert();
        });
    });

  }

  function togglePage(pageName){
    dispatch({ type: CHANGE_PAGE, payload: {pageName}});
    localStorage.setItem("pagename", pageName);

  }

  function getProfile(userid){
    fetch("/Profile", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
          }),
        body: JSON.stringify({token:state.token}),
      })
        .catch(() => {
            dispatch({
                type: USER_UPDATE_ERROR,
                payload: { msg: 'networkError' },
                });
            hideAlert();
          })
        .then((response) => {
          if (response.ok) {
              return response.json().then((response)=>
              {
                  const { userData  } = response;
                  dispatch({
                      type: SET_USER_PROFILE,
                      payload: { 
                          username:userData.username,
                          userid:userData.userid,
                          lastname:userData.lastname,
                          location:userData.location,    
                       },
                      });

              });
          }
          return response
            .json()
            .catch((error) => Promise.reject({ error }))
            .then((err) => Promise.reject(err));
        });
  }

  function getAllExpenses(userid){
    dispatch({type:GET_ALL_EXPENDITURE_START})
    fetch("/getAllExpenses", {
    method: "POST",
    headers: new Headers({
        "content-type": "application/json",
      }),
    body: JSON.stringify({token:state.token}),
  })
    .catch(() => {
        dispatch({
            type: GET_ALL_EXPENDITURE_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
    .then((response) => {
      if (response.ok) {
          return response.json().then((response)=>
          {
              const { userData  } = response;
              dispatch({
                  type: GET_ALL_EXPENDITURE_SUCCESSFULL,
                  payload: { 
                      userData    
                   },
                  });

          });
      }
      return response
        .json()
        .catch((error) => {
                dispatch({
                    type: GET_ALL_EXPENDITURE_ERROR,
                    payload: { msg: 'networkError' },
                    });
                hideAlert();
        })
        .then((err) => {
            dispatch({
                type: GET_ALL_EXPENDITURE_ERROR,
                payload: { msg: err.error },
                });
            hideAlert();
        });
    });
}

  function getAllGrades(userid){
        dispatch({type:GET_ALL_GRADES_START})
        fetch("/getAllGrades", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
          }),
        body: JSON.stringify({token:state.token}),
      })
        .catch(() => {
            dispatch({
                type: GET_ALL_GRADES_ERROR,
                payload: { msg: 'networkError' },
                });
            hideAlert();
          })
        .then((response) => {
          if (response.ok) {
              return response.json().then((response)=>
              {
                  const { userData  } = response;
                  dispatch({
                      type: GET_ALL_GRADES_SUCCESSFULL,
                      payload: { 
                          userData    
                       },
                      });

              });
          }
          return response
            .json()
            .catch((error) => {
                    dispatch({
                        type: GET_ALL_GRADES_ERROR,
                        payload: { msg: 'networkError' },
                        });
                    hideAlert();
            })
            .then((err) => {
                dispatch({
                    type: GET_ALL_GRADES_ERROR,
                    payload: { msg: err },
                    });
                hideAlert();
            });
        });
  }

  function addGrades(courseName, subjectCode, gpa, semester, status, credits, userid){
    dispatch({type:SET_GRADES_START})
    fetch("/addGrades", {
    method: "POST",
    headers: new Headers({
        "content-type": "application/json",
      }),
    body: JSON.stringify({courseName, subjectCode, gpa, semester, status, credits, token:state.token}),
  })
    .catch(() => {
        dispatch({
            type: SET_GRADES_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
    .then((response) => {
      if (response.ok) {
          return response.json().then((response)=>
          {
              const { msg  } = response;
              dispatch({
                  type: SET_GRADES_SUCCESSFULL,
                  payload: { 
                      msg    
                   },
                  });

          });
      }
      return response
        .json()
        .catch((error) => {
                dispatch({
                    type: SET_GRADES_ERROR,
                    payload: { msg: 'networkError' },
                    });
                hideAlert();
        })
        .then((err) => {
            dispatch({
                type: SET_GRADES_ERROR,
                payload: { msg: err },
                });
            hideAlert();
        });
    });
}

function getAllJobs(userid){
    dispatch({type:GET_ALL_JOBS_START})
    fetch("/getAllJobs", {
    method: "POST",
    headers: new Headers({
        "content-type": "application/json",
      }),
    body: JSON.stringify({token:state.token}),
  })
    .catch(() => {
        dispatch({
            type: GET_ALL_JOBS_ERROR,
            payload: { msg: 'networkError' },
            });
        hideAlert();
      })
    .then((response) => {
      if (response.ok) {
          return response.json().then((response)=>
          {
              const { userData  } = response;
              dispatch({
                  type: GET_ALL_JOBS_SUCCESSFULL,
                  payload: { 
                      userData    
                   },
                  });

          });
      }
      return response
        .json()
        .catch((error) => {
                dispatch({
                    type: GET_ALL_JOBS_ERROR,
                    payload: { msg: 'networkError' },
                    });
                hideAlert();
        })
        .then((err) => {
            dispatch({
                type: GET_ALL_JOBS_ERROR,
                payload: { msg: err },
                });
            hideAlert();
        });
    });
}

function addJob(position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, userid){
dispatch({type:ADD_JOB_START})
fetch("/addJob", {
method: "POST",
headers: new Headers({
    "content-type": "application/json",
  }),
body: JSON.stringify({position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview, token:state.token}),
})
.catch(() => {
    dispatch({
        type: ADD_JOB_ERROR,
        payload: { msg: 'networkError' },
        });
    hideAlert();
  })
.then((response) => {
  if (response.ok) {
      return response.json().then((response)=>
      {
          const { msg  } = response;
          dispatch({
              type: ADD_JOB_SUCCESSFULL,
              payload: { 
                  msg    
               },
              });

      });
  }
  return response
    .json()
    .catch((error) => {
            dispatch({
                type: ADD_JOB_ERROR,
                payload: { msg: 'networkError' },
                });
            hideAlert();
    })
    .then((err) => {
        dispatch({
            type: ADD_JOB_ERROR,
            payload: { msg: err },
            });
        hideAlert();
    });
});
}

const logoutUser = () => {
   fetch('/api/session', 
      {
        method: "DELETE",
    }).catch((error) => {
      dispatch({
        type: JOB_EDIT_ERROR,
        payload: { msg: 'networkError' },
        });
    hideAlert();
    })
    dispatch({ type: USER_LOGOUT });
    hideAlert();
    removeUserFromLocalStorage();
    
  };

  const setEditJob = (editJobId) => {
    dispatch({ type: SET_JOB_EDIT, payload: { editJobId } });
  };

  const setEditGrade = (editJobId) => {
    dispatch({ type: SET_GRADE_EDIT, payload: { editJobId } });
  };

  const setEditExpense = (editJobId) => {
    dispatch({ type: SET_EXPENSE_EDIT, payload: { editJobId } });
  };

  const editJob = async (position,
    company,
    jobLocation,
    jobType,
    jobStatus, dateOfInterview) => {
    dispatch({ type: JOB_EDIT_START });
    const {editJobId} = state;
    fetch(`/editJob/${editJobId}`, {
      method: 'PATCH',
      headers: new Headers({
      'content-type': 'application/json',
      }),
      body: JSON.stringify({position,
          company,
          jobLocation,
          jobType,
          jobStatus, dateOfInterview, editJobId, token:state.token}),
      })
      .catch(() => {
          dispatch({
              type: JOB_EDIT_ERROR,
              payload: { msg: 'networkError' },
              });
          hideAlert();
        })
      .then((response) => {
        if (response.ok) {
            return response.json().then((response)=>
            {
                const { msg  } = response;
                dispatch({
                    type: JOB_EDIT_SUCCESSFULL,
                    payload: { 
                        msg    
                     },
                    });
                    getAllJobs(state.userid);
                    hideAlert();
            });
        }
        return response
          .json()
          .catch((error) => {
                  dispatch({
                      type: JOB_EDIT_ERROR,
                      payload: { msg: 'networkError' },
                      });
                  hideAlert();
          })
          .then((err) => {
              dispatch({
                  type: JOB_EDIT_ERROR,
                  payload: { msg: err.error },
                  });
              hideAlert();
          });
      });
  };


  const editExpenditure = async (userid,storename,
    itemname, 
    amount, 
    date) => {
    
    dispatch({ type: EXPENSE_EDIT_START });
    const {editJobId} = state;
    fetch(`/editExpense/${editJobId}`, {
      method: 'PATCH',
      headers: new Headers({
      'content-type': 'application/json',
      }),
      body: JSON.stringify({itemname, 
        storename,
        amount, 
        date, editJobId, token:state.token}),
      })
      .catch(() => {
          dispatch({
              type: EXPENSE_EDIT_ERROR,
              payload: { msg: 'networkError' },
              });
          hideAlert();
        })
      .then((response) => {
        if (response.ok) {
            return response.json().then((response)=>
            {
                const { msg  } = response;
                dispatch({
                    type: EXPENSE_EDIT_SUCCESSFULL,
                    payload: { 
                        msg    
                     },
                    });
                    getAllExpenses(state.userid);
                    hideAlert();
            });
        }
        return response
          .json()
          .catch((error) => {
                  dispatch({
                      type: EXPENSE_EDIT_ERROR,
                      payload: { msg: 'networkError' },
                      });
                  hideAlert();
          })
          .then((err) => {
              dispatch({
                  type: EXPENSE_EDIT_ERROR,
                  payload: { msg: err.error },
                  });
              hideAlert();
          });
      });
  };

  const deleteJob = async (editJobId) => {
    dispatch({ type: JOB_DELETE_BEGIN });
    try {
      fetch(`/deleteJob/${editJobId}`, {
        method: 'DELETE',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({editJobId, token:state.token}),
        }). then((response) => {
          dispatch({ type: JOB_DELETE_COMPLETE,payload: {msg:"Job Deleted!"} });hideAlert();
        })
      const {userid }= state;
      getAllJobs(userid);
    } catch (error) {
      logoutUser();
    }
  };

  const deleteExpenditure = async (editJobId) => {
    dispatch({ type: EXPENSE_DELETE_BEGIN });
    try {
      fetch(`/deleteExpense/${editJobId}`, {
        method: 'DELETE',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({editJobId, token:state.token}),
        }). then((response) => {
          dispatch({ type: EXPENSE_DELETE_COMPLETE,payload: {msg:"Expenditure Deleted!"} });hideAlert();
        })
      const {userid }= state;
      getAllExpenses(userid);
    } catch (error) {
      logoutUser();
    }
  };


  const editGrade = async (courseName, subjectCode, gpa, semester, status, credits) => {
    dispatch({ type: GRADE_EDIT_START });
    const {editJobId} = state;
    fetch(`/editGrade/${editJobId}`, {
      method: 'PATCH',
      headers: new Headers({
      'content-type': 'application/json',
      }),
      body: JSON.stringify({courseName, subjectCode, gpa, semester, status, credits, editJobId, token:state.token}),
      })
      .catch(() => {
          dispatch({
              type: GRADE_EDIT_ERROR,
              payload: { msg: 'networkError' },
              });
          hideAlert();
        })
      .then((response) => {
        if (response.ok) {
            return response.json().then((response)=>
            {
                const { msg  } = response;
                dispatch({
                    type: GRADE_EDIT_SUCCESSFULL,
                    payload: { 
                        msg    
                     },
                    });
                    getAllExpenses(state.userid);
            });
        }
        return response
          .json()
          .catch((error) => {
                  dispatch({
                      type: GRADE_EDIT_ERROR,
                      payload: { msg: 'networkError' },
                      });
                  hideAlert();
          })
          .then((err) => {
              dispatch({
                  type: GRADE_EDIT_ERROR,
                  payload: { msg: err.error },
                  });
              hideAlert();
          });
      });
  };

  const deleteGrade = async (editJobId) => {
    dispatch({ type: GRADE_DELETE_BEGIN });
    try {
      fetch(`/deleteGrade/${editJobId}`, {
        method: 'DELETE',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({editJobId, token:state.token}),
        }). then((response) => {
          dispatch({ type: GRADE_DELETE_COMPLETE,payload: {msg:"Job Deleted!"} });
          hideAlert();
        })
      const {userid }= state;
      getAllJobs(userid);
    } catch (error) {
      logoutUser();
    }
  };
  // const clearSearch = () => {
  //   //console.log("clear filters");
  //   dispatch({ type: SEARCH_CLEAR });
  // };

  

  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
        userRegistration,
        loginUser,
        updateUser,
        togglePage,
        getProfile,
        addExpenditure,
        getAllExpenses,
        addJob,
        getAllJobs,
        addGrades,
        getAllGrades,
        logoutUser,
        setEditJob,
        editJob,
        deleteJob,
        editExpenditure,
        deleteExpenditure,
        editGrade,
        deleteGrade,
        setEditGrade,
        setEditExpense,
        clearValues
      }}>
          {children}
      </ContextApp.Provider>
  );

};



const useContextApp = () => {
    return useContext(ContextApp);
  };
  
export { ProviderApp, State, useContextApp };
  