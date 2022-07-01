import React, { useState, useEffect } from 'react'

function GetUser({userId}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);

    return users.map((user) => (
        <>
            {(user.id == userId) ? <p>{user.username}</p>
            : null}
        </>
    ))
}

export default GetUser
