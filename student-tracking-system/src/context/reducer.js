import {
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
    SET_JOB_EDIT,
    JOB_EDIT_SUCCESSFULL,
    JOB_EDIT_ERROR,
    JOB_EDIT_START,
    JOB_DELETE_BEGIN,
    JOB_DELETE_COMPLETE,
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

import { state } from "./contextApp";

function reducer(state, action) {
    //if action type is equal to showalert then the alert mesage flat is set to true
    switch(action.type){
        case SHOW_ALERT: 
        return{
            ...state,
            displayAlertMsg: true,
            alertType: "danger",
            alertMsg: "One or more fields are empty. provide all values!",
        };
        case HIDE_ALERT:
        return{
            ...state,
            displayAlertMsg: false,
            alertType:"",
            alertMsg:""
        };
        case USER_REGISTER_START:
            return { ...state, isLoading: true };
        case USER_REGISTER_SUCCESSFUL:
        return {
            ...state,
            isLoading: false,
            token: action.payload.sid,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            displayAlertMsg: true,
            alertType: "success",
            alertMsg: "Successfull user registration! Redirecting...",
        };
        
        case USER_REGISTER_ERROR:
        return {
            ...state,
            isLoading: false,
            displayAlertMsg: true,
            alertType: "danger",
            alertMsg: action.payload.msg,
        };
        case USER_LOGIN_START:
            return {
                ...state,
                isLoading:true,
            };
        case USER_LOGIN_SUCCESSFUL:
            return {
                ...state,
                isLoading:false,
                user: action.payload.user,
                userid: action.payload.userid,
                userLocation: action.payload.location,
                token:action.payload.sid,
                jobLocation: action.payload.location,
                displayAlertMsg: true,
                isLogin: true,
                pageName: 'login_successfull',
                alertType: "success",
                alertMsg: "Login successful! Please wait...",
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading:false,
                displayAlertMsg:true,
                alertType: "danger",
                alertMsg: action.payload.msg,
            };
        case CHANGE_PAGE:
            return {
                ...state,
                pageName:action.payload.pageName,
            };
        case USER_UPDATE_START:
            return{
                ...state, isLoading:true,
            };
        case USER_UPDATE_SUCCESSFULL:
            return{
                ...state,
                isLoading: false,
                user: action.payload.username,
                lastName: action.payload.lastname,
                userid: action.payload.userid,
                userLocation: action.payload.location,
                displayAlertMsg: true,
                alertType: "success",
                alertMsg: action.payload.msg,
            };
        case USER_UPDATE_ERROR:
            return {
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: action.payload.error,
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                user: action.payload.username,
                lastname: action.payload.lastname,
                userid: action.payload.userid,
                userLocation: action.payload.location,
            };

            case ADD_EXPENDITURE_START:
                return{
                    ...state, isLoading:true,
                };
            case ADD_EXPENDITURE_SUCCESSFULL:
                return{
                    ...state,
                    isLoading: false,
                    itemName: action.payload.itemname,
                    storeName: action.payload.storename, 
                    amountSpent: action.payload.amount, 
                    dateOfExpenditure: action.payload.date,
                    displayAlertMsg: true,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case ADD_EXPENDITURE_ERROR:
                return {
                    ...state,
                    isLoading: false,
                    alertType: "danger",
                    alertMsg: action.payload.error,
                };
            case GET_ALL_GRADES_ERROR: 
            return{
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: action.payload.error,

            };
            case GET_ALL_GRADES_START:
                return{
                    ...state, isLoading:true,
                };
            case GET_ALL_GRADES_SUCCESSFULL:
                return{
                    ...state, 
                    isLoading: false,
                    subjects: action.payload.userData,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case SET_GRADES_ERROR: 
            return{
                isLoading: false,
                    alertType: "danger",
                    alertMsg: action.payload.error,
            };
            case SET_GRADES_START:
            return{
                ...state, isLoading:true,
            };
            case SET_GRADES_SUCCESSFULL:
            return {
                    ...state, 
                    isLoading: false,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case GET_ALL_EXPENDITURE_ERROR: 
            return{
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: action.payload.error,

            };
            case GET_ALL_EXPENDITURE_START:
                return{
                    ...state, isLoading:true,
                };
            case GET_ALL_EXPENDITURE_SUCCESSFULL:
                return{
                    ...state, 
                    isLoading: false,
                    expenses: action.payload.userData,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case GET_ALL_JOBS_ERROR: 
            return{
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: action.payload.error,

            };
            case GET_ALL_JOBS_START:
                return{
                    ...state, isLoading:true,
                };
            case GET_ALL_JOBS_SUCCESSFULL:
                return{
                    ...state, 
                    isLoading: false,
                    jobs: action.payload.userData,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case ADD_JOB_ERROR: 
            return{
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: action.payload.error,

            };
            case ADD_JOB_START:
                return{
                    ...state, isLoading:true,
                };
            case ADD_JOB_SUCCESSFULL:
                return{
                    ...state, 
                    isLoading: false,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                };
            case USER_LOGOUT:
                return{
                        ...state,
                        isLoading: false,
                        displayAlertMsg: false,
                        alertMsg: "",
                        alertType: "",
                        user: '',
                        userid: '',
                        token: "",
                        userLocation: "",
                        lastName:"",
                        showSidebar: false,
                        isEditing: false,
                        editJobId: "",
                        storeName:"",
                        itemName: "", 
                        amountSpent: 0.0, 
                        dateOfExpenditure: "",
                        expenses:[],
                        courseName: "",
                        subjectCode: "",
                        gpa: 0.0,
                        semester: 1,
                        status: "Not Started",
                        subjects: [],
                        position:"",
                        company:"",
                        jobLocation: "",
                        dateOfInterview:"",
                        jobType: "Full-Time",
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
                        credits: 0,
                        isLogin: false,
                      
                };
            case SET_JOB_EDIT:
                const findJob = state.jobs.find(job => job.jobId === action.payload.editJobId);
                const { position, company, jobLocation, jobType, jobStatus, jobId} = findJob;
                return{
                    ...state,
                    position: position,
                    company: company,
                    jobLocation: jobLocation,
                    jobType: jobType,
                    jobStatus: jobStatus,
                    editJobId: jobId,
                    isEditing: true,
                };
            case JOB_EDIT_START:
            return{
                ...state,
                isLoading: true,

            };
            case JOB_EDIT_SUCCESSFULL:
                return{
                    ...state,
                    isLoading: false,
                    alertType: "success",
                    alertMsg: action.payload.msg,
                    isEditing:false,
                };
            case JOB_EDIT_ERROR:
                return{
                ...state,
                isLoading: false,
                alertType: "danger",
                alertMsg: "Error in editing - Please check all values again.",
                };
            case JOB_DELETE_BEGIN:
                return{
                    ...state,
                    isLoading: true,
    
                };
            case JOB_DELETE_COMPLETE:
                return{
                        ...state,
                        isLoading: false,
                        alertType: "success",
                        alertMsg: "Job deleted successfully.",
                };

            case SET_EXPENSE_EDIT:
                const findEXP = state.expenses.find(exp => exp.expId === action.payload.editJobId);
                const { expId, userid, itemName, storeName, amountSpent, dateOfExpenditure} = findEXP;
                return{
                            ...state,
                            storeName: storeName,
                            itemName: itemName,
                            amountSpent: amountSpent,
                            dateOfExpenditure: dateOfExpenditure,
                            editJobId: expId,
                            isEditing: true,
                        };
            case EXPENSE_EDIT_START:
                return{
                    ...state,
                    isLoading: true,
        
            };
            case EXPENSE_EDIT_SUCCESSFULL:
                return{
                    ...state,
                    isLoading: false,
                    alertType: "success",
                        alertMsg: action.payload.msg,
                            isEditing:false,
                        };
                    case EXPENSE_EDIT_ERROR:
                        return{
                        ...state,
                        isLoading: false,
                        alertType: "danger",
                        alertMsg: "Error in editing - Please check all values again.",
                        };
                    case EXPENSE_DELETE_BEGIN:
                        return{
                            ...state,
                            isLoading: true,
            
                        };
                    case EXPENSE_DELETE_COMPLETE:
                            return{
                                ...state,
                                isLoading: false,
                                alertType: "success",
                                alertMsg: "EXpense deleted successfully.",
                            };

                    case SET_GRADE_EDIT:
                                const findSub = state.subjects.find(sub => sub.subId === action.payload.editJobId);
                                const { subId, courseName, subjectCode, gpa, semester, status, credits} = findSub;
                                return{
                                    ...state,
                                    courseName: courseName,
                                    subjectCode: subjectCode,
                                    gpa: gpa,
                                    semester: semester,
                                    status: status,
                                    credits: credits,
                                    editJobId: subId,
                                    isEditing: true,
                                };
                    case GRADE_EDIT_START:
                            return{
                                ...state,
                                isLoading: true,
                
                            };
                    case GRADE_EDIT_SUCCESSFULL:
                                return{
                                    ...state,
                                    isLoading: false,
                                    alertType: "success",
                                    alertMsg: action.payload.msg,
                                    isEditing:false,
                                };
                    case GRADE_EDIT_ERROR:
                                return{
                                ...state,
                                isLoading: false,
                                alertType: "danger",
                                alertMsg: "Error in editing - Please check all values again.",
                                };
                    case GRADE_DELETE_BEGIN:
                                return{
                                    ...state,
                                    isLoading: true,
                    
                                };
                    case GRADE_DELETE_COMPLETE:
                                    return{
                                        ...state,
                                        isLoading: false,
                                        alertType: "success",
                                        alertMsg: "Grade deleted successfully.",
                                    };
                    case VALUES_CLEAR: 
                    return{
                        ...state,
                        isLoading: false,
                        displayAlertMsg: false,
                        alertMsg: "",
                        alertType: "",
                        showSidebar: false,
                        isEditing: false,
                        storeName:"",
                        itemName: "", 
                        amountSpent: 0.0, 
                        dateOfExpenditure: "",
                        courseName: "",
                        subjectCode: "",
                        gpa: 0.0,
                        semester: 1,
                        status: "Not Started",
                        position:"",
                        company:"",
                        jobLocation: "",
                        dateOfInterview:"",
                        jobType: "Full-Time",
                        jobStatus: "Awaiting Response",
                        numOfPages: 1,
                        page: 1,
                        credits: 0,
                        isLogin: false,
                    };
                            
        



    }
}

export default reducer;
