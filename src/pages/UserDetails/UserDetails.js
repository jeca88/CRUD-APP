import React, { useContext, useEffect, useState} from 'react';
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
import { deleteUser, getUser } from '../../userStore/userStore'


const UserDetails = (props) => {
    const { setUsers } = useContext(usersContext);
    const [ user, setUser] = useState(null);
    const [redirect, setRedirect] = useState(false)
    const useremail = localStorage.getItem('userEmail');

    const paperStyle = { padding: 40, margin: '10px auto', width: '50%' };
    const avatarStyle = { backgroundColor: 'blue', width: 60, height: 60};

    const afterUserFetchComplete = (user) => {
        setUser(user);
    }
    
    const afterCompleteDelete = () => {
        setUsers(null);
        setRedirect(true); 
    }

    useEffect(()=> {
        getUser(props.match.params.id, afterUserFetchComplete);
    },[])
        
    

    const removeUser = () => {
        deleteUser(user.id, afterCompleteDelete)
    }
    
    if(!user) {
        return null;
    }

    if(useremail === '') {
        return <Redirect to='/login'></Redirect>
    } else {
        return ( 
        <div className='container'>
            <Grid container item xs={12}>
                <div className="back-cnt">
                    <Link to='/users'><ArrowBackRoundedIcon/></Link>
                </div> 
            <Paper style={paperStyle}> 
                <Grid align="right">
                    <Link className="edit" to={`/users/${user.id}/edit`}>
                        <Button variant="outlined" color='primary'>
                        <EditRoundedIcon/>Edit</Button>
                    </Link>
                    <Button className="btn-delete" variant="outlined" color='secondary' startIcon={<DeleteIcon />} 
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
            </Grid>
        </div> 
        );
    }
}
 
export default UserDetails;