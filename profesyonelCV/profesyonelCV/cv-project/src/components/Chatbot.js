import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formalizeText, formalizeDescription, formalizeLanguage, formatName, formatJobTitle } from '../utils/textFormatter';
import RobotModel from './RobotModel';
import './Chatbot.css';

const questions = [
  { 
    key: 'fullName', 
    text: "Merhaba! Profesyonel CV'nizi oluşturmak için buradayım. Öncelikle adınız ve soyadınız nedir?",
    placeholder: "Adınız ve soyadınızı girin"
  },
  { 
    key: 'jobTitle', 
    text: "Hangi pozisyonda çalışıyorsunuz veya hangi pozisyonda çalışmak istiyorsunuz?",
    placeholder: "Örn: Frontend Developer, Proje Müdürü, Pazarlama Uzmanı"
  },
  { 
    key: 'email', 
    text: "E-posta adresiniz nedir?",
    placeholder: "ornek@email.com"
  },
  { 
    key: 'phone', 
    text: "Telefon numaranız nedir?",
    placeholder: "+90 (555) 123 45 67"
  },
  { 
    key: 'location', 
    text: "Yaşadığınız şehir ve ülke nedir?",
    placeholder: "İstanbul, Türkiye"
  },
  { 
    key: 'linkedin', 
    text: "LinkedIn profil linkiniz var mı? (Varsa paylaşın, yoksa 'hayır' yazın)",
    placeholder: "https://linkedin.com/in/kullaniciadi veya hayır"
  },
  { 
    key: 'portfolio', 
    text: "Web siteniz veya portfolio linkiniz var mı? (Varsa paylaşın, yoksa 'hayır' yazın)",
    placeholder: "https://www.ornek.com veya hayır"
  },
  { 
    key: 'summary', 
    text: "Kendiniz hakkında detaylı bir profesyonel özet yazabilir misiniz? Lütfen şunları belirtin: Kaç yıllık deneyiminiz var, hangi alanlarda uzmanlaştınız, hangi sektörlerde çalıştınız, temel güçlü yönleriniz nelerdir? (3-5 cümle ile detaylı açıklayın)",
    placeholder: "5 yıllık yazılım geliştirme deneyimine sahip, React ve Node.js konularında uzmanlaşmış, fintech ve e-ticaret sektörlerinde çalışmış...",
    isTextarea: true
  },
  { 
    key: 'education1', 
    text: "Eğitim bilgilerinizi paylaşır mısınız? İlk eğitiminiz: Okul adı, bölüm, mezuniyet yılı (örn: İstanbul Üniversitesi, Bilgisayar Mühendisliği, 2018)",
    placeholder: "Okul adı, Bölüm, Yıl"
  },
  { 
    key: 'education2', 
    text: "Başka bir eğitiminiz var mı? (Varsa yazın, yoksa 'hayır' yazın)",
    placeholder: "Okul adı, Bölüm, Yıl veya hayır"
  },
  { 
    key: 'education3', 
    text: "Üçüncü bir eğitiminiz var mı? (Varsa yazın, yoksa 'hayır' yazın)",
    placeholder: "Okul adı, Bölüm, Yıl veya hayır"
  },
  { 
    key: 'experience1_company', 
    text: "İş deneyimlerinizi paylaşalım. En son çalıştığınız şirketin adı nedir?",
    placeholder: "Şirket adı"
  },
  { 
    key: 'experience1_position', 
    text: "Bu şirkette hangi pozisyonda çalışıyordunuz?",
    placeholder: "Pozisyon adı"
  },
  { 
    key: 'experience1_duration', 
    text: "Bu pozisyonda ne kadar süre çalıştınız? (Başlangıç ve bitiş tarihleri)",
    placeholder: "Ocak 2020 - Aralık 2022"
  },
  { 
    key: 'experience1_description', 
    text: "Bu pozisyondaki görevlerinizi detaylı olarak açıklar mısınız? Lütfen şunları belirtin: Hangi projelerde yer aldınız, hangi teknolojileri kullandınız, ekip yönetimi yaptınız mı, hangi başarıları elde ettiniz, hangi metrikleri iyileştirdiniz? (Detaylı açıklayın)",
    placeholder: "React ve Node.js kullanarak e-ticaret platformu geliştirdim, 5 kişilik ekibi yönettim, satışları %30 artırdım...",
    isTextarea: true
  },
  { 
    key: 'experience2_company', 
    text: "Bir önceki iş yerinizin adı nedir? (Varsa yazın, yoksa 'hayır' yazın)",
    placeholder: "Şirket adı veya hayır"
  },
  { 
    key: 'experience2_position', 
    text: "Bir önceki pozisyonunuz neydi?",
    placeholder: "Pozisyon adı veya hayır"
  },
  { 
    key: 'experience2_duration', 
    text: "Bu pozisyonda ne kadar süre çalıştınız?",
    placeholder: "Ocak 2018 - Aralık 2019 veya hayır"
  },
  { 
    key: 'experience2_description', 
    text: "Bu pozisyondaki görevlerinizi detaylı olarak açıklar mısınız? Hangi projelerde yer aldınız, hangi başarıları elde ettiniz?",
    placeholder: "Web uygulamaları geliştirdim, API tasarımı yaptım, müşteri memnuniyetini artırdım...",
    isTextarea: true
  },
  { 
    key: 'experience3_company', 
    text: "Üçüncü iş deneyiminiz var mı? Şirket adı? (Varsa yazın, yoksa 'hayır' yazın)",
    placeholder: "Şirket adı veya hayır"
  },
  { 
    key: 'experience3_position', 
    text: "Üçüncü pozisyonunuz neydi?",
    placeholder: "Pozisyon adı veya hayır"
  },
  { 
    key: 'experience3_duration', 
    text: "Bu pozisyonda ne kadar süre çalıştınız?",
    placeholder: "Tarih aralığı veya hayır"
  },
  { 
    key: 'experience3_description', 
    text: "Bu pozisyondaki görevlerinizi detaylı olarak açıklar mısınız? Hangi projelerde yer aldınız, hangi başarıları elde ettiniz?",
    placeholder: "Mobil uygulama geliştirdim, veritabanı optimizasyonu yaptım...",
    isTextarea: true
  },
  { 
    key: 'skills_technical', 
    text: "Teknik yetenekleriniz nelerdir? (Yazılım dilleri, araçlar, teknolojiler - virgülle ayırın)",
    placeholder: "JavaScript, React, Node.js, Python, SQL, Git..."
  },
  { 
    key: 'skills_soft', 
    text: "Yumuşak yetenekleriniz nelerdir? (İletişim, Liderlik, Takım Çalışması vb.)",
    placeholder: "Proje Yönetimi, Liderlik, İletişim, Problem Çözme..."
  },
  { 
    key: 'languages', 
    text: "Bildiğiniz yabancı diller ve seviyeleri nelerdir? (Virgülle ayırın)",
    placeholder: "İngilizce (İleri), Almanca (Orta), İspanyolca (Başlangıç)..."
  },
  { 
    key: 'certifications', 
    text: "Sertifikalarınız var mı? (Varsa listeleyin, yoksa 'hayır' yazın)",
    placeholder: "AWS Certified Solutions Architect (2021), Google Analytics Sertifikası..."
  },
  { 
    key: 'projects', 
    text: "Önemli projeleriniz var mı? (Varsa kısaca açıklayın, yoksa 'hayır' yazın)",
    placeholder: "E-ticaret platformu geliştirme, Mobil uygulama projesi...",
    isTextarea: true
  },
  { 
    key: 'achievements', 
    text: "Önemli başarılarınız veya ödülleriniz var mı? (Varsa yazın, yoksa 'hayır' yazın)",
    placeholder: "En İyi Proje Ödülü 2020, Hackathon 1.liği..."
  },
  { 
    key: 'interests', 
    text: "İlgi alanlarınız ve hobileriniz nelerdir?",
    placeholder: "Müzik, Spor, Kitap okuma, Seyahat..."
  },
  { 
    key: 'references', 
    text: "Referans olarak gösterebileceğiniz kişiler var mı? (Varsa: Ad Soyad - Ünvan - İletişim bilgisi formatında yazın, virgülle ayırın. Yoksa 'hayır' yazın)",
    placeholder: "Ahmet Yılmaz - Proje Müdürü - +90 555 123 45 67, Ayşe Demir - İK Uzmanı - ayse@email.com",
    isTextarea: true
  },
  { 
    key: 'photo', 
    text: "Son olarak, CV'niz için bir profil fotoğrafı linki paylaşır mısınız? (Opsiyonel - varsa link, yoksa 'hayır' yazın)",
    placeholder: "https://... veya hayır"
  }
];

const Chatbot = ({ onCvReady }) => {
  const [messages, setMessages] = useState([
    { 
      text: questions[0].text, 
      sender: 'bot',
      questionKey: questions[0].key
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cvData, setCvData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Cevapları resmi dile çevir
  const formalizeAnswer = (key, value) => {
    if (!value || value.toLowerCase() === 'hayır' || value.toLowerCase() === 'hayir') return value;
    
    switch(key) {
      case 'fullName':
        return formatName(value);
      case 'jobTitle':
        return formatJobTitle(value);
      case 'summary':
      case 'experience1_description':
      case 'experience2_description':
      case 'experience3_description':
      case 'projects':
        return formalizeDescription(value);
      case 'languages':
        return value.split(',').map(lang => formalizeLanguage(lang.trim())).join(', ');
      default:
        return formalizeText(value);
    }
  };

  const handleSendMessage = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const trimmedValue = inputValue.trim();
    
    // "Hayır" cevaplarını kontrol et
    if (trimmedValue.toLowerCase() === 'hayır' || trimmedValue.toLowerCase() === 'hayir' || trimmedValue === '') {
      // Bazı alanlar opsiyonel olduğu için boş geçilebilir
      const userMessage = { 
        text: trimmedValue || '(Atlandı)', 
        sender: 'user' 
      };
      const newMessages = [...messages, userMessage];
      
      const formalizedValue = formalizeAnswer(currentQuestion.key, trimmedValue || '');
      const newCvData = { 
        ...cvData, 
        [currentQuestion.key]: formalizedValue 
      };
      setCvData(newCvData);

      setInputValue('');

    if (currentQuestionIndex < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        const nextQuestion = questions[currentQuestionIndex + 1];
        const botMessage = { 
          text: nextQuestion.text, 
          sender: 'bot',
          questionKey: nextQuestion.key
        };
        setMessages([...newMessages, botMessage]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTyping(false);
      }, 800);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        const botMessage = { 
          text: "Harika! Tüm bilgileri aldım. CV'nizi şimdi oluşturuyorum... 🎉", 
          sender: 'bot' 
        };
        setMessages([...newMessages, botMessage]);
        setIsTyping(false);
        setTimeout(() => {
          onCvReady(newCvData);
        }, 1500);
      }, 800);
    }
      return;
    }

    if (!trimmedValue) return;

    const userMessage = { 
      text: trimmedValue, 
      sender: 'user' 
    };
    const newMessages = [...messages, userMessage];
    
    // Cevabı resmi dile çevir
    const formalizedValue = formalizeAnswer(currentQuestion.key, trimmedValue);
    const newCvData = { 
      ...cvData, 
      [currentQuestion.key]: formalizedValue 
    };
    setCvData(newCvData);

    setInputValue('');

    if (currentQuestionIndex < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
      const nextQuestion = questions[currentQuestionIndex + 1];
        const botMessage = { 
          text: nextQuestion.text, 
          sender: 'bot',
          questionKey: nextQuestion.key
        };
      setMessages([...newMessages, botMessage]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTyping(false);
      }, 800);
    } else {
      const botMessage = { 
        text: "Harika! Tüm bilgileri aldım. CV'nizi şimdi oluşturuyorum... 🎉", 
        sender: 'bot' 
      };
      setMessages([...newMessages, botMessage]);
      
      setTimeout(() => {
      onCvReady(newCvData);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isTextarea = currentQuestion?.isTextarea;

  return (
    <motion.div 
      className="chatbot-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sol tarafta büyük robot modeli */}
      <div className="chatbot-side-robot">
        <motion.div
          className="side-robot-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <RobotModel size="xlarge" isTalking={isTyping || messages.length > 1} />
          <motion.div
            className="side-robot-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>CV Asistanınız</h3>
            <p>Size yardımcı olmak için buradayım</p>
            <div className="robot-status">
              {isTyping ? (
                <span className="status-dot typing">Yazıyor...</span>
              ) : (
                <span className="status-dot online">Çevrimiçi</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="header-content">
            <div className="bot-avatar-large">
              <RobotModel size="large" isTalking={isTyping} />
              <span className="robot-label">ROBOT</span>
            </div>
            <div className="header-text">
              <h2>CV Hazırlama Asistanı</h2>
              <p>Size birkaç soru soracağım, lütfen cevaplayın</p>
              <div className="header-stats">
                <span className="stat-item">✓ Profesyonel Format</span>
                <span className="stat-item">✓ AI Destekli</span>
                <span className="stat-item">✓ Hızlı ve Kolay</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="chatbot-messages">
          <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
                className={`message-wrapper ${message.sender}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {message.sender === 'bot' && (
                  <div className="bot-avatar">
                    <RobotModel size="medium" isTalking={false} />
                  </div>
                )}
                <div className={`message ${message.sender}`}>
                  <div className="message-content">
            {message.text}
                  </div>
                  <div className="message-time">
                    {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="user-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
                      <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="white"/>
                    </svg>
                  </div>
                )}
          </motion.div>
        ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              className="typing-indicator-wrapper show"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="typing-indicator">
                <div className="bot-avatar typing-avatar">
                  <RobotModel size="medium" isTalking={true} />
                </div>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
      </div>
        
        <div className="chatbot-input-container">
          <div className="input-wrapper">
            {isTextarea ? (
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion?.placeholder || "Mesajınızı yazın..."}
                rows="3"
                className="chatbot-textarea"
              />
            ) : (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion?.placeholder || "Mesajınızı yazın..."}
                className="chatbot-input"
              />
            )}
            <button 
              onClick={handleSendMessage}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="progress-indicator">
            <span>Soru {currentQuestionIndex + 1} / {questions.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
    </div>
    </motion.div>
  );
};

export default Chatbot;
