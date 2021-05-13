import React, { useContext, useState} from 'react';
import './UserDetails.css';
import { usersContext } from "../../App";
import { Grid, Paper, Avatar, Button} from '@material-ui/core';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteUser} from '../../userStore/userStore'


const UserDetails = (props) => {
    const {users, setUsers} = useContext(usersContext);
    const [redirect, setRedirect] = useState(false)
    const useremail = localStorage.getItem('userEmail');

    const paperStyle = { padding: 40, width: 600, margin: '10px auto', height: 500 };
    const avatarStyle = { backgroundColor: 'blue', width: 60, height: 60};

    
    const findUser = (users) => {
        if(users) {
            return users.find(e => e.id == props.match.params.id);
        }   
    }

    const user =  findUser(users);
    
    const afterComplete = () => {
        setRedirect(true)
        setUsers(null) 
    }


    const removeUser = () => {
        deleteUser(user.id, afterComplete)
    }
    

    if(!user) {
        return null;
    }

    if(useremail == '') {
        return <Redirect to='/login'></Redirect>
    } else {
        return ( 
        <div>
        <div className="back-cnt">
            <Link to='/users'><ArrowBackRoundedIcon/></Link>
        </div> 
        <Paper style={paperStyle}> 
            <Grid align="right">
                <Link className="edit" to={`/users/${user.id}/edit`}>
                    <Button variant="outlined" color='primary'>
                    <EditRoundedIcon/>Edit</Button>
                </Link>
                <Button variant="outlined" color='secondary' startIcon={<DeleteIcon />} 
                onClick={removeUser}>Delete</Button>
            </Grid>
            <Grid align='center'>  
                <h1 className='user-name'>{user.name}</h1>
                <Avatar style={avatarStyle}>{user.name.charAt(0)}</Avatar> 
                <div className='user-info'>
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
                </div>
            </Grid>      
        </Paper> 
        {redirect && <Redirect to="/users"/>}
        </div> 
        );
    }
}
 
export default UserDetails;