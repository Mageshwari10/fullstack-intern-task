import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Template as ApiTemplate, templatesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import TemplateCard from '../components/TemplateCard';

interface Template {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await templatesAPI.getAll(selectedCategory || undefined, searchQuery || undefined);
      setTemplates(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch templates');
      console.error('Error fetching templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await templatesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTemplates();
  };

  const handleFavoriteChange = () => {
    if (selectedCategory === '' && searchQuery === '') {
      fetchTemplates();
    }
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
              {isAuthenticated && (
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Favorites
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Templates</h2>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </form>

          {(selectedCategory || searchQuery) && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {templates.length} templates
                {selectedCategory && ` in "${selectedCategory}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSearchQuery('');
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-xl text-gray-600">Loading templates...</div>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">No templates found</div>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
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

export default Templates;
