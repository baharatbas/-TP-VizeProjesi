// Kullanıcı cevaplarını resmi dile çeviren fonksiyonlar

export const formalizeText = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  let formalized = text.trim();
  
  // Küçük harfleri düzelt
  formalized = formalized.charAt(0).toUpperCase() + formalized.slice(1);
  
  // Yaygın informal ifadeleri formal hale getir
  const replacements = {
    'ben': 'Kendisi',
    'benim': 'Kendisinin',
    'bana': 'Kendisine',
    'beni': 'Kendisini',
    'yaptım': 'gerçekleştirdi',
    'yaptı': 'gerçekleştirdi',
    'yapıyorum': 'gerçekleştirmekte',
    'yapıyor': 'gerçekleştirmekte',
    'çalıştım': 'görev yaptı',
    'çalıştı': 'görev yaptı',
    'çalışıyorum': 'görev yapmakta',
    'çalışıyor': 'görev yapmakta',
    'başardım': 'başarıyla tamamladı',
    'başardı': 'başarıyla tamamladı',
    'yönettim': 'yönetimini üstlendi',
    'yönetti': 'yönetimini üstlendi',
    'geliştirdim': 'geliştirdi',
    'geliştirdi': 'geliştirdi',
    'oluşturdum': 'oluşturdu',
    'oluşturdu': 'oluşturdu',
    'işe aldım': 'işe alım süreçlerini yönetti',
    'işe aldı': 'işe alım süreçlerini yönetti',
    'ekip': 'ekip',
    'takım': 'ekip',
    'proje': 'proje',
    'sistem': 'sistem',
    'yazılım': 'yazılım',
    'uygulama': 'uygulama',
    'platform': 'platform',
    'çok iyi': 'ileri seviye',
    'iyi': 'iyi seviye',
    'orta': 'orta seviye',
    'başlangıç': 'temel seviye',
    'biraz': 'temel',
    'az': 'temel',
    'çok': 'ileri',
    'harika': 'başarılı',
    'güzel': 'etkili',
    'kötü': 'geliştirilmesi gereken',
  };
  
  // Kelime bazlı değiştirmeler
  Object.keys(replacements).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formalized = formalized.replace(regex, replacements[key]);
  });
  
  // Cümle sonlarını düzelt
  if (!formalized.endsWith('.') && !formalized.endsWith('!') && !formalized.endsWith('?')) {
    formalized += '.';
  }
  
  return formalized;
};

export const formalizeDescription = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  let formalized = text.trim();
  
  // İlk harfi büyük yap
  formalized = formalized.charAt(0).toUpperCase() + formalized.slice(1);
  
  // Cümleleri düzelt
  const sentences = formalized.split(/[.!?]+/).filter(s => s.trim());
  formalized = sentences.map(sentence => {
    let s = sentence.trim();
    if (s) {
      s = s.charAt(0).toUpperCase() + s.slice(1);
      // Yaygın informal ifadeleri değiştir
      s = s.replace(/\bben\b/gi, 'Kendisi');
      s = s.replace(/\byaptım\b/gi, 'gerçekleştirdi');
      s = s.replace(/\byaptı\b/gi, 'gerçekleştirdi');
      s = s.replace(/\bçalıştım\b/gi, 'görev yaptı');
      s = s.replace(/\bçalıştı\b/gi, 'görev yaptı');
      if (!s.endsWith('.')) s += '.';
    }
    return s;
  }).join(' ');
  
  return formalized;
};

export const formalizeSkills = (skills) => {
  if (!skills || !Array.isArray(skills)) return skills;
  
  return skills.map(skill => {
    let s = skill.trim();
    // İlk harfi büyük yap
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  });
};

export const formalizeLanguage = (lang) => {
  if (!lang || typeof lang !== 'string') return lang;
  
  let formalized = lang.trim();
  
  // Dil seviyelerini standartlaştır
  formalized = formalized.replace(/\bileri\b/gi, 'İleri');
  formalized = formalized.replace(/\borta\b/gi, 'Orta');
  formalized = formalized.replace(/\bbaşlangıç\b/gi, 'Başlangıç');
  formalized = formalized.replace(/\btemel\b/gi, 'Temel');
  formalized = formalized.replace(/\ba1\b/gi, 'A1');
  formalized = formalized.replace(/\ba2\b/gi, 'A2');
  formalized = formalized.replace(/\bb1\b/gi, 'B1');
  formalized = formalized.replace(/\bb2\b/gi, 'B2');
  formalized = formalized.replace(/\bc1\b/gi, 'C1');
  formalized = formalized.replace(/\bc2\b/gi, 'C2');
  
  // İlk harfi büyük yap
  formalized = formalized.charAt(0).toUpperCase() + formalized.slice(1);
  
  return formalized;
};

export const formatName = (name) => {
  if (!name || typeof name !== 'string') return name;
  
  // İsimleri büyük harfe çevir ve düzelt
  return name.trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .toUpperCase();
};

export const formatJobTitle = (title) => {
  if (!title || typeof title !== 'string') return title;
  
  // Pozisyon isimlerini büyük harfe çevir
  return title.trim().toUpperCase();
};



