import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { translations, projectsData, projectFilterOptions } from './data/translations'

function App() {
  const [lang, setLang] = useState<'es' | 'en'>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en')) return 'en';
    return 'es';
  });

  const [activeSection, setActiveSection] = useState('hero')
  const [activeProjectFilter, setActiveProjectFilter] = useState('Todos')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [showNav, setShowNav] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const t = translations[lang];

  const handleLanguageChange = (newLang: 'es' | 'en') => {
    if (newLang === lang) return;
    setLang(newLang);
    setActiveProjectFilter(newLang === 'es' ? 'Todos' : 'All');
    const newPath = newLang === 'en' ? '/en' : '/es';
    if (window.location.pathname !== newPath) {
      window.history.pushState({ lang: newLang }, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/en')) {
        setLang('en');
        setActiveProjectFilter('All');
      } else {
        setLang('es');
        setActiveProjectFilter('Todos');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true)
      } else {
        setShowNav(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentFilterOptions = projectFilterOptions[lang];

  const filteredProjects = projectsData.filter(p => {
    if (activeProjectFilter === 'Todos' || activeProjectFilter === 'All') return true;
    const esTags = p.tags.es;
    const enTags = p.tags.en;
    return esTags.includes(activeProjectFilter) || enTags.includes(activeProjectFilter);
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.5 })

    const sections = ['hero', 'work', 'services', 'about', 'contact']
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const heroScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const contentScale = useTransform(smoothProgress, [0, 1], [1, 0.88]);
  const contentOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -40]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/rafaelaguirre92@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: lang === 'en' ? "New message from portfolio" : "Nuevo mensaje desde tu portafolio",
            _template: "box"
        })
      });
      
      if (response.ok) {
        setFormStatus('success');
        e.currentTarget.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const navLinkClass = (id: string) => `font-['Plus_Jakarta_Sans'] font-bold tracking-tight transition-colors ${
    activeSection === id ? 'text-[#0FBDBD] border-b-2 border-[#0FBDBD] pb-1' : 'text-zinc-400 hover:text-zinc-100'
  }`

  const LanguageSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`inline-flex items-center p-1 rounded-full bg-surface-container-high/80 border border-outline-variant/50 backdrop-blur-md ${className}`}>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1 text-xs font-headline font-bold rounded-full transition-all ${
          lang === 'es'
            ? 'bg-[#0FBDBD] text-zinc-950 shadow-md shadow-[#0FBDBD]/20'
            : 'text-zinc-400 hover:text-zinc-100'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-xs font-headline font-bold rounded-full transition-all ${
          lang === 'en'
            ? 'bg-[#0FBDBD] text-zinc-950 shadow-md shadow-[#0FBDBD]/20'
            : 'text-zinc-400 hover:text-zinc-100'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      
{/* Top Navigation Bar */}
<motion.nav 
  initial={{ y: -100, opacity: 0 }}
  animate={showNav ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="fixed top-0 w-full z-50 bg-zinc-950/60 backdrop-blur-xl shadow-2xl shadow-black/50"
>
  <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
    <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="text-xl font-headline font-black tracking-tighter text-zinc-100">
      RAFA AGUIRRE
    </a>
    <div className="hidden md:flex gap-8 items-center">
      <a className={navLinkClass('about')} href="#about" onClick={(e) => handleScroll(e, 'about')}>{t.nav.about}</a>
      <a className={navLinkClass('services')} href="#services" onClick={(e) => handleScroll(e, 'services')}>{t.nav.services}</a>
      <a className={navLinkClass('work')} href="#work" onClick={(e) => handleScroll(e, 'work')}>{t.nav.work}</a>
      <a className={navLinkClass('contact')} href="#contact" onClick={(e) => handleScroll(e, 'contact')}>{t.nav.contact}</a>
      <LanguageSwitcher />
    </div>
    {/* Mobile Language Switcher + Toggle */}
    <div className="flex md:hidden items-center gap-4">
      <LanguageSwitcher />
      <button className="text-on-surface">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </div>
  </div>
</motion.nav>

{/* Hero Anchor for Observers */}
<div id="hero" className="absolute top-0 h-10 w-full pointer-events-none" />

{/* Hero Container */}
<div ref={heroScrollRef} className="md:h-screen h-auto w-full relative z-0">
  {/* Static fixed header background (Desktop only) */}
  <header className="md:fixed relative top-0 left-0 w-full md:h-screen py-20 md:py-0 flex items-center px-8 z-0">
    {/* Animated content only (Controlled by isMobile) */}
    <motion.div 
      style={!isMobile ? { scale: contentScale, opacity: contentOpacity, y: contentY, willChange: 'transform, opacity' } : {}}
      className="grid md:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto transform-gpu"
    >
      <motion.div 
        className="md:col-span-7 z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-4">
          <LanguageSwitcher />
        </div>

        <motion.h1 
          className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          RAFA <br/> <span className="text-primary">AGUIRRE</span>
        </motion.h1>
        <motion.p 
          className="font-headline text-2xl md:text-3xl font-bold text-on-surface-variant mb-8 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t.hero.role}
        </motion.p>
        <motion.p 
          className="text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t.hero.bio}
        </motion.p>
        <motion.div 
          className="flex gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a className="text-on-surface-variant hover:text-primary transition-all group" href="https://mx.linkedin.com/in/rafael-aguirre-22028773" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-all group" href="https://www.instagram.com/rasaved/" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-all group" href="https://github.com/rafaelaguirre92-cmyk" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 1.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </motion.div>
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a className="bg-primary hover:bg-primary-fixed-dim text-on-primary px-10 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2 group" href="#work" onClick={(e) => handleScroll(e, 'work')}>
            {t.hero.ctaProjects}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </motion.div>
      </motion.div>
      <motion.div 
        className="md:col-span-5 relative group"
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute -inset-x-32 -inset-y-4 bg-[#0FBDBD]/20 blur-[120px] rounded-full opacity-80 pointer-events-none transform-gpu"></div>
        <div className="absolute -inset-10 bg-[#0FBDBD]/10 blur-[80px] rounded-full opacity-100 pointer-events-none transform-gpu"></div>
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-container-low border border-outline-variant">
          <img alt="Rafa Aguirre" className="w-full h-full object-cover transition-all duration-700" src="/my_photo.jpg"/>
        </div>
      </motion.div>
    </motion.div>
  </header>
</div>

<main className="relative z-10 bg-zinc-950 md:mt-0 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
  {/* About Section */}
  <section className="py-32 px-8 bg-surface-container-low relative" id="about">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
  <div>
  <span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">{t.about.sectionTag}</span>
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant mb-6">
  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
  <span className="text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">{t.about.badge}</span>
  </div>
  <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">{t.about.titlePrefix}<br/> <span className="text-stroke">{t.about.titleHighlight}</span></h2>
  <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
  <p>{t.about.p1}</p>
  <p>{t.about.p2}</p>
  </div>
  </div>
  <div className="grid grid-cols-1 gap-8">
  <div className="p-8 rounded-xl bg-surface-container-high border border-outline-variant/30">
  <h3 className="font-headline text-xl font-bold mb-8 flex items-center gap-3">
  <span className="material-symbols-outlined text-primary">terminal</span>
                          {t.about.stackTitle}
                      </h3>
  <div className="flex flex-wrap gap-3" id="skills">
  {[
    { icon: 'hub', name: 'HubSpot' },
    { icon: 'language', name: 'WordPress' },
    { icon: 'web', name: 'Wix' },
    { icon: 'shopping_cart', name: 'Shopify' },
    { icon: 'campaign', name: 'Meta Ads' },
    { icon: 'ads_click', name: 'Google Ads' },
    { icon: 'search', name: 'SEO' },
    { icon: 'analytics', name: 'Google Analytics' },
    { icon: 'label', name: 'Google Tag Manager' },
    { icon: 'dashboard', name: 'Looker Studio' },
    { icon: 'query_stats', name: 'Semrush' },
    { icon: 'draw', name: 'Figma' },
    { icon: 'photo_filter', name: 'Photoshop' },
    { icon: 'brush', name: 'Illustrator' },
    { icon: 'movie_filter', name: 'Premiere' },
    { icon: 'auto_fix_high', name: 'After Effects' },
    { icon: 'article', name: 'Notion' },
    { icon: 'mail', name: 'Klaviyo' },
    { icon: 'psychology', name: 'IA' }
  ].map((skill, idx) => (
    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
      <span className="material-symbols-outlined text-sm">{skill.icon}</span>
      <span className="font-label text-sm">{skill.name}</span>
    </div>
  ))}
  </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
  <span className="block text-4xl font-headline font-black text-primary mb-2">+100</span>
  <span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">{t.about.metrics.campaigns}</span>
  </div>
  <div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
  <span className="block text-4xl font-headline font-black text-primary mb-2">+$50M</span>
  <span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">{t.about.metrics.managed}</span>
  </div>
  <div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
  <span className="block text-4xl font-headline font-black text-primary mb-2">+10</span>
  <span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">{t.about.metrics.projects}</span>
  </div>
  </div>
  </div>
  </div>
  </section>

  {/* Services Section */}
  <section className="py-32 px-8" id="services">
  <div className="max-w-7xl mx-auto">
  <div className="mb-20">
  <span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">{t.services.sectionTag}</span>
  <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">{t.services.title}</h2>
  </div>
  <div className="grid md:grid-cols-3 gap-4">
  {t.services.items.map((service, idx) => (
    <div key={idx} className="p-10 bg-surface-container hover:bg-surface-container-high transition-colors group service-card">
      <span className="material-symbols-outlined text-4xl text-primary mb-6">{service.icon}</span>
      <h3 className="text-2xl font-headline font-bold mb-4">{service.title}</h3>
      <p className="text-on-surface-variant leading-relaxed mb-6">{service.description}</p>
    </div>
  ))}
  </div>
  </div>
  </section>

  {/* Methodology Section */}
  <section className="py-32 px-8 bg-zinc-950/40 border-y border-outline-variant/10" id="methodology">
  <div className="max-w-7xl mx-auto">
  <div className="mb-24 text-center md:text-left">
  <span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">{t.methodology.sectionTag}</span>
  <h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">{t.methodology.titlePrefix}<span className="text-primary">{t.methodology.titleHighlight}</span></h2>
  <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
  {t.methodology.description}
  </p>
  </div>

  <div className="relative pt-4">
  <div className="absolute top-12 left-8 md:left-8 md:top-12 w-[2px] h-[calc(100%-6rem)] md:w-[calc(100%-4rem)] md:h-[2px] bg-surface-container-high rounded-full overflow-hidden">
    <div className="w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-primary/80 via-primary/20 to-transparent"></div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-6 relative z-10">
  {t.methodology.steps.map((step, idx) => (
  <div key={idx} className="relative flex flex-row md:flex-col items-start gap-6 group">
    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-zinc-950 border-2 border-surface-container-highest group-hover:bg-surface-container-low group-hover:border-primary shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(15,189,189,0.3)] transition-all duration-300 relative z-10">
      <span className="font-headline font-bold text-xl text-on-surface-variant group-hover:text-primary transition-colors">{step.num}</span>
    </div>
    <div className="pt-2 md:pt-6 md:text-center w-full">
      <h3 className="font-headline font-bold text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
        {step.title}
      </h3>
      <p className="text-on-surface-variant text-sm md:text-sm leading-relaxed">{step.desc}</p>
    </div>
  </div>
  ))}
  </div>
  </div>
  </div>
  </section>

  {/* Projects Section */}
  <section className="py-32 px-8 bg-surface-container-lowest" id="work">
  <div className="max-w-7xl mx-auto">
  <div className="flex flex-col mb-16 gap-8">
  <div>
  <span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">{t.projects.sectionTag}</span>
  <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">{t.projects.title}</h2>
  </div>
  <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 no-scrollbar">
  {currentFilterOptions.map(filter => (
  <button 
    key={filter}
    onClick={() => setActiveProjectFilter(filter)}
    className={`px-6 py-2 rounded-full border font-bold text-sm whitespace-nowrap project-filter-btn transition-colors ${
      activeProjectFilter === filter 
        ? 'border-primary text-primary bg-primary/10' 
        : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
    }`}
  >
    {filter}
  </button>
  ))}
  </div>
  </div>
  <div className="grid md:grid-cols-3 gap-8">
  <AnimatePresence>
  {filteredProjects.map((project) => (
  <motion.article 
    key={project.title}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="project-card group bg-surface-container rounded-xl overflow-hidden hover:border-primary transition-colors duration-500 border border-transparent"
  >
  <div className="aspect-video overflow-hidden">
  <img alt={project.title} className="project-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={project.image}/>
  </div>
  <div className="p-8">
  <div className="flex justify-between items-start mb-3">
    <span className="font-label text-[10px] uppercase tracking-widest text-primary font-black">{project.category}</span>
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group/link"
      title={t.projects.visitSite}
    >
      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
    </a>
  </div>
  <h3 className="text-2xl font-headline font-bold mb-4">{project.title}</h3>
  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{project.description[lang]}</p>
  <div className="flex flex-wrap gap-2 mb-6">
  {project.tags[lang].map(tag => (
  <span key={tag} className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant">{tag}</span>
  ))}
  </div>
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center gap-2 text-primary font-bold text-sm group/btn"
  >
    {t.projects.visitSite}
    <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_outward</span>
  </a>
  </div>
  </motion.article>
  ))}
  </AnimatePresence>
  </div>
  </div>
  </section>

  {/* Contact Section */}
  <section className="py-32 px-8" id="contact">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
  <div>
  <span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">{t.contact.sectionTag}</span>
  <h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">{t.contact.titlePrefix}<span className="text-primary">{t.contact.titleHighlight}</span></h2>
  <p className="text-xl text-on-surface-variant mb-12 leading-relaxed max-w-md">
    {t.contact.description}
  </p>
  <div className="space-y-6">
  <a className="flex items-center gap-4 text-2xl font-headline font-bold text-on-surface hover:text-primary transition-colors" href="mailto:rafaelaguirre92@gmail.com">
  <span className="material-symbols-outlined text-primary">mail</span>
                          rafaelaguirre92@gmail.com
                      </a>
  <div className="flex gap-6">
  <a className="px-6 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all font-bold gap-2" href={t.contact.cvPath} download="Rafael_Aguirre_CV.pdf">
  <span className="material-symbols-outlined">download</span>
                              {t.contact.downloadCv}
                          </a>
  </div>
  </div>
  </div>
  <div className="bg-surface-container-high p-10 rounded-2xl border border-outline-variant/30">
  <form onSubmit={handleContactSubmit} className="space-y-6">
  <div>
  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">{t.contact.formName}</label>
  <input name="name" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none disabled:opacity-50" placeholder={t.contact.placeholderName} type="text" disabled={formStatus === 'submitting' || formStatus === 'success'}/>
  </div>
  <div>
  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">{t.contact.formEmail}</label>
  <input name="email" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none disabled:opacity-50" placeholder={t.contact.placeholderEmail} type="email" disabled={formStatus === 'submitting' || formStatus === 'success'}/>
  </div>
  <div>
  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">{t.contact.formMessage}</label>
  <textarea name="message" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none resize-none disabled:opacity-50" placeholder={t.contact.placeholderMessage} rows={4} disabled={formStatus === 'submitting' || formStatus === 'success'}></textarea>
  </div>
  <button type="submit" disabled={formStatus === 'submitting' || formStatus === 'success'} className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed">
                          {formStatus === 'submitting' ? t.contact.submitSubmitting : formStatus === 'success' ? t.contact.submitSuccess : t.contact.submitIdle}
                          {formStatus === 'submitting' ? (
                            <span className="material-symbols-outlined animate-spin">refresh</span>
                          ) : formStatus === 'success' ? (
                            <span className="material-symbols-outlined">check_circle</span>
                          ) : (
                            <span className="material-symbols-outlined">arrow_forward</span>
                          )}
  </button>
  {formStatus === 'success' && (
    <p className="text-primary text-sm font-bold text-center animate-pulse">{t.contact.successMsg}</p>
  )}
  {formStatus === 'error' && (
    <p className="text-red-400 text-sm font-bold text-center">{t.contact.errorMsg}</p>
  )}
  </form>
  </div>
  </div>
  </section>
</main>

    </>
  )
}

export default App
