import React, { useEffect, useState } from 'react'

function Github() {
const [data, setData] = useState({}); // top-level

useEffect(() => {
    fetch('https://api.github.com/users/manishtiwari-45')
    .then(response => response.json())
    .then(userData => {
        console.log(userData);
        setData(userData);
    });
}, []);

return (
    <div className="text-center m-4 bg-gray-200 p-4 rounded">
    <h2 className="text-lg font-bold">Github Followers: {data.followers}</h2>
    {data.avatar_url && (
        <img 
        src={data.avatar_url} 
        alt="GitHub Profile" 
        width={300} 
        className="mx-auto mt-2 rounded-full shadow-md"
        />
    )}
    </div>
);
}

export default Github;
