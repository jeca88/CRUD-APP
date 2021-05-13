import React, { useState} from 'react';
import { useLocation, Redirect} from 'react-router-dom';
import './Header.css'
import { Button, AppBar, Toolbar } from '@material-ui/core';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ColorLensRoundedIcon from '@material-ui/icons/ColorLensRounded';



const Header = ({ setTheme }) => {
    const [redirect, setRedirect] = useState(false);
    let location = useLocation();
    
    const logOut = () => {
        localStorage.setItem('userEmail', '');
        setRedirect(true);
    }
    

    return ( 
        <AppBar position="static">
             {redirect && <Redirect to='/login'></Redirect>}
            <Toolbar className='header'>
            <SupervisedUserCircleRoundedIcon style={{ fontSize: 50 }} />
            <Button variant="outlined"  onClick={()=> setTheme(prevState=>!prevState)}>
            <ColorLensRoundedIcon/>   
                Change Theme
            </Button>
            {location.pathname.includes('/login') ? 
            null : <Button onClick={logOut}><ExitToAppRoundedIcon/>Logout</Button>}
            </Toolbar>    
        </AppBar>   
     );
}
 
export default Header;