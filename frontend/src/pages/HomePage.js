import React from 'react';
import {piggy}  from '../utils/Icons'
import '../index.css'

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Money Flow Logo" />
          <h1>Money Flow</h1>
        </div>
        <div className="nav-buttons">
          <button>Login</button>
          <button>Register</button>
        </div>
      </header>

      <section className="static-content">
        <h2>Welcome to Money Flow</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
          libero eu urna aliquet vestibulum.
        </p>
      </section>

      <section className="card-container">
        <div className="card">
          <div className="card-icon">
            {piggy}
          </div>
          <h3>Track Expenses</h3>
          <p>Monitor your spending habits and financial transactions.</p>
        </div>
        <div className="card">
          <div className="card-icon">
            {piggy}
          </div>
          <h3>Visualize Data</h3>
          <p>View charts and graphs for a clear overview of your finances.</p>
        </div>
        <div className="card">
          <div className="card-icon">
            {piggy}
          </div>
          <h3>Manage Budget</h3>
          <p>Keep track of your budget and allocate funds wisely.</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2023 Money Flow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
