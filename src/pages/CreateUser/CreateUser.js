import React, { useState, useContext } from 'react';
import './CreateUser.css';
import { Redirect, Link } from "react-router-dom";
import { usersContext } from "../../App";
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { createUser } from '../../userStore/userStore';



const CreateUser = () => {
    const {setUsers} = useContext(usersContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)

    const paperStyle = { padding: 40, width: 300, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue'};
    

    const afterComplete = () => {
        setUsers(null);
        setRedirect(true) 
    }

    const submitCreateForm = () => {
        createUser(name, email, afterComplete)  
    }


    const onSubmit = async (event) => {
        event.preventDefault(); 
        try {
          await submitCreateForm();
          
        } catch (e) {
          alert('Something went wrong! Try again.' );
        }
      }



    return ( 
        <div className='container'>
            <div className="back-cnt">
                <Link to='/users'><ArrowBackRoundedIcon/></Link>
            </div>
            <Grid container item xs={12}>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><CreateRoundedIcon/></Avatar>
                    <h2>Create new User</h2>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField label='Name' placeholder='Enter name' 
                    fullWidth required value={name} type='text' 
                    inputProps={{
                        minLength: 4,
                      }}
                    onChange={(e) => setName(e.target.value)}/> 
                    <TextField label='Username' placeholder='Enter username' 
                    fullWidth required value={email} type='email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => setEmail(e.target.value)}
                    />  
                    <Button type='submit' variant='contained' color='primary' 
                    fullWidth className="submit-btn">
                        Submit
                    </Button> 
                </form>  
            </Paper>
            {redirect && <Redirect to="/users"/>}
            </Grid>
        </div>    
        );
}
 
export default CreateUser;