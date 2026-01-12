import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';
import CVPreview from './components/CVPreview';
import TemplateSelector from './components/TemplateSelector';
import TemplateToolbar from './components/TemplateToolbar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import './App.css';

function App() {
  // Test verileri - CV önizleme ekranını görmek için
  const testCvData = {
    fullName: 'AHMET ILTER',
    jobTitle: 'CYBER SECURITY',
    email: 'Jwgnagato@gmail.com',
    phone: '05331334303',
    location: 'Sivas',
    linkedin: 'https://linkedin.com/in/ahmetilter',
    portfolio: 'https://www.ahmetilter.com',
    summary: '5 yıllık yazılım geliştirme deneyimine sahip, React ve Node.js konularında uzmanlaşmış, fintech ve e-ticaret sektörlerinde çalışmış. Siber güvenlik alanında uzmanlaşmış, modern web teknolojileri konusunda deneyimli bir yazılım geliştiricisi.',
    education1: 'Atatürk Üniversitesi, Bilgisayar Programcılığı, 2018 - 2022',
    education2: 'hayır',
    education3: 'hayır',
    experience1_company: 'Ilter Ltd.',
    experience1_position: 'CYBER SECURITY UZMANI',
    experience1_duration: 'Ocak 2020 - Aralık 2022',
    experience1_description: 'Siber güvenlik alanında projeler geliştirdi, güvenlik açıklarını tespit etti ve çözümler üretti. Ekip yönetimi yaptı, müşteri güvenliğini sağladı.',
    experience2_company: 'hayır',
    experience2_position: 'hayır',
    experience2_duration: 'hayır',
    experience2_description: 'hayır',
    experience3_company: 'hayır',
    experience3_position: 'hayır',
    experience3_duration: 'hayır',
    experience3_description: 'hayır',
    skills_technical: 'JavaScript, React, Node.js, Python, SQL, Git, Cyber Security, Network Security',
    skills_soft: 'Proje Yönetimi, Liderlik, İletişim, Problem Çözme',
    languages: 'İngilizce (İleri), Almanca (Orta)',
    certifications: 'AWS Certified Solutions Architect (2021), CEH Certified Ethical Hacker (2020)',
    projects: 'E-ticaret platformu güvenlik altyapısı, Siber güvenlik danışmanlık projeleri',
    achievements: 'En İyi Güvenlik Projesi Ödülü 2021, Hackathon 1.liği 2020',
    interests: 'Siber güvenlik araştırmaları, Açık kaynak projeler, Kitap okuma',
    references: 'Ahmet Yılmaz - Proje Müdürü - +90 555 123 45 67, Ayşe Demir - İK Uzmanı - ayse@email.com',
    photo: 'hayır'
  };

  const [cvData, setCvData] = useState({}); // Test verileriyle durdur.
  const [isCvReady, setIsCvReady] = useState(false); // Direkt CV önizleme ekranını durdur.

  //const [cvData, setCvData] = useState(testCvData); // Test verileriyle başlat
  //const [isCvReady, setIsCvReady] = useState(true); // Direkt CV önizleme ekranını göster
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showTemplateSelector, setShowTemplateSelector] = useState(true); // İlk başta şablon seçiciyi göster

  const handleCvReady = (data) => {
    setCvData(data);
    setIsCvReady(true);
    setShowTemplateSelector(true); // CV hazır olduğunda şablon seçiciyi göster
  };

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'İki sütunlu, modern ve profesyonel tasarım',
      preview: '🎨',
      color: '#667eea'
    },
    {
      id: 'classic',
      name: 'Klasik',
      description: 'Geleneksel, tek sütunlu düzen',
      preview: '📄',
      color: '#2c3e50'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Sade ve temiz, odaklanmış tasarım',
      preview: '✨',
      color: '#48bb78'
    },
    {
      id: 'creative',
      name: 'Yaratıcı',
      description: 'Renkli ve dinamik, yaratıcı sektörler için',
      preview: '🌈',
      color: '#f093fb'
    },
    {
      id: 'executive',
      name: 'Yönetici',
      description: 'Kurumsal ve güçlü, üst düzey pozisyonlar için',
      preview: '💼',
      color: '#1a1a2e'
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowTemplateSelector(false);
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const ChatbotWrapper = () => {
    if (!isCvReady) {
      return <Chatbot onCvReady={handleCvReady} />;
    }
    
    if (showTemplateSelector) {
      return (
        <>
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            templates={templates}
          />
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <button 
              onClick={() => setShowTemplateSelector(false)}
              style={{
                padding: '12px 30px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              CV'yi Görüntüle
            </button>
          </div>
        </>
      );
    }
    
    return (
      <>
        <TemplateToolbar 
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          templates={templates}
        />
        <CVPreview cvData={cvData} template={selectedTemplate} />
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chatbot" element={<ChatbotWrapper />} />
          </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
