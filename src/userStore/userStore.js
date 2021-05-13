const host = 'https://609b8ed42b549f00176e3c6a.mockapi.io/';
const usersUrl = host + "users";


export const getUsers = (afterComplete) => {
    fetch(usersUrl)
    .then(response => response.json())
    .then(data => afterComplete(data))
}

export const getUser = (id, afterComplete) => {
    fetch(usersUrl + '/' + id)
    .then(response => response.json())
    .then(data => afterComplete(data))
}


export const deleteUser = (id, afterComplete) => {
    fetch(usersUrl + '/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    .then(res => res.json())
    .then(()=>{
        afterComplete();
    })
    .catch((error) => alert('Oops! Something went wrong...'))
}

export const editUser = (id,name, email, afterComplete) => {
    fetch(usersUrl + '/' + id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
      })
    })
    .then((res) => res.json())
    .then(() => {
        afterComplete();    
    })     
}


export const createUser = ( name, email, afterComplete) => {
    fetch(usersUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({
            name: name,
            email: email,
        })
    })
    .then((res) => res.json())
    .then(() => {
      afterComplete();
    })   
}
