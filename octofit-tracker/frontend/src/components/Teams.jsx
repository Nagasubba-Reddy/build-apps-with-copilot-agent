import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Codespaces-aware API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/teams/');
        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found.</p>
      ) : (
        <div className="row">
          {teams.map((team, idx) => (
            <div key={idx} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || `Team ${idx + 1}`}</h5>
                  <p className="card-text">Members: {team.members || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
