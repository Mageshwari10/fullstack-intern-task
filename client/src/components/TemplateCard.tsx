import React, { useState, useEffect } from 'react';
import { Template } from '../services/api';
import { favoritesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface TemplateCardProps {
  template: Template;
  onFavoriteChange?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkFavoriteStatus();
    }
  }, [template.id, isAuthenticated]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await favoritesAPI.checkFavorite(template.id);
      setIsFavorited(response.data.isFavorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const response = await favoritesAPI.toggleFavorite(template.id);
      setIsFavorited(response.data.isFavorited);
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {template.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {new Date(template.created_at).toLocaleDateString()}
          </div>
          {isAuthenticated && (
            <button
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isFavorited
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-5 h-5"
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
