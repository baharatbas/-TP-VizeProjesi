import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: '📍',
      title: 'Adres',
      content: 'İstanbul, Türkiye',
      description: 'Ofisimiz hafta içi 09:00 - 18:00 arası açıktır',
      color: '#667eea'
    },
    {
      icon: '📞',
      title: 'Telefon',
      content: '+90 (555) 123 45 67',
      description: 'Pazartesi - Cuma: 09:00 - 18:00',
      color: '#764ba2'
    },
    {
      icon: '✉️',
      title: 'E-posta',
      content: 'info@profesyonelcv.com',
      description: '24 saat içinde yanıt garantisi',
      color: '#f093fb'
    },
    {
      icon: '💬',
      title: 'Canlı Destek',
      content: '7/24 Online',
      description: 'Anında yardım alın',
      color: '#4facfe'
    }
  ];

  const faqs = [
    {
      question: 'CV oluşturma ücretsiz mi?',
      answer: 'Evet, temel CV oluşturma hizmetimiz tamamen ücretsizdir. İsterseniz premium özellikler için yükseltme yapabilirsiniz.'
    },
    {
      question: 'CV\'mi PDF olarak indirebilir miyim?',
      answer: 'Evet, oluşturduğunuz CV\'yi PDF formatında indirebilir ve istediğiniz yerde kullanabilirsiniz.'
    },
    {
      question: 'Verilerim güvende mi?',
      answer: 'Kesinlikle. Tüm verileriniz şifrelenmiş olarak saklanır ve sadece siz erişebilirsiniz.'
    },
    {
      question: 'CV şablonlarını değiştirebilir miyim?',
      answer: 'Evet, oluşturduğunuz CV\'nin tasarımını ve formatını istediğiniz zaman değiştirebilirsiniz.'
    }
  ];

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            İletişim
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sorularınız, önerileriniz veya destek için bize ulaşın
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Bize Ulaşın</h2>
            <p className="section-subtitle">Size en uygun iletişim yöntemini seçin</p>
          </motion.div>

          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="contact-method-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ borderTopColor: method.color }}
              >
                <div className="method-icon" style={{ background: `${method.color}15` }}>
                  <span className="emoji-icon">{method.icon}</span>
                </div>
                <h3 className="method-title">{method.title}</h3>
                <p className="method-content">{method.content}</p>
                <p className="method-description">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <motion.div
              className="form-header"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="form-title">Mesaj Gönderin</h2>
              <p className="form-subtitle">
                Formu doldurun, size en kısa sürede geri dönüş yapalım
              </p>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className={activeField === 'name' || formData.name ? 'active' : ''}>
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    required
                    placeholder="Adınızı ve soyadınızı girin"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className={activeField === 'email' || formData.email ? 'active' : ''}>
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    required
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className={activeField === 'subject' || formData.subject ? 'active' : ''}>
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField(null)}
                  required
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className={activeField === 'message' || formData.message ? 'active' : ''}>
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  required
                  rows="6"
                  placeholder="Mesajınızı detaylı olarak yazın..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <span>Mesaj Gönder</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Sık Sorulan Sorular</h2>
            <p className="section-subtitle">Merak ettiklerinizin cevapları</p>
          </motion.div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
