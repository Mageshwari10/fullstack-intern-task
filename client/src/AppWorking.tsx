import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { authService } from './services/authService';

function AppWorking() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await authService.register(email, password);
      console.log('Registration successful:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);
      setRedirect(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);
      setRedirect(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // If redirect is triggered, show Navigate component
  if (redirect) {
    return <Navigate to="/templates" replace />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h1 style={{color: '#333', marginBottom: '0'}}>Template Store</h1>
              {isAuthenticated ? (
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <span style={{color: '#666'}}>Welcome, {user?.email}</span>
                  <button 
                    onClick={handleLogout}
                    style={{padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{display: 'flex', gap: '10px'}}>
                  <Link to="/login" style={{textDecoration: 'none'}}>
                    <button style={{padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      Login
                    </button>
                  </Link>
                  <Link to="/register" style={{textDecoration: 'none'}}>
                    <button style={{padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
            
            {isAuthenticated && (
              <div style={{backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', border: '1px solid #c3e6cb', marginBottom: '20px'}}>
                <h3 style={{marginBottom: '10px'}}>🎉 Login Successful!</h3>
                <p>You have successfully authenticated and can now access all features of Template Store.</p>
              </div>
            )}
            
            {!isAuthenticated && (
              <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px'}}>
                <h2 style={{color: '#333', marginBottom: '15px'}}>Welcome to Mini SaaS Template Store!</h2>
                <p style={{color: '#666', marginBottom: '20px'}}>Please login or register to continue.</p>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                  <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                    <h3 style={{color: '#333', marginBottom: '10px'}}>E-commerce Dashboard</h3>
                    <p style={{color: '#666', fontSize: '14px'}}>A modern dashboard template for e-commerce businesses</p>
                    <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      ❤️ Favorite
                    </button>
                  </div>
                  
                  <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                    <h3 style={{color: '#333', marginBottom: '10px'}}>Portfolio Landing</h3>
                    <p style={{color: '#666', fontSize: '14px'}}>Clean and minimalist portfolio landing page</p>
                    <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      ❤️ Favorite
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        } />
        
        <Route path="/login" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
            <h2 style={{color: '#333', marginBottom: '20px'}}>Sign in to your account</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = (e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement).value;
              const password = (e.currentTarget.querySelector('input[type="password"]') as HTMLInputElement).value;
              
              try {
                await handleLogin(email, password);
              } catch (error) {
                alert('Login failed: ' + (error as Error).message);
              }
            }} style={{maxWidth: '400px', margin: '0 auto'}}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Sign in
              </button>
            </form>
            
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <Link to="/" style={{color: '#007bff', textDecoration: 'none'}}>
                Back to Home
              </Link>
            </div>
          </div>
        } />
        
        <Route path="/templates" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h1 style={{color: '#333', marginBottom: '0'}}>Templates</h1>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <span style={{color: '#666'}}>Welcome, {user?.email}</span>
                <button 
                  onClick={handleLogout}
                  style={{padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                >
                  Logout
                </button>
              </div>
            </div>
            
            <div style={{backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', border: '1px solid #c3e6cb', marginBottom: '20px'}}>
              <h3 style={{marginBottom: '10px'}}>🎉 Login Successful!</h3>
              <p>You have successfully authenticated and can now access all features of Template Store.</p>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
              <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#333', marginBottom: '10px'}}>E-commerce Dashboard</h3>
                <p style={{color: '#666', fontSize: '14px'}}>A modern dashboard template for e-commerce businesses</p>
                <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                  ❤️ Favorite
                </button>
              </div>
              
              <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#333', marginBottom: '10px'}}>Portfolio Landing</h3>
                <p style={{color: '#666', fontSize: '14px'}}>Clean and minimalist portfolio landing page</p>
                <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                  ❤️ Favorite
                </button>
              </div>
              
              <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#333', marginBottom: '10px'}}>Blog Template</h3>
                <p style={{color: '#666', fontSize: '14px'}}>Modern blog template with clean typography</p>
                <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                  ❤️ Favorite
                </button>
              </div>
              
              <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#333', marginBottom: '10px'}}>SaaS Landing</h3>
                <p style={{color: '#666', fontSize: '14px'}}>Professional landing page for SaaS products</p>
                <button style={{marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                  ❤️ Favorite
                </button>
              </div>
            </div>
          </div>
        } />
        
        <Route path="/register" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
            <h2 style={{color: '#333', marginBottom: '20px'}}>Create your account</h2>
            <form onSubmit={(e) => { e.preventDefault(); }} style={{maxWidth: '400px', margin: '0 auto'}}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Email address</label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Password</label>
                <input
                  type="password"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Confirm Password</label>
                <input
                  type="password"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Create account
              </button>
            </form>
            
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <Link to="/" style={{color: '#007bff', textDecoration: 'none'}}>
                Back to Home
              </Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default AppWorking;
