import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('App component mounted. React Router initialized.');
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👤 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5 mb-5">
                  <div className="jumbotron">
                    <h1 className="display-4">🐙 Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      Your ultimate fitness tracking and team competition platform
                    </p>
                    <hr className="my-4" />
                    <p className="mb-4">
                      Track your fitness activities, join teams, monitor workouts, and compete on the leaderboard!
                    </p>
                    <div className="d-flex gap-3">
                      <Link to="/users" className="btn btn-primary btn-lg">
                        👤 Explore Users
                      </Link>
                      <Link to="/leaderboard" className="btn btn-success btn-lg">
                        🏆 View Leaderboard
                      </Link>
                    </div>
                  </div>

                  {/* Features Overview */}
                  <div className="row g-4 mt-5">
                    <div className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">👤 Users</h5>
                          <p className="card-text">Browse all registered users and their profiles</p>
                          <Link to="/users" className="btn btn-sm btn-primary">
                            View Users
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">👥 Teams</h5>
                          <p className="card-text">Join or create teams to compete together</p>
                          <Link to="/teams" className="btn btn-sm btn-primary">
                            View Teams
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">🏃 Activities</h5>
                          <p className="card-text">Track all your fitness activities and progress</p>
                          <Link to="/activities" className="btn btn-sm btn-primary">
                            View Activities
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">💪 Workouts</h5>
                          <p className="card-text">Discover personalized workout suggestions</p>
                          <Link to="/workouts" className="btn btn-sm btn-primary">
                            View Workouts
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">🏆 Leaderboard</h5>
                          <p className="card-text">Compete with others and climb the rankings</p>
                          <Link to="/leaderboard" className="btn btn-sm btn-primary">
                            View Leaderboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-auto">
          <div className="container">
            <p className="mb-2">&copy; 2024 OctoFit Tracker. All rights reserved.</p>
            <small>
              <strong>Backend API:</strong> <code>{apiUrl}</code>
            </small>
            <hr className="my-2" />
            <p className="mb-0">
              Made with 💪 and ❤️ by the OctoFit Team
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
