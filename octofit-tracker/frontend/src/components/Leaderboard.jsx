import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Codespaces-aware API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/leaderboard/');
        setLeaderboard(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="text-muted">No leaderboard data available.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.name || `User ${idx + 1}`}</td>
                <td>{entry.score || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
