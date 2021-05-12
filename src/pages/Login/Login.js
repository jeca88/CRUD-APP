import React, { useState } from 'react';
import './Login.css';
import { Redirect } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Login = () => {

    const [ email, setEmail] = useState('');
    const [ redirect, setRedirect] = useState(false);
    const [ errMessage, setErrorMessage] = useState('');
    const [ errorText, setErrorText] = useState('')

    const paperStyle = { padding: 40, height: 400, width: 300, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue'};
    const btnStyle = {margin: '40px 0'};

    const submitHandler = () => {
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

    // const onChange = (e) => {
    //     if (e.target.value.match(/^([a-z0-9_-]+).crt$/i)) {
    //       setErrorText({ errorText: '' })
    //     } else {
    //       setErrorText({ errorText: 'Invalid format'})
    //     }
    //   }

    
    return ( 
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter your username' 
                fullWidth required value={email}  
                onChange={(e) => setEmail(e.target.value)}
                />  
                <Button type='submit' variant='contained' color='primary' 
                fullWidth style={btnStyle} onClick={submitHandler}>
                    Sign In
                </Button>
                {errMessage && <span className="errMessage">{errMessage}</span>}   
            </Paper>
            {redirect && <Redirect to="/users"/>}
        </Grid>
     );
}
 
export default Login;