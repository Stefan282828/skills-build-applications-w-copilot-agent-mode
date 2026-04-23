import React, { useState, useEffect } from 'react';
import { fetchEndpoint } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from /activities/ endpoint. Codespaces pattern: -8000.app.github.dev/api/activities');
        const data = await fetchEndpoint('/activities/');
        setActivities(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>⏳ Loading activities...</strong>
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
        <h2 className="mb-4">🏃 Activities</h2>
        {activities.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>⚠️ No activities found</strong>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td>
                      <span className="badge bg-primary">{index + 1}</span>
                    </td>
                    <td>
                      <strong>{activity.name || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{activity.type || 'N/A'}</span>
                    </td>
                    <td>{activity.duration ? `${activity.duration} min` : <em className="text-muted">-</em>}</td>
                    <td>
                      <span className="badge bg-success">{activity.calories_burned || 'N/A'}</span>
                    </td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : <em className="text-muted">-</em>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="alert alert-secondary mt-4" role="status">
          <small>
            <strong>📊 Total Activities:</strong> {activities.length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Activities;
