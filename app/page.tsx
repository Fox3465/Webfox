'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, CirclePlay, GraduationCap, Menu, Play, Sparkles, Users, X } from 'lucide-react';

const courses = [
  { category: 'TASARIM', title: 'Dijital Tasarımın Temelleri', teacher: 'Ece Yılmaz', duration: '8 ders · 2 sa 40 dk', color: 'peach', icon: '✳', progress: 68 },
  { category: 'YAZILIM', title: 'Python ile İlk Adımlar', teacher: 'Mert Kaya', duration: '12 ders · 4 sa 10 dk', color: 'mint', icon: '⌘', progress: 35 },
  { category: 'İŞ DÜNYASI', title: 'Etkili İletişim Becerileri', teacher: 'Selin Demir', duration: '6 ders · 1 sa 55 dk', color: 'lavender', icon: '↗', progress: 0 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tümü');
  const [playing, setPlaying] = useState(false);
  const visibleCourses = activeTab === 'Tümü' ? courses : courses.filter(course => course.category === activeTab.toUpperCase());

  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#home" aria-label="Webfox ana sayfa"><span className="brand-mark"><span /></span>webfox<span className="brand-dot">.</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a><a href="#courses" onClick={() => setMenuOpen(false)}>Kurslar</a><a href="#for-who" onClick={() => setMenuOpen(false)}>Kimler için?</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Fiyatlandırma</a>
          <div className="mobile-actions"><a className="login" href="#login">Giriş yap</a><a className="button button-dark" href="#start">Ücretsiz başla <ArrowRight size={16}/></a></div>
        </div>
        <div className="nav-actions"><a className="login" href="#login">Giriş yap</a><a className="button button-dark" href="#start">Ücretsiz başla <ArrowRight size={16}/></a></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </nav>

      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> ÖĞRENMEK ARTIK DAHA KOLAY</div>
          <h1>Merak et.<br/><span>Öğren.</span> İlerle.</h1>
          <p className="hero-text">Kendine yatırım yapmanın en keyifli yolu. İhtiyacın olan becerileri, kendi hızında ve ilham veren eğitmenlerle keşfet.</p>
          <div className="hero-buttons"><a className="button button-dark button-large" href="#courses">Öğrenmeye başla <ArrowRight size={17}/></a><a className="watch-link" href="#platform"><span className="play-circle"><Play size={13} fill="currentColor"/></span> Platformu keşfet</a></div>
          <div className="social-proof"><div className="avatar-stack"><span>AY</span><span>MK</span><span>ED</span><span>+</span></div><div><div className="stars">★★★★★ <b>4.9</b></div><p>12.000+ öğrenci aramıza katıldı</p></div></div>
        </div>
        <div className="hero-art" aria-label="Webfox öğrenme paneli önizlemesi">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div>
          <div className="learning-card">
            <div className="card-top"><div><span className="tiny-label">ÖĞRENME ALANIN</span><h3>Günün güzel geçsin,<br/>Ada! <span>✦</span></h3></div><div className="profile-pic">A</div></div>
            <div className="streak"><span className="streak-icon">♨</span><span><b>7 günlük seri!</b><small>Harika gidiyorsun, devam et.</small></span><span className="streak-count">7 <small>GÜN</small></span></div>
            <div className="card-course"><div className="course-art mini-art"><span>✳</span></div><div className="mini-course-copy"><small>KALDIĞIN YERDEN</small><b>Dijital Tasarımın Temelleri</b><div className="progress-line"><i/></div><span className="progress-caption">5 / 8 ders tamamlandı</span></div><button className="round-play" onClick={() => setPlaying(!playing)} aria-label="Dersi oynat"><Play size={14} fill="currentColor"/></button></div>
            <div className="week-row"><span>Bu haftaki hedefin</span><b>4/5 saat <ArrowUpRight size={13}/></b></div><div className="week-bars"><i/><i/><i/><i/><i/><i/><i/></div><div className="week-days"><span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span></div>
          </div>
          <div className="floating-note"><span className="note-icon"><Check size={16}/></span><span><b>{playing ? 'Ders başlatıldı!' : 'Bir adım daha!'}</b><small>Öğrenme hedefin yaklaşıyor</small></span></div>
          <div className="floating-badge"><span>✦</span> Her gün biraz daha iyi</div>
        </div>
      </section>

      <section className="trusted"><div className="wrap trusted-inner"><span>ÖĞRENME YOLCULUĞUNDA YANINDA</span><div className="trusted-logos"><b>◈ akış</b><b className="logo-serif">nora.</b><b>✳ nova</b><b className="logo-wide">piksel<span>®</span></b><b>◉ atölye</b></div></div></section>

      <section className="section wrap" id="platform"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> WEBFOX’TA ÖĞRENMEK</div><h2>Küçük adımlar,<br/><span>büyük değişimler.</span></h2></div><p className="section-intro">Öğrenme deneyimini sana göre tasarladık. Hedefini belirle, sana uygun içerikleri keşfet ve gelişimini keyifle takip et.</p></div>
        <div className="feature-grid"><article className="feature-card feature-peach"><div className="feature-icon">✳</div><span className="feature-number">01</span><h3>Sana özel öğrenme</h3><p>İlgi alanlarına ve hedeflerine uygun, özenle hazırlanmış kurslarla kendi yolunu çiz.</p><div className="feature-decoration flower">✳</div></article><article className="feature-card feature-green"><div className="feature-icon">↗</div><span className="feature-number">02</span><h3>İlerlemeni gör</h3><p>Net hedefler ve motive edici takip araçlarıyla ne kadar yol aldığını her an bil.</p><div className="mini-chart"><i/><i/><i/><i/><i/><i/><i/></div></article><article className="feature-card feature-purple"><div className="feature-icon"><Users size={20}/></div><span className="feature-number">03</span><h3>Birlikte öğren</h3><p>Eğitmenler ve öğrenme topluluğuyla fikirlerini paylaş, ilham al, gelişimini sürdür.</p><div className="people-art"><span>👩🏻‍🎨</span><span>👨🏽‍💻</span><span>👩🏼‍🚀</span></div></article></div>
      </section>

      <section className="courses-section" id="courses"><div className="wrap"><div className="courses-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> MERAKINI TAKİP ET</div><h2>Yeni bir şey<br/><span>keşfet bugün.</span></h2></div><a className="text-link" href="#all-courses">Tüm kursları gör <ArrowRight size={16}/></a></div><div className="course-tabs">{['Tümü','Tasarım','Yazılım','İş Dünyası'].map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="course-grid">{visibleCourses.map(course => <article className="course-card" key={course.title}><div className={`course-art ${course.color}`}><span>{course.icon}</span><small>{course.category}</small></div><div className="course-info"><div className="course-meta"><span><CirclePlay size={14}/>{course.duration}</span><span className="level">BAŞLANGIÇ</span></div><h3>{course.title}</h3><p><span className="teacher-avatar">{course.teacher[0]}</span>{course.teacher}</p><div className="course-bottom"><span>{course.progress ? `${course.progress}% tamamlandı` : 'Kursu keşfet'}</span><a href="#start" aria-label={`${course.title} kursunu incele`}><ArrowUpRight size={16}/></a></div></div></article>)}</div></div></section>

      <section className="quote-section wrap" id="for-who"><div className="quote-mark">“</div><blockquote>Öğrenmek için hiçbir zaman geç değil.<br/><span>Bugün başladığın yer, yarınki hikâyen.</span></blockquote><div className="quote-person"><div className="quote-avatar">D</div><div><b>Deniz Aydın</b><small>Webfox öğrencisi · UX tasarımına geçiş yaptı</small></div></div><div className="quote-decoration">✳</div></section>

      <section className="cta-section wrap" id="start"><div className="cta-box"><div className="cta-spark">✦</div><div className="eyebrow"><span className="eyebrow-dot"/> SIRADAKİ ADIM SENİN</div><h2>Merak ettiğin şey,<br/>başlangıç noktan olsun.</h2><p>Binlerce öğrenciyle birlikte öğrenme yolculuğuna bugün katıl.</p><a href="mailto:merhaba@webfox.com" className="button button-dark button-large">Ücretsiz hesabını oluştur <ArrowRight size={17}/></a><small>Kredi kartı gerekmez · İstediğin zaman ayrıl</small></div></section>

      <section className="pricing-strip wrap" id="pricing"><div><span className="eyebrow"><span className="eyebrow-dot"/> ÜYELİK</span><h2>Öğrenmeye başlamak <span>ücretsiz.</span></h2></div><div className="pricing-detail"><p>İlk kursunu hemen keşfet. Daha fazlası için sana uygun üyelik planını seç.</p><a href="mailto:merhaba@webfox.com" className="text-link">Planları karşılaştır <ArrowRight size={16}/></a></div></section>

      <footer className="footer wrap"><a className="brand" href="#home"><span className="brand-mark"><span/></span>webfox<span className="brand-dot">.</span></a><span>© 2025 Webfox. Merakla öğren, keyifle ilerle.</span><div><a href="#platform">Platform</a><a href="#courses">Kurslar</a><a href="mailto:merhaba@webfox.com">İletişim</a></div></footer>
    </main>
  );
}
