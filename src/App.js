import './App.css';
import React, { useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import EditUser from './pages/EditUser/EditUser';
import UserDetails from './pages/UserDetails/UserDetails';
import UsersList from './pages/UsersList/UsersList';
import CreateUser from './pages/CreateUser/CreateUser';
import { Paper } from '@material-ui/core';
import {getUsers} from './userStore/userStore'


export const usersContext = React.createContext({});
const { Provider: UsersProvider } = usersContext;


function App() {
  const [ users, setUsers ] = useState(null);
  const [ darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const afterComplete = (users) => {
    setUsers(users);
  }
  
  useEffect(()=> {
    getUsers(afterComplete);
  }, [users === null])


  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div className="App">
          <UsersProvider value={{users, setUsers}}>
            <Header setTheme={darkMode, setDarkMode}/>
            <Switch>
                  <Route exact path="/"  component={UsersList} />
                  <Route exact path="/users"  component={UsersList} />  
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/users/create" component={CreateUser} />
                  <Route exact path="/users/:id" component={UserDetails} />
                  <Route path="/users/:id/edit" component={EditUser} />  
              </Switch>
            </UsersProvider>
        </div>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
