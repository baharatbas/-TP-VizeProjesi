import React from 'react';
import { motion } from 'framer-motion';
import './CVPreview.css';

const CVPreview = ({ cvData, template = 'modern' }) => {
  if (!cvData || Object.keys(cvData).length === 0) {
    return null;
  }

  // Yardımcı fonksiyonlar
  const parseEducation = (edu) => {
    if (!edu || edu.toLowerCase() === 'hayır' || edu.toLowerCase() === 'hayir') return null;
    const parts = edu.split(',');
    return {
      school: parts[0]?.trim() || '',
      degree: parts[1]?.trim() || '',
      year: parts[2]?.trim() || ''
    };
  };

  const parseExperience = (company, position, duration, description) => {
    if (!company || company.toLowerCase() === 'hayır' || company.toLowerCase() === 'hayir') return null;
    return {
      company: company.trim(),
      position: position?.trim() || '',
      duration: duration?.trim() || '',
      description: description?.trim() || ''
    };
  };

  const formatList = (str) => {
    if (!str || str.toLowerCase() === 'hayır' || str.toLowerCase() === 'hayir') return [];
    return str.split(',').map(item => item.trim()).filter(item => item);
  };

  // Eğitim bilgilerini topla
  const educations = [];
  const edu1 = parseEducation(cvData.education1);
  if (edu1) educations.push(edu1);
  const edu2 = parseEducation(cvData.education2);
  if (edu2) educations.push(edu2);
  const edu3 = parseEducation(cvData.education3);
  if (edu3) educations.push(edu3);

  // İş deneyimlerini topla
  const experiences = [];
  const exp1 = parseExperience(
    cvData.experience1_company,
    cvData.experience1_position,
    cvData.experience1_duration,
    cvData.experience1_description
  );
  if (exp1) experiences.push(exp1);
  const exp2 = parseExperience(
    cvData.experience2_company,
    cvData.experience2_position,
    cvData.experience2_duration,
    cvData.experience2_description
  );
  if (exp2) experiences.push(exp2);
  const exp3 = parseExperience(
    cvData.experience3_company,
    cvData.experience3_position,
    cvData.experience3_duration,
    cvData.experience3_description
  );
  if (exp3) experiences.push(exp3);

  // Referansları parse et (eğer varsa)
  const references = [];
  if (cvData.references && cvData.references.toLowerCase() !== 'hayır' && cvData.references.toLowerCase() !== 'hayir') {
    // Her referans virgülle ayrılmış
    const refParts = cvData.references.split(',').map(r => r.trim()).filter(r => r);
    refParts.forEach(ref => {
      // Her referans: "Ad Soyad - Ünvan - İletişim" formatında
      const parts = ref.split('-').map(p => p.trim());
      if (parts.length >= 2) {
        references.push({
          name: parts[0] || '',
          title: parts[1] || '',
          contact: parts[2] || ''
        });
      }
    });
  }

  // Verileri hazırla
  const fullName = cvData.fullName || '';
  const jobTitle = cvData.jobTitle || '';
  const email = cvData.email || '';
  const phone = cvData.phone || '';
  const location = cvData.location || '';
  const linkedin = cvData.linkedin && cvData.linkedin.toLowerCase() !== 'hayır' && cvData.linkedin.toLowerCase() !== 'hayir' ? cvData.linkedin : null;
  const portfolio = cvData.portfolio && cvData.portfolio.toLowerCase() !== 'hayır' && cvData.portfolio.toLowerCase() !== 'hayir' ? cvData.portfolio : null;
  const summary = cvData.summary || '';
  const technicalSkills = formatList(cvData.skills_technical);
  const softSkills = formatList(cvData.skills_soft);
  const allSkills = [...technicalSkills, ...softSkills];
  const languages = formatList(cvData.languages);
  const certifications = cvData.certifications && cvData.certifications.toLowerCase() !== 'hayır' && cvData.certifications.toLowerCase() !== 'hayir' ? cvData.certifications.split(',').map(c => c.trim()).filter(c => c) : [];
  const projects = cvData.projects && cvData.projects.toLowerCase() !== 'hayır' && cvData.projects.toLowerCase() !== 'hayir' ? cvData.projects : null;
  const achievements = cvData.achievements && cvData.achievements.toLowerCase() !== 'hayır' && cvData.achievements.toLowerCase() !== 'hayir' ? cvData.achievements.split(',').map(a => a.trim()).filter(a => a) : [];
  const interests = formatList(cvData.interests);
  const photo = cvData.photo && cvData.photo.toLowerCase() !== 'hayır' && cvData.photo.toLowerCase() !== 'hayir' ? cvData.photo : null;

  return (
    <motion.div 
      className="cv-preview-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cv-preview-container">
    <div className={`cv-preview cv-template-${template}`}>
          {/* Header Section */}
          <div className="cv-header">
            <div className="cv-header-content">
              {photo && (
                <div className="cv-photo">
                  <img src={photo} alt={fullName} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
              <div className="cv-header-info">
                <h1 className="cv-name">{fullName}</h1>
                {jobTitle && <h2 className="cv-job-title">{jobTitle}</h2>}
                <div className="cv-contact-info">
                  {email && (
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="L22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{email}</span>
                    </div>
                  )}
                  {phone && (
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9841 21.5573 21.2126 21.3528 21.3992C21.1483 21.5857 20.9074 21.7262 20.6446 21.8116C20.3818 21.897 20.1028 21.9252 19.828 21.8942C16.7425 21.486 13.787 20.3341 11.19 18.5242C8.77382 16.8504 6.72533 14.5999 5.214 11.9642C3.56475 9.07928 2.43655 5.8748 1.894 2.54823C1.863 2.27346 1.89118 1.99451 1.97658 1.7317C2.06198 1.46889 2.20247 1.22801 2.389 1.02353C2.57554 0.819049 2.80408 0.655432 3.05904 0.543841C3.314 0.43225 3.58972 0.375244 3.868 0.376234H6.868C7.56779 0.374692 8.23909 0.653164 8.72637 1.14481C9.21364 1.63645 9.47532 2.29878 9.448 3.00023C9.36241 4.51575 9.64476 6.02011 10.273 7.39623C10.4371 7.76949 10.5213 8.17379 10.52 8.58223C10.52 8.98523 10.441 9.37023 10.294 9.72623L8.859 12.7262C10.917 15.5052 13.953 18.1312 17.727 20.1972L20.727 18.7622C21.083 18.6152 21.468 18.5362 21.871 18.5362C22.2794 18.5349 22.6837 18.6191 23.057 18.7832C24.4295 19.4115 25.7079 20.6924 26.726 22.5002C27.2177 23.4878 27.4754 24.5822 27.475 25.6922C27.476 26.3902 27.1974 27.0618 26.7057 27.5493C26.2141 28.0369 25.5517 28.2991 24.85 28.3272C22.358 28.6722 19.846 28.4852 17.439 27.7762C14.8042 26.9912 12.3295 25.7597 10.124 24.1392" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{phone}</span>
                    </div>
                  )}
                  {location && (
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="cv-body">
            {/* Left Column */}
            <div className="cv-left-column">
              {/* Education */}
              {educations.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">EĞİTİM</h2>
                  <div className="section-content">
                    {educations.map((edu, index) => (
                      <div key={index} className="education-item">
                        <div className="education-degree">{edu.degree || 'Bölüm adı'}</div>
                        <div className="education-school">{edu.school || 'Üniversite Adı'}</div>
                        <div className="education-year">{edu.year || '2018 - 2022'}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {allSkills.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">BECERİLER</h2>
                  <div className="section-content">
                    <ul className="skills-list">
                      {allSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">DİLLER</h2>
                  <div className="section-content">
                    <ul className="languages-list">
                      {languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">HOBİLER</h2>
                  <div className="section-content">
                    <ul className="interests-list">
                      {interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="cv-right-column">
              {/* About Me */}
              {summary && (
                <section className="cv-section">
                  <h2 className="section-title">HAKKIMDA</h2>
                  <div className="section-content">
                    <p className="summary-text">{summary}</p>
                  </div>
                </section>
              )}

              {/* Work Experience */}
              {experiences.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">İŞ GEÇMİŞİ</h2>
                  <div className="section-content">
                    {experiences.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <h3 className="experience-position">{exp.position || 'ÜNVANINIZI BURAYA GİRİN'}</h3>
                        <div className="experience-company">{exp.company} {exp.duration ? `- ${exp.duration}` : ''}</div>
                        {exp.description && (
                          <div className="experience-description">
                            <p>{exp.description}</p>
                          </div>
                        )}
                        {index < experiences.length - 1 && <hr className="experience-divider" />}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* References */}
              {references.length > 0 && (
                <section className="cv-section">
                  <h2 className="section-title">REFERANSLAR</h2>
                  <div className="section-content">
                    <div className="references-grid">
                      {references.map((ref, index) => (
                        <div key={index} className="reference-item">
                          <div className="reference-name">{ref.name || 'Ad - Soyad'}</div>
                          <div className="reference-title">{ref.title || 'Kişinin ünvanı (Yaptığı iş)'}</div>
                          {ref.contact && <div className="reference-contact">{ref.contact}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cv-actions">
          <button className="btn-primary" onClick={() => window.print()}>PDF Olarak İndir</button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>Yeni CV Oluştur</button>
        </div>
    </div>
    </motion.div>
  );
};

export default CVPreview;
