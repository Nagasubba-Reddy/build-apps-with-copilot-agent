import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { getApiBaseUrl } from './api';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const apiBaseUrl = getApiBaseUrl();
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const environment = codespaceName && codespaceName !== 'undefined' ? `Codespaces (${codespaceName})` : 'Local';

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🏋️ Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          {/* API Status Banner */}
          <div className="alert alert-info" role="alert">
            <strong>API Status:</strong> Connected to {apiBaseUrl} ({environment})
          </div>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <div className="jumbotron">
                  <h1 className="display-4">Welcome to Octofit Tracker</h1>
                  <p className="lead">Track your workouts and compete with teammates</p>
                  <hr className="my-4" />
                  <p>
                    Use the navigation menu to explore users, teams, activities, leaderboard, and workouts.
                  </p>
                  <div className="mt-3">
                    <p className="text-muted">
                      <small>
                        📝 <strong>Configuration:</strong> Make sure <code>VITE_CODESPACE_NAME</code> is set in <code>.env.local</code> when using Codespaces.
                        <br />
                        📍 <strong>Current Environment:</strong> {environment}
                        <br />
                        🌐 <strong>API Base URL:</strong> <code>{apiBaseUrl}</code>
                      </small>
                    </p>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
