import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';

interface Template {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
}

interface TemplateListProps {
  isAuthenticated: boolean;
  user: any;
}

const TemplateList: React.FC<TemplateListProps> = ({ isAuthenticated, user }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Extract categories from templates
  useEffect(() => {
    if (templates.length > 0) {
      const uniqueCategories = Array.from(new Set(templates.map(t => t.category)));
      setCategories(uniqueCategories);
    }
  }, [templates]);

  // Filter templates based on search and category
  useEffect(() => {
    let filtered = templates;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`);
      const data = await response.json();
      setTemplates(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch templates');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified version without favorites for now
  const handleTemplateClick = (template: Template) => {
    alert(`Template: ${template.name}\n\nThis would navigate to template details in production!`);
  };

  if (isLoading) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div style={{color: '#666'}}>Loading templates...</div>
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{flex: '1', minWidth: '200px'}}>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          
          <div style={{minWidth: '150px'}}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
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
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔍 Search
          </button>
          
          {(searchQuery || selectedCategory) && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✖ Clear
            </button>
          )}
        </form>
        
        {(searchQuery || selectedCategory) && (
          <div style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory && ` in category "${selectedCategory}"`}
          </div>
        )}
      </div>

      {/* Template Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
        {filteredTemplates.map((template) => (
        <div 
          key={template.id} 
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onClick={() => handleTemplateClick(template)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
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
              {new Date(template.created_at).toLocaleDateString()}
            </div>
            
            {isAuthenticated && (
              <button
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                title="Add to favorites"
              >
                ❤️ Favorite
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TemplateList;
