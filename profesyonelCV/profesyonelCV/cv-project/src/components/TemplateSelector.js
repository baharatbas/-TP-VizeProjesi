import React from 'react';
import { motion } from 'framer-motion';
import './TemplateSelector.css';

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, templates }) => {

  return (
    <motion.div 
      className="template-selector"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="template-selector-header">
        <h2>CV Şablonu Seçin</h2>
        <p>İstediğiniz şablonu seçerek CV'nizin görünümünü değiştirebilirsiniz</p>
      </div>
      
      <div className="templates-grid">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onTemplateSelect(template.id)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderColor: selectedTemplate === template.id ? template.color : '#e5e7eb' }}
          >
            <div className="template-preview-icon" style={{ background: `${template.color}15` }}>
              <span className="template-emoji">{template.preview}</span>
            </div>
            <h3 className="template-name">{template.name}</h3>
            <p className="template-description">{template.description}</p>
            {selectedTemplate === template.id && (
              <motion.div
                className="selected-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ background: template.color }}
              >
                ✓ Seçili
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;

