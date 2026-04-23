import React, { useState, useEffect } from 'react';
import { fetchEndpoint } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from /users/ endpoint');
        const data = await fetchEndpoint('/users/');
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>⏳ Loading users...</strong>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>❌ Error: </strong>{error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="data-wrapper">
        <h2 className="mb-4">👥 Users</h2>
        {users.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>⚠️ No users found</strong>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>
                      <span className="badge bg-primary">{index + 1}</span>
                    </td>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.first_name || <em className="text-muted">-</em>}</td>
                    <td>{user.last_name || <em className="text-muted">-</em>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="alert alert-secondary mt-3" role="status">
          <small>
            <strong>📊 Total Users:</strong> {users.length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Users;
