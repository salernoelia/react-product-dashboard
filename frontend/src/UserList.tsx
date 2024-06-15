import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string | null;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => setError('Failed to fetch users'));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 ? <p>No users found</p> : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.email} {user.name && `(${user.name})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default UserList;
