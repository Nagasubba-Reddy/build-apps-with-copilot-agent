import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/activities/');
        setActivities(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading activities...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity, idx) => (
            <div key={idx} className="list-group-item">
              <h5 className="mb-1">{activity.type || `Activity ${idx + 1}`}</h5>
              <p className="mb-1">Duration: {activity.duration || 'N/A'}</p>
              <small className="text-muted">Date: {activity.date || new Date().toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
