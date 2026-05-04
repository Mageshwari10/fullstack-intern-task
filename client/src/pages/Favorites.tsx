import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Template, favoritesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import TemplateCard from '../components/TemplateCard';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { logout } = useAuth();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await favoritesAPI.getFavorites();
      setFavorites(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteChange = () => {
    fetchFavorites();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Template Store</h1>
            </div>
            <nav className="flex space-x-4">
              <Link
                to="/templates"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Templates
              </Link>
              <Link
                to="/favorites"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-500"
              >
                My Favorites
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Favorite Templates</h2>
          <p className="text-gray-600">
            {favorites.length} template{favorites.length !== 1 ? 's' : ''} favorited
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-xl text-gray-600">Loading your favorites...</div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg mb-4">No favorite templates yet</div>
            <p className="text-gray-500 mb-6">
              Start exploring and add templates to your favorites!
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
