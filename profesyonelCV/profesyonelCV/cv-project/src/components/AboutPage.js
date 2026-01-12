import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AboutPage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const tabs = ['Hikayemiz', 'Değerlerimiz', 'Ekibimiz', 'Başarılarımız'];

  const storyContent = {
    title: 'Hikayemiz',
    content: `Profesyonel CV oluşturma platformu olarak 2020 yılında kurulduk. Amacımız, iş arayan herkesin, 
    deneyim seviyesi ne olursa olsun, profesyonel ve etkileyici bir CV oluşturabilmesini sağlamaktı. 
    Yapay zeka teknolojisini kullanarak, CV hazırlama sürecini kolaylaştırdık ve herkese eşit fırsat sunduk.
    
    Bugün, 50.000'den fazla kullanıcımız var ve 100.000'den fazla profesyonel CV oluşturuldu. 
    Her geçen gün daha fazla insanın kariyer hedeflerine ulaşmasına yardımcı olmaktan gurur duyuyoruz.`
  };

  const values = [
    {
      icon: '🎯',
      title: 'Mükemmellik',
      description: 'Her CV\'nin mükemmel olması için çalışıyoruz. Detaylara önem veriyor ve sürekli iyileştirme yapıyoruz.'
    },
    {
      icon: '🤝',
      title: 'Güven',
      description: 'Kullanıcılarımızın verilerini korumak ve güvenli bir deneyim sunmak bizim önceliğimiz.'
    },
    {
      icon: '💡',
      title: 'İnovasyon',
      description: 'Yeni teknolojileri takip ediyor ve kullanıcı deneyimini sürekli geliştiriyoruz.'
    },
    {
      icon: '❤️',
      title: 'Kullanıcı Odaklılık',
      description: 'Kullanıcılarımızın ihtiyaçlarını anlıyor ve onlar için en iyi çözümleri sunuyoruz.'
    }
  ];

  const team = [
    {
      name: 'AI Asistan',
      role: 'CV Uzmanı',
      description: 'Yapay zeka destekli asistanımız, size en uygun CV formatını önerir ve profesyonel bir özgeçmiş oluşturmanıza yardımcı olur.',
      avatar: '🤖'
    },
    {
      name: 'Tasarım Ekibi',
      role: 'UI/UX Tasarımcıları',
      description: 'Modern ve profesyonel CV şablonları tasarlayan deneyimli tasarım ekibimiz.',
      avatar: '🎨'
    },
    {
      name: 'Geliştirme Ekibi',
      role: 'Yazılım Geliştiricileri',
      description: 'Platformumuzu sürekli geliştiren ve yeni özellikler ekleyen teknoloji ekibimiz.',
      avatar: '💻'
    }
  ];

  const achievements = [
    { number: '50K+', label: 'Aktif Kullanıcı', icon: '👥' },
    { number: '100K+', label: 'CV Oluşturuldu', icon: '📄' },
    { number: '95%', label: 'Memnuniyet Oranı', icon: '⭐' },
    { number: '24/7', label: 'Destek Hizmeti', icon: '🔄' },
    { number: '150+', label: 'Ülke', icon: '🌍' },
    { number: '4.9/5', label: 'Kullanıcı Puanı', icon: '🏆' }
  ];

  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="about-hero"
        style={{ opacity }}
      >
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">Hakkımızda</h1>
          <p className="hero-subtitle">
            Profesyonel CV oluşturma deneyimini sizin için tasarladık
          </p>
        </motion.div>
      </motion.div>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <motion.div
            className="story-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{storyContent.title}</h2>
            <div className="story-text">
              {storyContent.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Değerlerimiz</h2>
            <p className="section-subtitle">İş yapış şeklimizi belirleyen temel değerler</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Ekibimiz</h2>
            <p className="section-subtitle">Sizin için çalışan profesyonel ekip</p>
          </motion.div>

          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, rotate: 2 }}
              >
                <div className="team-avatar">{member.avatar}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Başarılarımız</h2>
            <p className="section-subtitle">Rakamlarla başarı hikayemiz</p>
          </motion.div>

          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div
              className="mission-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-icon">🎯</div>
              <h3 className="card-title">Misyonumuz</h3>
              <p className="card-content">
                Kariyerinizde başarılı olmanız için en profesyonel CV'yi oluşturmanıza yardımcı olmak. 
                Yapay zeka destekli asistanımız sayesinde, dakikalar içinde işverenlerin dikkatini çekecek 
                bir özgeçmiş hazırlayabilirsiniz.
              </p>
            </motion.div>

            <motion.div
              className="vision-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-icon">🔮</div>
              <h3 className="card-title">Vizyonumuz</h3>
              <p className="card-content">
                İş arayan herkesin, deneyim seviyesi ne olursa olsun, profesyonel bir CV oluşturabilmesini sağlamak. 
                Teknolojiyi kullanarak, CV hazırlama sürecini kolaylaştırıyor ve herkese eşit fırsat sunuyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
