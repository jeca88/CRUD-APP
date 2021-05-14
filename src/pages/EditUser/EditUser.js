import React, { useState, useContext } from 'react';
import { Redirect, Link } from "react-router-dom";
import { usersContext } from "../../App";
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { editUser } from '../../userStore/userStore';



const EditUser = (props) => {
    const {setUsers} = useContext(usersContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false);
    const useremail = localStorage.getItem('userEmail');


    const paperStyle = { padding: 40, height: 500, width: 300, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue'};
    
     
    const afterComplete = () => {
        setUsers(null);
        setRedirect(true) 
    }

    const editUserForm = () => {
       editUser(props.match.params.id, name, email, afterComplete)      
    }


    const onSubmit = async (event) => {
        event.preventDefault(); 
        try {
          await editUserForm();
        } catch (e) {
          alert('Something went wrong! Try again.' );
        }
    }


    if(useremail === '' || useremail === null) {
        return <Redirect to='/login'></Redirect>
    } else {
    return ( 
        <div className="container">
            <div className="back-cnt">
                <Link to='/users'><ArrowBackRoundedIcon/></Link>
            </div>
            <Grid container item xs={12}>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><EditRoundedIcon/></Avatar>
                    <h2>Edit User</h2>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField label='Name' placeholder='Enter name' 
                    fullWidth required value={name} type='text'
                    inputProps={{
                        minLength: 4,
                      }}
                    onChange={(e) => setName(e.target.value)}
                    /> 
                    <TextField label='Email' placeholder='Enter email' 
                    fullWidth required value={email} type='email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => setEmail(e.target.value)}
                    />  
                    <Button className='submit-btn' type='submit' variant='contained' color='primary' 
                    fullWidth >
                        Submit
                    </Button> 
                </form>  
            </Paper>
            {redirect && <Redirect to="/users"/>}
        </Grid>
        </div>
        );
    }               
}
 
export default EditUser;