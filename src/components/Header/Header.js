import React from 'react';
import './Header.css'
import { Button, AppBar, Toolbar } from '@material-ui/core';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';

const Header = ({darkMode, setTheme}) => {

    

    return ( 
        
        <AppBar position="static">
            <Toolbar className='header'>
            <SupervisedUserCircleRoundedIcon style={{ fontSize: 50 }} />
            <Button variant="outlined"  onClick={()=> setTheme(prevState=>!prevState)}>Change Theme</Button>
            </Toolbar>
        </AppBar>
       
       
     );
}
 
export default Header;