import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import AllPosts from './pages/AllPosts';
import { routePath } from './route';
 
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routePath.home} element={<Home/>}></Route>
          <Route path={routePath.create} element={<CreatePost/>} />
          <Route path={routePath.post} element={<AllPosts/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
