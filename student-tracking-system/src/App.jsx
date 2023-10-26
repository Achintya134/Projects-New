import './layout/index.css';
import {useState, useEffect, useReducer} from 'react';
import FrontPage from './FrontPage';
import Login from './pages/Login';
import SharedLayout from './pages/SharedLayout';
import { useContextApp } from "./context/contextApp";
import ErrorPage from './pages/ErrorPage';



function App() {
  const [page,currentPage] = useState('');
  //const [login,setLogin] =useState(false)
  
  const { pageName, userid, isLogin } = useContextApp();
  

   useEffect(() => {
    // Update the document title using the browser API
    if(pageName === 'login_successfull' || pageName === 'page1')
    {
      currentPage(pageName);
    }
    else if(isLogin === false)
    {
      currentPage("page1");
    }
    else if(pageName !== 'Profile' && pageName !== 'manageGrades' && pageName !== 'jobApplications' && pageName !== 'ExpenditureTracking')
    {
      currentPage('Error');
    }

  },[pageName]);
  

  return (
    <div className="App">
  
    {/* Login/Register Page*/}
    {page === 'page1' && (<Login></Login>)}
    
    {/* OnLogin*/}
    { page === 'login_successfull' && (<SharedLayout userid={userid}/>)}

    {/* OnError*/}
    { page === 'Error' && (<ErrorPage></ErrorPage>)}

    </div>
  );
}

export default App;
