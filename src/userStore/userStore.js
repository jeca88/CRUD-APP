import { useState, useEffect } from 'react';


const host = 'https://609b8ed42b549f00176e3c6a.mockapi.io/';
const usersUrl = host + "users";


export const getUsers = (afterComplete) => {
    fetch(usersUrl)
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
    .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
}

