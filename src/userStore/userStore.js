import { useState, useEffect } from 'react';


const host = 'https://609b8ed42b549f00176e3c6a.mockapi.io/';
const usersUrl = host + "users";


export const GetUsers = () => {
    const [ users, setUsers ] = useState(null);

    useEffect(() => {
        fetch(usersUrl)
          .then(response => response.json())
          .then(data => {
            setUsers(data);
            
          })
      }, [users === null]);
      return {users, setUsers};  
    }



// export const DeleteUser = (id) => {
//   const [redirect, setRedirect] = useState(false)
//         fetch(usersUrl + '/' + id, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(res => res.json())
//         .then(()=>{
//           setRedirect(true);  
//         })
//         // .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
    
    
//     return redirect ;
//   }

