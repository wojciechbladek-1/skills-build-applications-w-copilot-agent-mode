import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Welcome from './components/Welcome';
import Workouts from './components/Workouts';

function App() {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Users', to: '/users' },
    { label: 'Teams', to: '/teams' },
    { label: 'Activities', to: '/activities' },
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'Workouts', to: '/workouts' },
  ];

  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold text-uppercase small app-brand">
            <img alt="OctoFit logo" className="app-brand-logo" src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} />
            <span>OctoFit Tracker</span>
          </span>
          <div className="navbar-nav ms-auto d-flex flex-row flex-wrap gap-1">
            {navItems.map(item => (
              <NavLink
                className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active' : ''}`}
                end={item.to === '/'}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
