import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="container py-4 py-lg-5">
      <div className="card border-0 shadow-sm overflow-hidden app-hero-card">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
              <p className="lead text-secondary mb-4">
                Track activities, build teams, climb the leaderboard, and discover personalized workout plans.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Link className="btn btn-primary btn-lg" to="/users">
                  Explore Users
                </Link>
                <Link className="btn btn-outline-primary btn-lg" to="/activities">
                  View Activities
                </Link>
                <button className="btn btn-outline-dark btn-lg" onClick={() => setShowModal(true)} type="button">
                  Learn More
                </button>
              </div>
              <Link className="link-primary fw-semibold" to="/leaderboard">
                Jump to the Leaderboard
              </Link>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h2 className="h4 mb-3">Quick Access</h2>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      Users
                      <Link className="btn btn-sm btn-outline-secondary" to="/users">
                        Open
                      </Link>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      Teams
                      <Link className="btn btn-sm btn-outline-secondary" to="/teams">
                        Open
                      </Link>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      Workouts
                      <Link className="btn btn-sm btn-outline-secondary" to="/workouts">
                        Open
                      </Link>
                    </li>
                  </ul>

                  <form>
                    <label className="form-label fw-semibold" htmlFor="welcomeEmail">
                      Weekly Tips
                    </label>
                    <div className="input-group">
                      <input className="form-control" id="welcomeEmail" placeholder="name@example.com" type="email" />
                      <button className="btn btn-primary" type="submit">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">OctoFit Highlights</h5>
                  <button aria-label="Close" className="btn-close" onClick={() => setShowModal(false)} type="button" />
                </div>
                <div className="modal-body">
                  <p className="mb-2">Stay consistent with a clean dashboard designed for everyday training.</p>
                  <p className="mb-0">Use the navigation menu to browse users, teams, activities, leaderboard, and workouts.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />
        </>
      )}
    </section>
  );
}

export default Welcome;
