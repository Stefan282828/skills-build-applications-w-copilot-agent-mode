import React, { useState, useEffect } from 'react';
import { fetchEndpoint } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from /workouts/ endpoint');
        const data = await fetchEndpoint('/workouts/');
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>⏳ Loading workouts...</strong>
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
        <h2 className="mb-4">💪 Workouts</h2>
        {workouts.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>⚠️ No workouts found</strong>
          </div>
        ) : (
          <div className="row g-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">🏋️ {workout.name || 'Workout'}</h5>
                    <p className="card-text">
                      <strong>Type:</strong>{' '}
                      <span className="badge bg-info">{workout.type || 'N/A'}</span>
                    </p>
                    <p className="card-text">
                      <strong>Duration:</strong>{' '}
                      <span className="badge bg-success">
                        {workout.duration ? `${workout.duration} min` : 'N/A'}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Intensity:</strong>{' '}
                      <span className="badge bg-warning">{workout.intensity || 'N/A'}</span>
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong> <span className="text-muted">{workout.date ? new Date(workout.date).toLocaleDateString() : 'N/A'}</span>
                    </p>
                  </div>
                  <div className="card-footer">
                    <small>
                      <strong>Workout ID:</strong> <span className="badge bg-secondary">{workout.id}</span>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="alert alert-secondary mt-4" role="status">
          <small>
            <strong>📊 Total Workouts:</strong> {workouts.length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
