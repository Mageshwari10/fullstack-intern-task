import React from 'react';

interface Template {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
}

interface TemplateDetailModalProps {
  template: Template | null;
  onClose: () => void;
}

const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({ template, onClose }) => {
  if (!template) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            padding: '5px'
          }}
        >
          ×
        </button>

        {/* Template Image */}
        <div style={{marginBottom: '20px'}}>
          <img 
            src={template.thumbnail_url} 
            alt={template.name}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Template Info */}
        <div style={{marginBottom: '20px'}}>
          <span style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '10px'
          }}>
            {template.category}
          </span>
        </div>

        <h2 style={{color: '#333', marginBottom: '15px', fontSize: '24px'}}>
          {template.name}
        </h2>
        
        <p style={{color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px'}}>
          {template.description}
        </p>

        {/* Template Details */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#666'
        }}>
          <div style={{marginBottom: '8px'}}>
            <strong>Template ID:</strong> {template.id}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Category:</strong> {template.category}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Created:</strong> {new Date(template.created_at).toLocaleDateString()}
          </div>
          <div>
            <strong>Status:</strong> 
            <span style={{color: '#28a745', marginLeft: '5px'}}>✓ Available</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              flex: '1'
            }}
          >
            Close
          </button>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              flex: '1'
            }}
          >
            🚀 Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailModal;
