import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@vitroglass.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@vitroglass.com' && password === 'password') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Use demo: admin@vitroglass.com / password');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-bg-glow1" />
      <div className="login-bg-glow2" />
      
      <div className="glass login-card">
        <div className="login-brand">
          <div className="login-logo">V</div>
          <h1 className="login-title">VitroGlass ERP</h1>
          <p className="login-subtitle">Smart Glass Manufacturing Platform</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Security E-mail</label>
            <input 
              id="login-email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Authentication Password</label>
            <input 
              id="login-password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <div className="login-remember">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Keep workspace active</span>
            </label>
            <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); alert("Use admin@vitroglass.com / password"); }}>Reset pin</a>
          </div>
          
          <button type="submit" className="btn-primary login-submit">Authenticate Terminal</button>
        </form>
        
        <div className="login-demo-creds">
          Demo E-mail: <span>admin@vitroglass.com</span><br/>
          Demo Pin: <span>password</span>
        </div>
      </div>
    </div>
  );
}
