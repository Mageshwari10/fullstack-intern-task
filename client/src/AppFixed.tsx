import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { authService } from './services/authService';

function AppFixed() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Template data
  const templates = [
    {
      id: 1,
      name: 'E-commerce Dashboard',
      description: 'A modern dashboard template for e-commerce businesses with analytics, inventory management, and sales tracking.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'Dashboard'
    },
    {
      id: 2,
      name: 'Portfolio Landing',
      description: 'Clean and minimalist portfolio landing page perfect for creative professionals and freelancers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'Landing'
    },
    {
      id: 3,
      name: 'SaaS Admin Panel',
      description: 'Complete admin panel template for SaaS applications with user management and billing features.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Admin'
    },
    {
      id: 4,
      name: 'Blog Template',
      description: 'Responsive blog template with clean typography and optimized reading experience.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop',
      category: 'Blog'
    },
    {
      id: 5,
      name: 'Real Estate Website',
      description: 'Professional real estate website template with property listings and search functionality.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop',
      category: 'Business'
    },
    {
      id: 6,
      name: 'Restaurant Menu',
      description: 'Elegant restaurant website template with online menu and reservation system.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop',
      category: 'Business'
    },
    {
      id: 7,
      name: 'Fitness App',
      description: 'Modern fitness tracking app template with workout plans and progress tracking.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      category: 'Mobile'
    },
    {
      id: 8,
      name: 'Education Platform',
      description: 'Comprehensive online learning platform template with course management and student tracking.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      category: 'Education'
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(templates.map(template => template.category))];

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      window.location.href = '/templates'; // Force redirect
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Starting login process for:', email);
      const response = await authService.login(email, password);
      console.log('Login successful:', response);
      
      // Store auth data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('Auth state updated, redirecting to /templates');
      
      // Force redirect
      setTimeout(() => {
        console.log('Executing redirect to /templates');
        window.location.href = '/templates';
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error as Error).message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/templates'; // Force redirect
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h1 style={{color: '#333', marginBottom: '0'}}>Template Store</h1>
              {isAuthenticated ? (
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <Link to="/templates" style={{textDecoration: 'none'}}>
                    <button style={{padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}>
                      📋 Templates
                    </button>
                  </Link>
                  <Link to="/favorites" style={{textDecoration: 'none'}}>
                    <button style={{padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}>
                      ❤️ Favorites
                    </button>
                  </Link>
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
              console.log('Form submitted');
              const email = (e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement).value;
              const password = (e.currentTarget.querySelector('input[type="password"]') as HTMLInputElement).value;
              
              console.log('Login attempt:', { email, password: '***' });
              try {
                await handleLogin(email, password);
              } catch (error) {
                console.error('Login failed in form:', error);
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
        
        <Route path="/favorites" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h1 style={{color: '#333', marginBottom: '0'}}>My Favorites</h1>
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
            
            <div style={{backgroundColor: '#e7f3ff', color: '#004085', padding: '15px', borderRadius: '8px', border: '1px solid #b8daff', marginBottom: '20px'}}>
              <h3 style={{marginBottom: '10px'}}>💝 Your Favorite Templates</h3>
              <p>Templates you've marked as favorites will appear here for easy access.</p>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', maxWidth: '1200px', margin: '0 auto'}} className="templates-grid">
              <div style={{backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'}}>
                <div style={{width: '100%', height: '160px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '12px', overflow: 'hidden'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop" 
                    alt="E-commerce Dashboard" 
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <h3 style={{color: '#333', marginBottom: '8px', fontSize: '18px', fontWeight: '600'}}>E-commerce Dashboard</h3>
                <p style={{color: '#666', fontSize: '14px', lineHeight: '1.4', marginBottom: '12px'}}>A modern dashboard template for e-commerce businesses with analytics, inventory management, and sales tracking.</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{color: '#007bff', fontSize: '12px', fontWeight: '500'}}>Dashboard</span>
                  <button style={{padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', transition: 'background 0.2s'}}>
                    ❤️ Favorited
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{textAlign: 'center', marginTop: '40px', padding: '40px 20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
              <h3 style={{color: '#666', marginBottom: '10px'}}>No favorites yet?</h3>
              <p style={{color: '#999', marginBottom: '20px'}}>Start exploring templates and mark your favorites!</p>
              <Link to="/templates" style={{textDecoration: 'none'}}>
                <button style={{padding: '12px 24px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'}}>
                  Browse Templates
                </button>
              </Link>
            </div>
          </div>
        } />
        
        <Route path="/templates" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h1 style={{color: '#333', marginBottom: '0'}}>Templates</h1>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <Link to="/favorites" style={{textDecoration: 'none'}}>
                  <button style={{padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}>
                    ❤️ My Favorites
                  </button>
                </Link>
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
            
            {/* Search and Filter Section */}
            <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
              <div style={{display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap'}}>
                <div style={{flex: 1, minWidth: '200px'}}>
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{minWidth: '150px'}}>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  style={{
                    padding: '10px 20px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Clear
                </button>
              </div>
              {searchTerm || selectedCategory !== 'All' ? (
                <div style={{marginTop: '12px', color: '#666', fontSize: '14px'}}>
                  Showing {filteredTemplates.length} of {templates.length} templates
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </div>
              ) : null}
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', maxWidth: '1200px', margin: '0 auto'}} className="templates-grid">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map(template => {
                  const categoryColors: {[key: string]: string} = {
                    'Dashboard': '#007bff',
                    'Landing': '#28a745',
                    'Admin': '#17a2b8',
                    'Blog': '#ffc107',
                    'Business': '#6f42c1',
                    'Mobile': '#e83e8c',
                    'Education': '#20c997'
                  };
                  
                  return (
                    <div key={template.id} style={{backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'}}>
                      <div style={{width: '100%', height: '160px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '12px', overflow: 'hidden'}}>
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                      </div>
                      <h3 style={{color: '#333', marginBottom: '8px', fontSize: '18px', fontWeight: '600'}}>{template.name}</h3>
                      <p style={{color: '#666', fontSize: '14px', lineHeight: '1.4', marginBottom: '12px'}}>{template.description}</p>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{color: categoryColors[template.category] || '#6c757d', fontSize: '12px', fontWeight: '500'}}>{template.category}</span>
                        <button style={{padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', transition: 'background 0.2s'}}>
                          ❤️ Favorite
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
                  <h3 style={{color: '#666', marginBottom: '10px', fontSize: '18px'}}>No templates found</h3>
                  <p style={{color: '#999', marginBottom: '20px'}}>
                    {searchTerm && selectedCategory !== 'All' 
                      ? `No templates matching "${searchTerm}" in ${selectedCategory} category.`
                      : searchTerm 
                      ? `No templates matching "${searchTerm}".`
                      : `No templates in ${selectedCategory} category.`
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    style={{padding: '12px 24px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'}}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        } />
        
        <Route path="/register" element={
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
            <h2 style={{color: '#333', marginBottom: '20px'}}>Create your account</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement).value;
              const password = (e.currentTarget.querySelector('input[type="password"]:first-of-type') as HTMLInputElement).value;
              
              console.log('Registration attempt:', { email, password });
              await handleRegister(email, password);
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
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold'}}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
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

export default AppFixed;
