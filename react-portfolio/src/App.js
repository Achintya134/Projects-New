import {useState,useEffect} from 'react'
import useMediaQuery from './hooks/useMediaQuery'
import Navbar from './scenes/Navbar'
import MySkills from './scenes/MySkills'
import LineGradient from "./components/LineGradient"
import Landing from './scenes/Landing'
import DotGroup from './scenes/DotGroup'
function App() {
  const [selectedPage, setSelectedPage] = useState('home')
  const isAboveMediumScreen = useMediaQuery(['(min-width: 1050px)'])
  const [isTopOfPage, setIsTopOfPage] = useState(true)

  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY === 0) setIsTopOfPage(true)
      if(window.scrollY !== 0) setIsTopOfPage(false)
    };
  window.addEventListener("scroll",handleScroll);

  },[])
  return (
    <div className="app bg-deep-blue">
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} isTopOfPage={isTopOfPage}/>
      <div className="w-5/6 mx-auto md:h-full">
        {isAboveMediumScreen && (
          <DotGroup 
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}></DotGroup>
        )}
      <Landing setSelectedPage={setSelectedPage}/>
      </div>
      <LineGradient/>
      <div className="w-5/6 mx-auto md:h-full">
        <MySkills/>

      </div>
     
    </div>
  );
}

export default App;
