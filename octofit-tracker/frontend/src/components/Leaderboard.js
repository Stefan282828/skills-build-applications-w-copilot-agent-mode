import React, { useState, useEffect } from 'react';
import { fetchEndpoint } from '../utils/api';

function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        console.log('Fetching leaderboards from /leaderboards/ endpoint. Codespaces pattern: -8000.app.github.dev/api/leaderboards');
        const data = await fetchEndpoint('/leaderboards/');
        setLeaderboards(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch leaderboards:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <strong>⏳ Loading leaderboard...</strong>
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
        <h2 className="mb-4">🏆 Leaderboard</h2>
        {leaderboards.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>⚠️ No leaderboard data found</strong>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User / Team</th>
                  <th scope="col">Score</th>
                  <th scope="col">Points</th>
                  <th scope="col">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      {index === 0 ? (
                        <span className="badge bg-warning text-dark fs-6">🥇 1st</span>
                      ) : index === 1 ? (
                        <span className="badge bg-secondary fs-6">🥈 2nd</span>
                      ) : index === 2 ? (
                        <span className="badge bg-danger fs-6">🥉 3rd</span>
                      ) : (
                        <span className="badge bg-primary">{index + 1}</span>
                      )}
                    </td>
                    <td>
                      <strong>
                        {entry.user ? `👤 ${entry.user.username}` : entry.team ? `👥 ${entry.team.name}` : 'Unknown'}
                      </strong>
                    </td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.score || 0}</span>
                    </td>
                    <td>
                      <span className="badge bg-info fs-6">{entry.points || 0}</span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {entry.updated_at ? new Date(entry.updated_at).toLocaleDateString() : 'N/A'}
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="alert alert-secondary mt-4" role="status">
          <small>
            <strong>📊 Total Entries:</strong> {leaderboards.length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
