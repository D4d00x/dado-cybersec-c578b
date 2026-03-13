import React, { useState, useEffect } from 'react';

// Main Website Component
export default function DadoCybersec() {
  const [activeSection, setActiveSection] = useState('hem');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [news, setNews] = useState([]);

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active section on scroll with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hem', 'tjanster', 'om', 'kunder', 'omdomen', 'nyheter', 'kontakt'];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navigation = [
    { id: 'hem', label: 'Hem' },
    { id: 'tjanster', label: 'Tjänster' },
    { id: 'om', label: 'Om mig' },
    { id: 'kunder', label: 'Kunder' },
    { id: 'omdomen', label: 'Omdömen' },
    { id: 'nyheter', label: 'Nyheter' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  const services = [
    {
      title: 'Penetrationstestning',
      description: 'Systematisk säkerhetstestning av era system, applikationer och nätverk. Jag identifierar sårbarheter innan någon annan gör det.',
      includes: [
        'Webb- och mobilapplikationer',
        'API:er och backend-system',
        'Nätverksinfrastruktur',
        'Detaljerad rapport med rekommendationer',
        'Genomgång av resultat'
      ],
      price: 'Från 25 000 kr'
    },
    {
      title: 'Kodgranskning',
      description: 'Säkerhetsanalys av er kodbas för att identifiera sårbarheter, felaktig kryptering och andra risker innan de når produktion.',
      includes: [
        'Statisk kodanalys',
        'Identifiering av OWASP Top 10',
        'Granskning av autentisering och auktorisering',
        'Krypteringsimplementering',
        'Prioriterad åtgärdslista'
      ],
      price: 'Från 15 000 kr'
    },
    {
      title: 'Säkerhetsutbildning',
      description: 'Praktisk utbildning för utvecklare, IT-personal och ledningsgrupper. Anpassat efter er verksamhet och kunskapsnivå.',
      includes: [
        'Workshop eller föreläsning',
        'Anpassat innehåll',
        'Praktiska demonstrationer',
        'Skriftligt material',
        'Uppföljning'
      ],
      price: 'Från 15 000 kr'
    },
    {
      title: 'Säkerhetsrådgivning',
      description: 'Löpande stöd för säkerhetsfrågor, incidenthantering och strategisk planering. Tillgänglig när ni behöver expertis.',
      includes: [
        'Säkerhetsstrategi',
        'Incidentstöd',
        'Arkitekturgranskning',
        'Leverantörsutvärdering',
        'Löpande rådgivning'
      ],
      price: '1 500 kr/timme'
    }
  ];

  const clients = [
    { name: 'PayPal', tier: 'enterprise' },
    { name: 'Airbnb', tier: 'enterprise' },
    { name: 'Anduril Industries', tier: 'enterprise' },
    { name: 'Spotify', tier: 'enterprise' },
    { name: 'Uber', tier: 'enterprise' },
    { name: 'Klarna', tier: 'enterprise' },
    { name: 'Shopify', tier: 'enterprise' },
    { name: 'Booking.com', tier: 'enterprise' },
    { name: 'Vercel', tier: 'tech' },
    { name: 'Voi', tier: 'tech' },
    { name: 'Boozt', tier: 'tech' },
    { name: 'Meesho', tier: 'tech' },
    { name: 'Zitadel', tier: 'tech' },
    { name: 'Insightly', tier: 'tech' },
    { name: 'Clear', tier: 'tech' },
    { name: 'Molthub', tier: 'other' },
    { name: 'Moltbook', tier: 'other' },
    { name: 'Kindas Solenergi', tier: 'other' }
  ];

  const findings = [
    {
      type: 'Payment Security',
      description: 'Debug-läge och hårdkodade credentials i produktions-iframe för betalningar',
      severity: 'High',
      company: 'Global reseplatform'
    },
    {
      type: 'Subdomain Takeover',
      description: 'Dangling CNAME till ej registrerad extern domän möjliggjorde kapning',
      severity: 'Medium',
      company: 'Internationell betaltjänst'
    },
    {
      type: 'CORS Misconfiguration',
      description: 'Felkonfigurerad CORS-policy exponerade interna API:er',
      severity: 'High',
      company: 'US defense tech'
    }
  ];

  const testimonials = [
    {
      quote: 'Detailed and well-structured report on debug mode backdoor and hardcoded payment credentials in production payment iframe. The finding demonstrates strong technical depth in identifying critical security issues.',
      source: 'Airbnb Security Team',
      platform: 'HackerOne',
      context: 'Bug Bounty Report Response',
    },
    {
      quote: 'Thank you for your report! We appreciate your work and look forward to additional reports from you.',
      source: 'PayPal Security Team',
      platform: 'HackerOne',
      context: 'Subdomain Takeover Report',
    },
    {
      quote: 'Report accepted and triaged for review by the security team. Thank you for your contribution to our bug bounty program.',
      source: 'Anduril Industries',
      platform: 'HackerOne',
      context: 'Bug Bounty Program',
    },
  ];

  // Fetch news from static JSON (updated daily via GitHub Actions)
  useEffect(() => {
    fetch('/news.json')
      .then((res) => res.json())
      .then((data) => setNews(data.articles || []))
      .catch(() => setNews([]));
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://formsubmit.co/ajax/dado.cybersec@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });
      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch {
      window.location.href = `mailto:dado.cybersec@gmail.com?subject=Kontakt från ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    }
  };

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .clients-grid-small { grid-template-columns: repeat(3, 1fr) !important; }
          .news-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 768px) {
          .nav-links, .nav-cta-btn { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu { display: flex !important; }
          .hero-title { font-size: 36px !important; }
          .hero-stats { flex-direction: column !important; gap: 24px !important; }
          .stat-divider { width: 100% !important; height: 1px !important; }
          .profile-header { flex-direction: column !important; gap: 24px !important; }
          .profile-img-wrapper { width: 200px !important; height: 200px !important; }
          .section-title { font-size: 28px !important; }
          .clients-grid { grid-template-columns: 1fr !important; }
          .clients-grid-small { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-inner { flex-direction: column !important; gap: 32px !important; }
          .footer-links { flex-direction: column !important; gap: 24px !important; }
        }
        .footer-link-a { text-decoration: none; }
        .footer-link-a:hover { text-decoration: underline; }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <span style={styles.logoText}>DADO</span>
            <span style={styles.logoDot}>.</span>
            <span style={styles.logoSub}>CYBERSEC</span>
          </div>
          
          <div className="nav-links" style={styles.navLinks}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  ...styles.navLink,
                  ...(activeSection === item.id ? styles.navLinkActive : {})
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="nav-cta-btn"
            style={styles.navCta}
            onClick={() => scrollToSection('kontakt')}
          >
            Boka konsultation
          </button>

          <button
            className="mobile-menu-btn"
            style={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu" style={styles.mobileMenu}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={styles.mobileNavLink}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hem" style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroLabel}>IT-säkerhetskonsult | Etisk hackare</p>
          <h1 className="hero-title" style={styles.heroTitle}>
            Jag hittar säkerhetshål<br />
            <span style={styles.heroAccent}>innan någon annan gör det</span>
          </h1>
          <p style={styles.heroText}>
            Med 15 års erfarenhet inom IT och verifierade säkerhetsfynd hos företag som 
            PayPal, Airbnb, Spotify och Klarna hjälper jag svenska företag att skydda 
            sina system, data och kunder.
          </p>
          <div style={styles.heroButtons}>
            <button 
              style={styles.primaryBtn}
              onClick={() => scrollToSection('kontakt')}
            >
              Boka kostnadsfritt samtal
            </button>
            <button 
              style={styles.secondaryBtn}
              onClick={() => scrollToSection('tjanster')}
            >
              Se tjänster
            </button>
          </div>
        </div>
        <div className="hero-stats" style={styles.heroStats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>15+</span>
            <span style={styles.statLabel}>År i branschen</span>
          </div>
          <div className="stat-divider" style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>18+</span>
            <span style={styles.statLabel}>Globala företag testat</span>
          </div>
          <div className="stat-divider" style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>100+</span>
            <span style={styles.statLabel}>Sårbarheter rapporterade</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjanster" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionLabel}>Tjänster</p>
          <h2 className="section-title" style={styles.sectionTitle}>Säkerhet anpassad efter era behov</h2>
          <p style={styles.sectionText}>
            Varje företag har unika utmaningar. Jag erbjuder tjänster som kan anpassas 
            efter er storlek, bransch och mognadsnivå inom säkerhet.
          </p>

          <div className="services-grid" style={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} style={styles.serviceCard}>
                <div style={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</div>
                <h3 style={styles.serviceTitle}>{service.title}</h3>
                <p style={styles.serviceDescription}>{service.description}</p>
                <div style={styles.serviceIncludes}>
                  <p style={styles.includesLabel}>Inkluderar:</p>
                  {service.includes.map((item, i) => (
                    <p key={i} style={styles.includesItem}>— {item}</p>
                  ))}
                </div>
                <div style={styles.serviceFooter}>
                  <span style={styles.servicePrice}>{service.price}</span>
                  <button 
                    style={styles.serviceBtn}
                    onClick={() => scrollToSection('kontakt')}
                  >
                    Begär offert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om" style={styles.sectionAlt}>
        <div style={styles.sectionInner}>
          {/* Profile Header */}
          <div className="profile-header" style={styles.profileHeader}>
            <div className="profile-img-wrapper" style={styles.profileImageWrapper}>
              <img
                src="/profilbild.png"
                alt="Dzevad Hatipovic - Certified Ethical Hacker"
                style={styles.profileImage}
              />
            </div>
            <div style={styles.profileIntro}>
              <p style={styles.sectionLabel}>Om mig</p>
              <h2 className="section-title" style={styles.sectionTitle}>Dzevad Hatipovic</h2>
              <p style={styles.profileTagline}>Certified Ethical Hacker | 15+ års IT-erfarenhet</p>
              <p style={styles.aboutText}>
                Jag har arbetat med IT i över 15 år – från utveckling och drift till 
                säkerhet och arkitektur. Idag fokuserar jag på att hjälpa företag 
                identifiera och åtgärda säkerhetsrisker innan de blir kostsamma incidenter.
              </p>
            </div>
          </div>

          <div className="about-grid" style={styles.aboutGrid}>
            <div style={styles.aboutContent}>
              <p style={styles.aboutText}>
                Som aktiv deltagare på bug bounty-plattformar som HackerOne och Bugcrowd 
                har jag hittat och rapporterat sårbarheter hos några av världens största 
                teknikföretag. Den erfarenheten tar jag med mig till varje uppdrag.
              </p>
              <p style={styles.aboutText}>
                Jag tror på tydlig kommunikation och praktiska rekommendationer. 
                Mina rapporter är skrivna för att förstås av både tekniker och 
                beslutsfattare – inte för att imponera med jargong.
              </p>

              <div style={styles.certifications}>
                <p style={styles.certLabel}>Certifieringar</p>
                <div style={styles.certList}>
                  <a 
                    href="https://coursera.org/verify/professional-cert/GLBE227BHPO9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.certItemLink}
                  >
                    <div style={styles.certItem}>
                      <div style={styles.certHeader}>
                        <span style={styles.certName}>Google Cybersecurity Professional</span>
                        <span style={styles.certVerify}>Verifiera ↗</span>
                      </div>
                      <span style={styles.certMeta}>Coursera | 8 kurser | April 2024</span>
                      <span style={styles.certId}>ID: GLBE227BHPO9</span>
                    </div>
                  </a>
                  <div style={styles.certItem}>
                    <span style={styles.certName}>Cisco Certified Ethical Hacker</span>
                    <span style={styles.certMeta}>Cisco</span>
                  </div>
                </div>
              </div>

              <div style={styles.skillsSection}>
                <p style={styles.certLabel}>Tekniska kompetenser</p>
                <div style={styles.skillsGrid}>
                  <span style={styles.skillTag}>Python</span>
                  <span style={styles.skillTag}>Linux</span>
                  <span style={styles.skillTag}>SQL</span>
                  <span style={styles.skillTag}>SIEM</span>
                  <span style={styles.skillTag}>IDS/IPS</span>
                  <span style={styles.skillTag}>Burp Suite</span>
                  <span style={styles.skillTag}>Nmap</span>
                  <span style={styles.skillTag}>OWASP Top 10</span>
                  <span style={styles.skillTag}>API Security</span>
                  <span style={styles.skillTag}>Network Security</span>
                </div>
              </div>

              <div style={styles.platforms}>
                <p style={styles.certLabel}>Aktiv på</p>
                <div style={styles.platformList}>
                  <span style={styles.platformItem}>HackerOne</span>
                  <span style={styles.platformItem}>Bugcrowd</span>
                </div>
              </div>
            </div>

            <div style={styles.aboutAside}>
              <div style={styles.approachBox}>
                <h3 style={styles.approachTitle}>Mitt tillvägagångssätt</h3>
                <div style={styles.approachItem}>
                  <span style={styles.approachNumber}>01</span>
                  <div>
                    <p style={styles.approachName}>Förstå verksamheten</p>
                    <p style={styles.approachDesc}>Innan jag testar något vill jag förstå vad som är kritiskt för just er.</p>
                  </div>
                </div>
                <div style={styles.approachItem}>
                  <span style={styles.approachNumber}>02</span>
                  <div>
                    <p style={styles.approachName}>Grundlig testning</p>
                    <p style={styles.approachDesc}>Metodisk genomgång med samma tekniker som verkliga angripare använder.</p>
                  </div>
                </div>
                <div style={styles.approachItem}>
                  <span style={styles.approachNumber}>03</span>
                  <div>
                    <p style={styles.approachName}>Tydlig rapport</p>
                    <p style={styles.approachDesc}>Resultat presenterade så att både tekniker och ledning förstår.</p>
                  </div>
                </div>
                <div style={styles.approachItem}>
                  <span style={styles.approachNumber}>04</span>
                  <div>
                    <p style={styles.approachName}>Praktisk åtgärdsplan</p>
                    <p style={styles.approachDesc}>Prioriterade rekommendationer ni kan agera på direkt.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="kunder" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionLabel}>Förtroende</p>
          <h2 className="section-title" style={styles.sectionTitle}>Företag jag har testat</h2>
          <p style={styles.sectionText}>
            Genom bug bounty-program och auktoriserade säkerhetstester har jag identifierat 
            och rapporterat sårbarheter hos dessa organisationer.
          </p>

          <div className="clients-grid" style={styles.clientsGrid}>
            {clients.filter(c => c.tier === 'enterprise').map((client, index) => (
              <div key={index} style={styles.clientCard}>
                <span style={styles.clientName}>{client.name}</span>
              </div>
            ))}
          </div>
          
          <div className="clients-grid-small" style={styles.clientsGridSmall}>
            {clients.filter(c => c.tier !== 'enterprise').map((client, index) => (
              <div key={index} style={styles.clientCardSmall}>
                <span style={styles.clientNameSmall}>{client.name}</span>
              </div>
            ))}
          </div>

          <p style={styles.clientsDisclaimer}>
            Säkerhetstester utförda via officiella bug bounty-program och auktoriserade uppdrag.
          </p>

          {/* Findings Examples */}
          <div style={styles.findingsSection}>
            <p style={styles.certLabel}>Exempel på identifierade sårbarheter</p>
            <div style={styles.findingsGrid}>
              {findings.map((finding, index) => (
                <div key={index} style={styles.findingCard}>
                  <div style={styles.findingHeader}>
                    <span style={styles.findingType}>{finding.type}</span>
                    <span style={{
                      ...styles.findingSeverity,
                      backgroundColor: finding.severity === 'High' ? '#fee2e2' : '#fef3c7',
                      color: finding.severity === 'High' ? '#991b1b' : '#92400e'
                    }}>{finding.severity}</span>
                  </div>
                  <p style={styles.findingDesc}>{finding.description}</p>
                  <p style={styles.findingCompany}>{finding.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="omdomen" style={styles.sectionAlt}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionLabel}>Omdömen</p>
          <h2 className="section-title" style={styles.sectionTitle}>Feedback från säkerhetsteam</h2>
          <p style={styles.sectionText}>
            Respons från säkerhetsteam hos globala teknikföretag efter rapporterade sårbarheter
            via auktoriserade bug bounty-program.
          </p>

          <div className="testimonials-grid" style={styles.testimonialsGrid}>
            {testimonials.map((item, index) => (
              <div key={index} style={styles.testimonialCard}>
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.testimonialQuote}>{item.quote}</p>
                <div style={styles.testimonialMeta}>
                  <p style={styles.testimonialSource}>{item.source}</p>
                  <p style={styles.testimonialContext}>{item.context}</p>
                  <span style={styles.testimonialPlatform}>{item.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="nyheter" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionLabel}>Nyheter</p>
          <h2 className="section-title" style={styles.sectionTitle}>IT-säkerhet i Sverige</h2>
          <p style={styles.sectionText}>
            Aktuella händelser, trender och praktiska tips för att hålla er verksamhet säker.
          </p>

          <div className="news-grid" style={styles.newsGrid}>
            {news.slice(0, 3).map((item, index) => (
              <article key={index} style={styles.newsCard}>
                <div style={styles.newsMeta}>
                  <span style={styles.newsCategory}>{item.category}</span>
                  <span style={styles.newsDate}>{item.date}</span>
                </div>
                <h3 style={styles.newsTitle}>{item.title}</h3>
                <p style={styles.newsExcerpt}>{item.excerpt}</p>
                <div style={styles.newsFooter}>
                  {item.source && <span style={styles.newsSource}>{item.source}</span>}
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.newsLink}>Läs mer</a>
                  ) : (
                    <span style={styles.newsLink}>Läs mer</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" style={styles.section}>
        <div style={styles.sectionInner}>
          <div className="contact-grid" style={styles.contactGrid}>
            <div style={styles.contactInfo}>
              <p style={styles.sectionLabel}>Kontakt</p>
              <h2 className="section-title" style={styles.sectionTitle}>Boka en kostnadsfri konsultation</h2>
              <p style={styles.contactText}>
                Under ett 30-minuters samtal går vi igenom er nuvarande situation, 
                identifierar de största riskerna och diskuterar hur jag kan hjälpa er.
              </p>
              <p style={styles.contactText}>
                Inget säljtryck, inga förpliktelser – bara ett ärligt samtal om 
                er säkerhet.
              </p>

              <div style={styles.contactDetails}>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>E-post</span>
                  <a href="mailto:dado.cybersec@gmail.com" style={styles.contactValue}>dado.cybersec@gmail.com</a>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Baserad i</span>
                  <span style={styles.contactValue}>Halland, Sverige</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Arbetar</span>
                  <span style={styles.contactValue}>Hela Sverige, remote eller på plats</span>
                </div>
              </div>
            </div>

            <div style={styles.contactForm}>
              {formSubmitted ? (
                <div style={styles.formSuccess}>
                  <p style={styles.successTitle}>Tack för ditt meddelande</p>
                  <p style={styles.successText}>Jag återkommer inom 24 timmar.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Namn</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>E-post</label>
                    <input
                      type="email"
                      style={styles.formInput}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Företag</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Meddelande</label>
                    <textarea
                      style={styles.formTextarea}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Beskriv kort vad ni behöver hjälp med"
                    />
                  </div>
                  <button type="submit" style={styles.formSubmit}>
                    Skicka meddelande
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="footer-inner" style={styles.footerInner}>
          <div style={styles.footerMain}>
            <div style={styles.footerBrand}>
              <span style={styles.logoText}>DADO</span>
              <span style={styles.logoDot}>.</span>
              <span style={styles.logoSub}>CYBERSEC</span>
            </div>
            <p style={styles.footerText}>
              IT-säkerhetskonsult specialiserad på penetrationstestning, 
              kodgranskning och säkerhetsutbildning för svenska företag.
            </p>
          </div>
          <div className="footer-links" style={styles.footerLinks}>
            <div style={styles.footerCol}>
              <p style={styles.footerColTitle}>Tjänster</p>
              <p style={{...styles.footerLink, cursor: 'pointer'}} onClick={() => scrollToSection('tjanster')}>Penetrationstestning</p>
              <p style={{...styles.footerLink, cursor: 'pointer'}} onClick={() => scrollToSection('tjanster')}>Kodgranskning</p>
              <p style={{...styles.footerLink, cursor: 'pointer'}} onClick={() => scrollToSection('tjanster')}>Säkerhetsutbildning</p>
              <p style={{...styles.footerLink, cursor: 'pointer'}} onClick={() => scrollToSection('tjanster')}>Rådgivning</p>
            </div>
            <div style={styles.footerCol}>
              <p style={styles.footerColTitle}>Kontakt</p>
              <a href="mailto:dado.cybersec@gmail.com" style={styles.footerLink}>dado.cybersec@gmail.com</a>
              <a href="https://www.linkedin.com/in/dzevad-dado-hatipovic-ab0637205" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>LinkedIn</a>
              <a href="https://www.hackerone.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>HackerOne</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>&copy; 2026 Dado.Cybersec. Alla rättigheter förbehållna.</p>
        </div>
      </footer>
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
    lineHeight: 1.6,
    minHeight: '100vh',
  },
  
  // Navigation
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(250, 250, 250, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e5e5e5',
    zIndex: 100,
  },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
  },
  logoDot: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2563eb',
  },
  logoSub: {
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    color: '#666',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    cursor: 'pointer',
    padding: '8px 0',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    color: '#1a1a1a',
  },
  navCta: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    borderTop: '1px solid #e5e5e5',
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '12px 0',
    fontSize: '16px',
    color: '#1a1a1a',
    cursor: 'pointer',
    borderBottom: '1px solid #e5e5e5',
  },

  // Hero
  hero: {
    paddingTop: '140px',
    paddingBottom: '80px',
    paddingLeft: '24px',
    paddingRight: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2563eb',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '700',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: '#1a1a1a',
    marginBottom: '24px',
  },
  heroAccent: {
    color: '#404040',
  },
  heroText: {
    fontSize: '18px',
    color: '#666',
    maxWidth: '600px',
    marginBottom: '32px',
    lineHeight: 1.7,
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#1a1a1a',
    border: '1px solid #d4d4d4',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  heroStats: {
    display: 'flex',
    gap: '48px',
    marginTop: '80px',
    paddingTop: '40px',
    borderTop: '1px solid #e5e5e5',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
  statDivider: {
    width: '1px',
    backgroundColor: '#e5e5e5',
  },

  // Sections
  section: {
    padding: '100px 24px',
    backgroundColor: '#fff',
  },
  sectionAlt: {
    padding: '100px 24px',
    backgroundColor: '#f5f5f5',
  },
  sectionInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2563eb',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '40px',
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  sectionText: {
    fontSize: '17px',
    color: '#666',
    maxWidth: '600px',
    marginBottom: '48px',
    lineHeight: 1.7,
  },

  // Services
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  serviceCard: {
    backgroundColor: '#fafafa',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
  },
  serviceNumber: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#999',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  serviceDescription: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  serviceIncludes: {
    marginBottom: '24px',
    flex: 1,
  },
  includesLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  includesItem: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '6px',
  },
  serviceFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    borderTop: '1px solid #e5e5e5',
  },
  servicePrice: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  serviceBtn: {
    backgroundColor: 'transparent',
    color: '#1a1a1a',
    border: '1px solid #d4d4d4',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  // About - Profile Header
  profileHeader: {
    display: 'flex',
    gap: '48px',
    alignItems: 'flex-start',
    marginBottom: '48px',
  },
  profileImageWrapper: {
    flexShrink: 0,
    width: '280px',
    height: '280px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '4px solid #fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
  },
  profileIntro: {
    flex: 1,
    paddingTop: '16px',
  },
  profileTagline: {
    fontSize: '18px',
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: '24px',
    letterSpacing: '-0.01em',
  },

  // About Grid
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '64px',
  },
  aboutContent: {},
  aboutText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: 1.7,
  },
  certifications: {
    marginTop: '40px',
    marginBottom: '32px',
  },
  certLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '16px',
  },
  certList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  certItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '6px',
  },
  certName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  certMeta: {
    fontSize: '13px',
    color: '#666',
  },
  certId: {
    fontSize: '12px',
    color: '#999',
    fontFamily: 'monospace',
  },
  certItemLink: {
    textDecoration: 'none',
    display: 'block',
  },
  certHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certVerify: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#2563eb',
  },
  skillsSection: {
    marginBottom: '32px',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skillTag: {
    padding: '6px 14px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
  },
  platforms: {},
  platformList: {
    display: 'flex',
    gap: '12px',
  },
  platformItem: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  aboutAside: {},
  approachBox: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '32px',
  },
  approachTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '24px',
  },
  approachItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  approachNumber: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2563eb',
    minWidth: '24px',
  },
  approachName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  approachDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.5,
  },

  // Clients
  clientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '16px',
  },
  clientCard: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '32px 24px',
    textAlign: 'center',
  },
  clientName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  clientsGridSmall: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
    marginBottom: '32px',
  },
  clientCardSmall: {
    backgroundColor: '#fafafa',
    border: '1px solid #e5e5e5',
    borderRadius: '6px',
    padding: '16px',
    textAlign: 'center',
  },
  clientNameSmall: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
  },
  clientsDisclaimer: {
    fontSize: '13px',
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Findings
  findingsSection: {
    marginTop: '48px',
    paddingTop: '48px',
    borderTop: '1px solid #e5e5e5',
  },
  findingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  findingCard: {
    backgroundColor: '#fafafa',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '20px',
  },
  findingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  findingType: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  findingSeverity: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  findingDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.5,
    marginBottom: '12px',
  },
  findingCompany: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
  },

  // News
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  newsCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '28px',
  },
  newsMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  newsCategory: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  newsDate: {
    fontSize: '13px',
    color: '#999',
  },
  newsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  newsExcerpt: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  newsFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '500',
  },
  newsLink: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },

  // Contact
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '64px',
  },
  contactInfo: {},
  contactText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: 1.7,
  },
  contactDetails: {
    marginTop: '40px',
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '20px',
  },
  contactLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  contactValue: {
    fontSize: '16px',
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  contactForm: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '32px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '8px',
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #d4d4d4',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  formTextarea: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #d4d4d4',
    borderRadius: '6px',
    backgroundColor: '#fff',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  formSubmit: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  formSuccess: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  successText: {
    fontSize: '15px',
    color: '#666',
  },

  // Footer
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '64px 24px 32px',
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '64px',
    marginBottom: '48px',
  },
  footerMain: {},
  footerBrand: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
    marginBottom: '16px',
  },
  footerText: {
    fontSize: '14px',
    color: '#999',
    maxWidth: '300px',
    lineHeight: 1.6,
  },
  footerLinks: {
    display: 'contents',
  },
  footerCol: {},
  footerColTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '16px',
  },
  footerLink: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '32px',
    borderTop: '1px solid #333',
  },
  footerCopy: {
    fontSize: '13px',
    color: '#666',
  },

  // Testimonials
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
  },
  quoteIcon: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#2563eb',
    lineHeight: 1,
    marginBottom: '8px',
  },
  testimonialQuote: {
    fontSize: '15px',
    color: '#444',
    lineHeight: 1.7,
    fontStyle: 'italic',
    marginBottom: '24px',
    flex: 1,
  },
  testimonialMeta: {
    paddingTop: '16px',
    borderTop: '1px solid #e5e5e5',
  },
  testimonialSource: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  testimonialContext: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
  },
  testimonialPlatform: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};
