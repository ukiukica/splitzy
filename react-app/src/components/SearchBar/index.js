import React, { useState, useEffect } from 'react'

function SearchBar() {
    const [users, setUsers] = useState([]);
    const [ query, setQuery ] = useState('')

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);

    return (
        <div>
            <input placeholder='Search' onChange={(e) => setQuery(e.target.value)}/>
            {(query) ? users.filter(user => {
                if (user.username.toLowerCase().includes(query.toLowerCase())) {
                    return user
                } else if (user.first_name.toLowerCase().includes(query.toLowerCase())) {
                    return user
                } else if (user.last_name.toLowerCase().includes(query.toLowerCase())) {
                    return user
                }
            }).map((user) => (
                <div key={user.id}>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p>{user.username}</p>
                </div>
            )) : null }
        </div>
    )
}

export default SearchBar
