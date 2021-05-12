import React, { useContext, useState} from 'react';
import './UserDetails.css';
import { usersContext } from "../../App";
import { Grid, Paper, Avatar, Button} from '@material-ui/core';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const UserDetails = (props) => {
    const {users, setUsers} = useContext(usersContext);
    const [redirect, setRedirect] = useState(false)
    const useremail = localStorage.getItem('userEmail');

    const paperStyle = { padding: 40, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'blue', width: 60, height: 60};

    const findUser = (users) => {
        if(users) {
            return users.find(e => e.id == props.match.params.id);
        }
       
    }
    const user =  findUser(users);

    const deleteUser = () => {
        console.log(user.id)
       
        fetch(`https://609b8ed42b549f00176e3c6a.mockapi.io/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(()=>{
          setRedirect(true)
          setUsers(null)
          
         
        })
        .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
    }
    

     if(!user) {
         return null;
     }

    return ( 
    <div>
      <div className="back-cnt">
      {useremail == null && <Redirect to='/login'></Redirect>}
        <Link to='/users'><ArrowBackRoundedIcon/></Link>
      </div> 
      <Paper style={paperStyle}> 
        <Grid align="right">
            <Link className="edit" to={`/users/${user.id}/edit`}><Button variant="outlined" color='primary'>Edit</Button></Link>
            <Button variant="outlined" color='secondary' startIcon={<DeleteIcon />} onClick={deleteUser}>Delete</Button>
        </Grid>
        <Grid align='center'>  
            <h1>{user.name}</h1>
            <Avatar style={avatarStyle}>{user.name.charAt(0)}</Avatar> 
            <div className='personal-info'>
                <ContactsRoundedIcon/>
                <p>Adress: {user.address}, {user.city}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <p>Website: {user.website}</p>
            </div>  
            <div className='company-info'>
                <BusinessRoundedIcon/>
                <p>Name: {user.company}</p>
            </div> 
        </Grid>      
      </Paper> 
      {redirect && <Redirect to="/users"/>}
    </div> 
    );
}
 
export default UserDetails;