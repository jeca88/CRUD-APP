import { useState, useEffect } from 'react';

const FetchData = (url) => {
    const [ users, setUsers ] = useState(null);

    useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setUsers(data);
            
          })
      }, [users === null]);

      return {users, setUsers};  
}



export default FetchData;