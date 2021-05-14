import React, { useState } from 'react';
import './Login.css';
import { Redirect } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const Login = () => {
    const [ email, setEmail] = useState(localStorage.getItem("userEmail") || '');
    const [ redirect, setRedirect] = useState(false);
    const [ errMessage, setErrorMessage] = useState('');

    const paperStyle = { padding: 40, height: 500, width: 300, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue'};
    
    const submitHandler = (event) => {
        event.preventDefault(); 
        const userEmail = localStorage.getItem('userEmail');
        if(userEmail) {
            if(userEmail === email) {
                setRedirect(prevState => !prevState)
            } 
                setErrorMessage("Email is not valid! Please try again...")      
        } else {
            localStorage.setItem("userEmail", email)
            setRedirect(prevState => !prevState)
        }   
    }

   
    return ( 
        <div className="container">
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <form onSubmit={submitHandler}>
                    <TextField label='Email' placeholder='Enter your email' 
                    fullWidth required value={email} type='email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                    onChange={(e) => setEmail(e.target.value)}/>  
                    <Button className='submit-btn' type='submit' variant='contained' color='primary' 
                    fullWidth>
                        Sign In
                    </Button>
                </form>
                {errMessage && <span className="errMessage">{errMessage}</span>}   
            </Paper>
            {redirect && <Redirect to="/users"/>}
        </Grid>
        </div>
        );
}
 
export default Login;