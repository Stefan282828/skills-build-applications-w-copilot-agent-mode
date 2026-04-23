import React, { useState, useEffect } from 'react';
import { fetchEndpoint } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from /teams/ endpoint');
        const data = await fetchEndpoint('/teams/');
        setTeams(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>⏳ Loading teams...</strong>
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
        <h2 className="mb-4">👥 Teams</h2>
        {teams.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>⚠️ No teams found</strong>
          </div>
        ) : (
          <div className="row g-4">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">🏆 {team.name}</h5>
                    <p className="card-text text-muted">
                      {team.description || <em>No description provided</em>}
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="d-block">
                      <strong>Team ID:</strong> <span className="badge bg-info">{team.id}</span>
                    </small>
                    <small className="d-block mt-2">
                      <strong>Members:</strong> <span className="badge bg-success">{team.members ? team.members.length : 0}</span>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="alert alert-secondary mt-4" role="status">
          <small>
            <strong>📊 Total Teams:</strong> {teams.length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Teams;
