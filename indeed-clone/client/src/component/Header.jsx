 
 import {AppBar, Toolbar, styled} from '@mui/material';
 

import { routePath } from '../route';
import { Link } from 'react-router-dom';

 const StyledAppBar = styled(AppBar)({
     background: '#2d2d2d',
     height:64,
     '& > div > *': {
         textDecoration: 'none',
         color: 'inherit',
         marginRight: 20,
         fontSize:14
     }
 })

 const Header = () =>{

    const logo = "https://get-staffed.com/wp-content/uploads/2020/07/indeed-logo.png";


     return(
         <StyledAppBar>
             <Toolbar>
                 <Link to={routePath.home}>
                    <img src={logo} alt="logo" style={{width: 95, marginBottom: 6}} />
                 </Link>
                 <Link to={routePath.create}>Post a Job</Link>
                 <Link to={routePath.post}>Find a Job</Link>
             </Toolbar>
        </StyledAppBar>
     );
 }

 export default Header;