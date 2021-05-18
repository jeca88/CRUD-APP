const host = 'https://609b8ed42b549f00176e3c6a.mockapi.io/';
const usersUrl = host + "users";


export const getUsers = (afterComplete) => {
    fetch(usersUrl)
    .then(response => response.json())
    .then(data => afterComplete(data))
    .catch((error) => alert('Oops! Something went wrong...Failed to fetch.'))
}

export const getUser = (id, afterComplete) => {
    fetch(usersUrl + '/' + id)
    .then(response => response.json())
    .then(data => afterComplete(data))
    .catch((error) => alert('Oops! Something went wrong...Failed to fetch.'))
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
    .catch((error) => alert('Oops! Something went wrong...Failed to fetch.'))
}

export const editUser = (id, user, afterComplete) => {
    fetch(usersUrl + '/' + id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          website: user.website
      })
    })
    .then((res) => res.json())
    .then(() => {
        afterComplete();    
    })
    .catch((error) => alert('Oops! Something went wrong...Failed to fetch.'))     
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
    .catch((error) => alert('Oops! Something went wrong...Failed to fetch.'))   
}
