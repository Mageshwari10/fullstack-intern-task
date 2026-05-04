import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { Link } from 'react-router-dom';

interface Template {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
  favorited_at?: string;
}

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      
      const data = await response.json();
      setFavorites(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch favorites');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (templateId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/favorites/${templateId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!result.isFavorited) {
        setFavorites(favorites.filter(fav => fav.id !== templateId));
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Failed to remove favorite');
    }
  };

  if (isLoading) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div style={{color: '#666'}}>Loading your favorites...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #f5c6cb'
      }}>
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div style={{color: '#666', fontSize: '18px', marginBottom: '20px'}}>
          No favorite templates yet
        </div>
        <p style={{color: '#999', marginBottom: '30px'}}>
          Start exploring and add templates to your favorites!
        </p>
        <Link to="/" style={{textDecoration: 'none'}}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Browse Templates
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{color: '#333', marginBottom: '20px'}}>
        My Favorites ({favorites.length})
      </h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
        {favorites.map((template) => (
          <div key={template.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{marginBottom: '15px'}}>
              <img 
                src={template.thumbnail_url} 
                alt={template.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              <span style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {template.category}
              </span>
            </div>
            
            <h3 style={{color: '#333', marginBottom: '10px', fontSize: '18px'}}>
              {template.name}
            </h3>
            
            <p style={{color: '#666', fontSize: '14px', marginBottom: '15px', lineHeight: '1.4'}}>
              {template.description}
            </p>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: '12px', color: '#999'}}>
                Favorited on {template.favorited_at ? new Date(template.favorited_at).toLocaleDateString() : 'Recently'}
              </div>
              
              <button
                onClick={() => removeFavorite(template.id)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                ❤️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
