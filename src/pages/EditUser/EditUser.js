import React, { useState, useContext } from 'react';
import { Redirect, Link } from "react-router-dom";
import { usersContext } from "../../App";
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';



const EditUser = (props) => {
    const {setUsers} = useContext(usersContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)


    const paperStyle = { padding: 40, height: 500, width: 300, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue'};
    const btnStyle = {margin: '40px 0'};

    

    const editUserForm = () => {
        const url = "https://609b8ed42b549f00176e3c6a.mockapi.io/users/";
        fetch(url + props.match.params.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
            })
        }).then((res) => res.json())
        .then(() => {
            setUsers(null);
            setRedirect(!redirect)    
        })       
    }


    const onSubmit = async (event) => {
        event.preventDefault(); 
        try {
          await editUserForm();
          alert('You successfully edited user!');
         
        } catch (e) {
          alert('Something went wrong! Try again.' );
        }
      }


    return ( 
        <div>
            <div className="back-cnt">
                <Link to='/users'><ArrowBackRoundedIcon/></Link>
            </div>
            <Grid>
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
                    <TextField label='Username' placeholder='Enter username' 
                    fullWidth required value={email} type='email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => setEmail(e.target.value)}
                    />  
                    <Button type='submit' variant='contained' color='primary' 
                    fullWidth style={btnStyle}>
                        Submit
                    </Button> 
                </form>  
            </Paper>
            {redirect && <Redirect to="/users"/>}
        </Grid>
        </div>
     );
}
 
export default EditUser;