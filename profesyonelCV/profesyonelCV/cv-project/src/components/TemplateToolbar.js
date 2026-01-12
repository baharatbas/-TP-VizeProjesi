import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TemplateToolbar.css';

const TemplateToolbar = ({ selectedTemplate, onTemplateChange, templates }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="template-toolbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="toolbar-container">
        <button 
          className="toolbar-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>🎨</span>
          <span>Şablon: {templates.find(t => t.id === selectedTemplate)?.name}</span>
          <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </button>

        {isExpanded && (
          <motion.div 
            className="template-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {templates.map((template) => (
              <motion.button
                key={template.id}
                className={`template-option ${selectedTemplate === template.id ? 'active' : ''}`}
                onClick={() => {
                  onTemplateChange(template.id);
                  setIsExpanded(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  borderColor: selectedTemplate === template.id ? template.color : '#e5e7eb',
                  background: selectedTemplate === template.id ? `${template.color}10` : 'white'
                }}
              >
                <span className="template-icon">{template.preview}</span>
                <div className="template-info">
                  <span className="template-name-small">{template.name}</span>
                  <span className="template-desc-small">{template.description}</span>
                </div>
                {selectedTemplate === template.id && (
                  <span className="check-mark">✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TemplateToolbar;



