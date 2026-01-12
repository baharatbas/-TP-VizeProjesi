import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HomePage.css';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: 'Hızlı Oluşturma',
      description: 'Sadece 5 dakikada profesyonel CV\'nizi hazırlayın',
      color: '#667eea'
    },
    {
      icon: '🎨',
      title: 'Modern Tasarım',
      description: 'İşverenlerin dikkatini çeken profesyonel şablonlar',
      color: '#764ba2'
    },
    {
      icon: '🤖',
      title: 'AI Destekli',
      description: 'Yapay zeka asistanımız size rehberlik eder',
      color: '#f093fb'
    },
    {
      icon: '📄',
      title: 'PDF İndirme',
      description: 'CV\'nizi PDF formatında indirip paylaşın',
      color: '#4facfe'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Kullanıcı' },
    { number: '100K+', label: 'CV Oluşturuldu' },
    { number: '95%', label: 'Memnuniyet' },
    { number: '24/7', label: 'Destek' }
  ];

  return (
    <div className="homepage-container">
      {/* Animated Background */}
      <div className="animated-background">
        <motion.div
          className="floating-shape shape-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="floating-shape shape-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="floating-shape shape-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        style={{ y, opacity }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Profesyonel CV'nizi
              <span className="gradient-text"> Saniyeler İçinde</span>
              <br />Oluşturun
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Yapay zeka destekli asistanımızla tanışın ve kariyerinizde bir adım öne geçin.
              Modern tasarım ve profesyonel formatlarla işverenlerin dikkatini çekin.
              Ücretsiz, hızlı ve kolay - hemen başlayın!
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/chatbot">
                <motion.button
                  className="cta-button primary"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Hemen Başla</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  className="cta-button secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Daha Fazla Bilgi
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="cv-preview-card">
              <div className="cv-card-header"></div>
              <div className="cv-card-body">
                <div className="cv-card-line"></div>
                <div className="cv-card-line short"></div>
                <div className="cv-card-line"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
          <p className="section-subtitle">Profesyonel CV oluşturma deneyiminin tüm avantajları</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="feature-icon"
                style={{ background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="emoji-icon">{feature.icon}</span>
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Nasıl Çalışır?</h2>
          <p className="section-subtitle">3 basit adımda profesyonel CV'nizi oluşturun</p>
        </motion.div>

        <div className="steps-container">
          {[
            { step: '1', title: 'Soruları Cevaplayın', description: 'AI asistanımız size sorular sorar, siz cevaplarsınız' },
            { step: '2', title: 'CV\'niz Oluşturulur', description: 'Cevaplarınız otomatik olarak profesyonel CV formatına dönüştürülür' },
            { step: '3', title: 'İndirin ve Paylaşın', description: 'CV\'nizi PDF olarak indirin ve iş başvurularınızda kullanın' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="step-number">{item.step}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-description">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2 className="cta-title">Hazır mısınız?</h2>
          <p className="cta-description">Profesyonel CV'nizi oluşturmaya başlayın</p>
          <Link to="/chatbot">
            <motion.button
              className="cta-button large"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Ücretsiz Başla
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
