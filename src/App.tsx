import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projectsData = [
  {
    category: 'Salud',
    title: 'Vaxicare',
    description: 'Servicio integral de marketing digital para una marca de servicios de vacunación. Diseño y desarrollo del sitio web, identidad de marca, estrategia y gestión de redes sociales, campañas de pauta digital, posicionamiento SEO, creación de blogs y estrategia de email marketing.',
    image: '/Vaxicare.jpg',
    tags: ['Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Identidad', 'Email Marketing', 'Contenido'],
    link: 'https://vaxicare.mx/'
  },
  {
    category: 'ONG / Bienestar',
    title: 'Trauma Free World',
    description: 'Desarrollo de un sitio web institucional y una plataforma de cursos en línea para una organización enfocada en bienestar y salud emocional. El reto fue crear un ecosistema digital que combinara la comunicación de la causa con una experiencia de aprendizaje accesible.',
    image: '/Trauma-Free-World.jpg',
    tags: ['Diseño Web'],
    link: 'https://www.unmundolibredetrauma.com/'
  },
  {
    category: 'Educación',
    title: 'IUCLA',
    description: 'Diseño y desarrollo web para una institución educativa. Interfaz clara, profesional y orientada a la captación de prospectos, reflejando los valores y la oferta académica de la institución.',
    image: '/iucla.jpg',
    tags: ['Diseño Web'],
    link: 'http://iucla.edu.mx/'
  },
  {
    category: 'E-commerce',
    title: 'Tío Grill',
    description: 'Estrategia integral de marketing digital para un e-commerce de asadores. Desarrollo de la tienda en línea, identidad de marca, gestión de redes sociales, campañas de pauta digital enfocadas en conversión, estrategia SEO y email marketing para retención y recompra.',
    image: '/tio grill.jpg',
    tags: ['Diseño Web', 'E-commerce', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Identidad', 'Email Marketing'],
    link: 'https://tiogrill.com/?srsltid=AfmBOorS3gfT6hit2ln_8GfbI1cOOHjTNCdbpFEtQz88ztvIyu8IW4Bh'
  },
  {
    category: 'Iglesia Cristiana',
    title: 'Familia de Fe',
    description: 'Diseño web y estrategia SEO para una iglesia cristiana. Sitio que comunica la identidad de la congregación y facilita la conexión con su comunidad, optimizado para búsquedas locales.',
    image: '/familia-de-fe.jpg',
    tags: ['Diseño Web', 'SEO'],
    link: 'https://iglesiafamiliadefe.org/'
  },
  {
    category: 'Iglesia Cristiana',
    title: 'Iglesia Pilar',
    description: 'Diseño web y posicionamiento SEO para una iglesia cristiana. Sitio funcional y accesible como punto de contacto digital para miembros y visitantes, con optimización para búsqueda orgánica.',
    image: '/iglesia-pilar.jpg',
    tags: ['Diseño Web', 'SEO'],
    link: 'https://www.iglesiapilar.mx/'
  },
  {
    category: 'Industria B2B',
    title: 'MEP Industrial',
    description: 'Diseño y desarrollo web para una empresa del sector industrial. Enfocado en comunicar profesionalismo, mostrar servicios y generar confianza con clientes potenciales del sector B2B.',
    image: '/mep.jpg',
    tags: ['Diseño Web'],
    link: 'https://www.mepindustrial.com.mx/'
  },
  {
    category: 'Educación',
    title: 'Bright School',
    description: 'Servicio integral de marketing digital para una institución educativa. Diseño web, gestión de redes sociales, campañas de pauta digital, estrategia SEO, creación de blogs y email marketing orientados a la captación de alumnos y el posicionamiento de marca.',
    image: '/bright school.jpg',
    tags: ['Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Email Marketing', 'Contenido'],
    link: 'https://brightschool.mx/'
  },
  {
    category: 'Equipo médico B2B',
    title: 'SEJ',
    description: 'Diseño web, campañas de pauta digital, estrategia SEO y creación de blogs para una empresa que comercializa equipo médico a hospitales. Presencia web profesional con campañas de adquisición B2B y contenido especializado para posicionamiento en un mercado de nicho.',
    image: '/Sej.png',
    tags: ['Diseño Web', 'SEO', 'Pauta Digital', 'Contenido'],
    link: 'https://www.saludenjapones.com/'
  }
];

const projectFilters = ['Todos', 'Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Email Marketing', 'Identidad', 'Contenido', 'E-commerce'];

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [activeProjectFilter, setActiveProjectFilter] = useState('Todos')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const filteredProjects = activeProjectFilter === 'Todos' 
    ? projectsData 
    : projectsData.filter(p => p.tags.includes(activeProjectFilter));


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
            _subject: "Nuevo mensaje desde tu portafolio",
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
    } catch (error) {
      setFormStatus('error');
    }
  };

  const navLinkClass = (id: string) => `font-['Plus_Jakarta_Sans'] font-bold tracking-tight transition-colors ${
    activeSection === id ? 'text-[#0FBDBD] border-b-2 border-[#0FBDBD] pb-1' : 'text-zinc-400 hover:text-zinc-100'
  }`

  return (
    <>
      
{/* Top Navigation Bar */}
<nav className="fixed top-0 w-full z-50 bg-zinc-950/60 backdrop-blur-xl shadow-2xl shadow-black/50">
<div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
<a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="text-xl font-headline font-black tracking-tighter text-zinc-100">RAFA AGUIRRE</a>
<div className="hidden md:flex gap-8 items-center">
<a className={navLinkClass('about')} href="#about" onClick={(e) => handleScroll(e, 'about')}>Sobre mí</a>
<a className={navLinkClass('services')} href="#services" onClick={(e) => handleScroll(e, 'services')}>Servicios</a>
<a className={navLinkClass('work')} href="#work" onClick={(e) => handleScroll(e, 'work')}>Proyectos</a>
<a className={navLinkClass('contact')} href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contacto</a>
</div>
{/* Mobile Toggle */}
<button className="md:hidden text-on-surface">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>

{/* Hero Section */}
<header id="hero" className="relative min-h-screen flex items-center pt-24 px-8 max-w-7xl mx-auto overflow-visible">
<div className="grid md:grid-cols-12 gap-12 items-center w-full">
<motion.div 
  className="md:col-span-7 z-10"
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
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
                    Marketing y Estrategia Digital
</motion.p>
<motion.p 
  className="text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
>
                    Convierto objetivos de negocio en campañas digitales con resultados medibles. Planeo, ejecuto y mido estrategias que conectan marcas con su audiencia.
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
<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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
<a className="bg-primary hover:bg-primary-fixed-dim text-on-primary px-10 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2 group" href="#work">
                        Ver proyectos
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
<div className="absolute -inset-x-32 -inset-y-4 bg-[#0FBDBD]/20 blur-[120px] rounded-full opacity-80 transition-opacity"></div>
<div className="absolute -inset-10 bg-[#0FBDBD]/10 blur-[80px] rounded-full opacity-100 transition-opacity"></div>
<div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-container-low border border-outline-variant">
<img alt="Rafa Aguirre" className="w-full h-full object-cover transition-all duration-700" src="/my_photo.jpg"/>
</div>
</motion.div>
</div>

</header>
{/* About Section */}
<section className="py-32 px-8 bg-surface-container-low relative z-20" id="about">
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
<div>
<span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">Sobre mí</span>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant mb-6">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Estrategia + Ejecución Digital</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Arquitecto de <br/> <span className="text-stroke">Autoridad Digital.</span></h2>
<div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
<p>Estratega digital y gestor de proyectos con más de 10 años de experiencia en marketing, campañas multicanal y coordinación de proyectos digitales. Gestiono proyectos de principio a fin — desde la planeación estratégica y el brief creativo hasta la medición de resultados.</p>
<p>Me apasiona conectar los objetivos de negocio con la ejecución digital, trabajando con equipos multidisciplinarios y agencias para entregar campañas con impacto real.</p>
</div>
</div>
<div className="grid grid-cols-1 gap-8">
<div className="p-8 rounded-xl bg-surface-container-high border border-outline-variant/30">
<h3 className="font-headline text-xl font-bold mb-8 flex items-center gap-3">
<span className="material-symbols-outlined text-primary">terminal</span>
                        Stack Tecnológico
                    </h3>
<div className="flex flex-wrap gap-3" id="skills">
{/* HubSpot */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">hub</span>
<span className="font-label text-sm">HubSpot</span>
</div>
{/* WordPress */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">language</span>
<span className="font-label text-sm">WordPress</span>
</div>
{/* Wix */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">web</span>
<span className="font-label text-sm">Wix</span>
</div>
{/* Shopify */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">shopping_cart</span>
<span className="font-label text-sm">Shopify</span>
</div>
{/* Meta Ads */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">campaign</span>
<span className="font-label text-sm">Meta Ads</span>
</div>
{/* Google Ads */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">ads_click</span>
<span className="font-label text-sm">Google Ads</span>
</div>
{/* SEO */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">search</span>
<span className="font-label text-sm">SEO</span>
</div>
{/* Google Analytics */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">analytics</span>
<span className="font-label text-sm">Google Analytics</span>
</div>
{/* Google Tag Manager */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">label</span>
<span className="font-label text-sm">Google Tag Manager</span>
</div>
{/* Looker Studio */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">dashboard</span>
<span className="font-label text-sm">Looker Studio</span>
</div>
{/* Semrush */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">query_stats</span>
<span className="font-label text-sm">Semrush</span>
</div>

{/* Figma */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">draw</span>
<span className="font-label text-sm">Figma</span>
</div>
{/* Photoshop */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">photo_filter</span>
<span className="font-label text-sm">Photoshop</span>
</div>
{/* Illustrator */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">brush</span>
<span className="font-label text-sm">Illustrator</span>
</div>
{/* Premiere */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">movie_filter</span>
<span className="font-label text-sm">Premiere</span>
</div>
{/* After Effects */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">auto_fix_high</span>
<span className="font-label text-sm">After Effects</span>
</div>
{/* Notion */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">article</span>
<span className="font-label text-sm">Notion</span>
</div>
{/* Klaviyo */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">mail</span>
<span className="font-label text-sm">Klaviyo</span>
</div>
{/* IA */}
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full border border-outline-variant hover:border-primary transition-colors cursor-default">
<span className="material-symbols-outlined text-sm">psychology</span>
<span className="font-label text-sm">IA</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
<span className="block text-4xl font-headline font-black text-primary mb-2">+100</span>
<span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">Campañas Multicanal</span>
</div>
<div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
<span className="block text-4xl font-headline font-black text-primary mb-2">+$50M</span>
<span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">Administrado <br/> en Medios</span>
</div>
<div className="p-6 rounded-xl bg-surface-container-high border border-outline-variant/30 text-center">
<span className="block text-4xl font-headline font-black text-primary mb-2">+10</span>
<span className="text-xs uppercase tracking-widest font-label text-on-surface-variant">Proyectos Integrales</span>
</div>
</div>
</div>
</div>
</section>
{/* Services Section */}
<section className="py-32 px-8" id="services">
<div className="max-w-7xl mx-auto">
<div className="mb-20">
<span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">Servicios</span>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">Experiencia Principal.</h2>
</div>
<div className="grid md:grid-cols-3 gap-4">
<div className="p-10 bg-surface-container hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">rocket_launch</span>
<h3 className="text-2xl font-headline font-bold mb-4">Pauta Digital</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Campañas de alto rendimiento en Meta y Google enfocadas en retorno de inversión medible.</p>
</div>
<div className="p-10 bg-surface-container-low hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">web</span>
<h3 className="text-2xl font-headline font-bold mb-4">Diseño Web</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Interfaces memorables enfocadas en la experiencia de usuario y la identidad de marca premium.</p>
</div>
<div className="p-10 bg-surface-container hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">insights</span>
<h3 className="text-2xl font-headline font-bold mb-4">RevOps &amp; Estrategia</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Alineación de procesos, datos y tecnología entre marketing y ventas para eliminar silos y acelerar el ciclo de ingresos.</p>
</div>
<div className="p-10 bg-surface-container-low hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">search</span>
<h3 className="text-2xl font-headline font-bold mb-4">SEO</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Posicionamiento orgánico mediante auditorías técnicas, contenido estratégico y construcción de enlaces.</p>
</div>
<div className="p-10 bg-surface-container hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">share</span>
<h3 className="text-2xl font-headline font-bold mb-4">Social Media</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Gestión estratégica de comunidades y creación de contenido que genera engagement real.</p>
</div>
<div className="p-10 bg-surface-container-low hover:bg-surface-container-high transition-colors group service-card">
<span className="material-symbols-outlined text-4xl text-primary mb-6">analytics</span>
<h3 className="text-2xl font-headline font-bold mb-4">Analítica &amp; Datos</h3>
<p className="text-on-surface-variant leading-relaxed mb-6">Medición de resultados, dashboards y toma de decisiones basadas en data con Google Analytics, Tag Manager, Looker Studio y Hotjar.</p>
</div>
</div>
</div>
</section>
{/* Methodology Section */}
<section className="py-32 px-8 bg-zinc-950/40 border-y border-outline-variant/10" id="methodology">
<div className="max-w-7xl mx-auto">
<div className="mb-24 text-center md:text-left">
<span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">Metodología</span>
<h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">Cómo <span className="text-primary">Trabajo.</span></h2>
<p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
Cada proyecto que lidero sigue un proceso de 6 fases que asegura dirección, orden y resultados medibles.
</p>
</div>

{/* Timeline Layout */}
<div className="relative pt-4">
{/* Track */}
<div className="absolute top-12 left-8 md:left-8 md:top-12 w-[2px] h-[calc(100%-6rem)] md:w-[calc(100%-4rem)] md:h-[2px] bg-surface-container-high rounded-full overflow-hidden">
  <div className="w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-primary/80 via-primary/20 to-transparent"></div>
</div>

<div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-6 relative z-10">
{[
{ num: '01', title: 'Diagnóstico', desc: 'Analizo dónde estás hoy: mercado, competencia, métricas y oportunidades.' },
{ num: '02', title: 'Objetivos', desc: 'Definimos metas claras, medibles y alineadas con el negocio.' },
{ num: '03', title: 'Estrategia', desc: 'Diseño el camino: audiencias, canales y mensaje.' },
{ num: '04', title: 'Tácticos', desc: 'Selecciono las herramientas y plataformas ideales para ejecutar.' },
{ num: '05', title: 'Ejecución', desc: 'Implemento el plan con timelines y responsables definidos.' },
{ num: '06', title: 'Medición', desc: 'Analizo y optimizo en tiempo real para asegurar resultados.' },
].map((step, idx) => (
<div key={idx} className="relative flex flex-row md:flex-col items-start gap-6 group">
  {/* Indicator */}
  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:mx-auto rounded-full bg-zinc-950 border-2 border-surface-container-highest group-hover:bg-surface-container-low group-hover:border-primary shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(15,189,189,0.3)] transition-all duration-300 relative z-10">
    <span className="font-headline font-bold text-xl text-on-surface-variant group-hover:text-primary transition-colors">{step.num}</span>
  </div>
  {/* Content */}
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
<span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">Proyectos</span>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">Trabajos Destacados.</h2>
</div>
<div className="flex flex-wrap gap-4 overflow-x-auto pb-2 no-scrollbar">
{projectFilters.map(filter => (
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
    title="Visitar sitio"
  >
    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
  </a>
</div>
<h3 className="text-2xl font-headline font-bold mb-4">{project.title}</h3>
<p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{project.description}</p>
<div className="flex flex-wrap gap-2 mb-6">
{project.tags.map(tag => (
<span key={tag} className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant">{tag}</span>
))}
</div>
<a 
  href={project.link} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-2 text-primary font-bold text-sm group/btn"
>
  Ver sitio
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
<span className="font-label text-primary font-bold tracking-widest uppercase mb-4 block">Contacto</span>
<h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">Hablemos de <span className="text-primary">resultados.</span></h2>
<p className="text-xl text-on-surface-variant mb-12 leading-relaxed max-w-md">
                    ¿Tienes un proyecto en mente? Cuéntame qué necesitas y encontremos la mejor forma de trabajar juntos.
                </p>
<div className="space-y-6">
<a className="flex items-center gap-4 text-2xl font-headline font-bold text-on-surface hover:text-primary transition-colors" href="mailto:rafaelaguirre92@gmail.com">
<span className="material-symbols-outlined text-primary">mail</span>
                        rafaelaguirre92@gmail.com
                    </a>
<div className="flex gap-6">
<a className="px-6 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all font-bold gap-2" href="/Rafael_Aguirre_CV_es.pdf" download="Rafael_Aguirre_CV_es.pdf">
<span className="material-symbols-outlined">download</span>
                            Descargar CV
                        </a>
</div>
</div>
</div>
<div className="bg-surface-container-high p-10 rounded-2xl border border-outline-variant/30">
<form onSubmit={handleContactSubmit} className="space-y-6">
<div>
<label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Nombre completo</label>
<input name="name" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none disabled:opacity-50" placeholder="Nombre completo" type="text" disabled={formStatus === 'submitting' || formStatus === 'success'}/>
</div>
<div>
<label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Correo electrónico</label>
<input name="email" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none disabled:opacity-50" placeholder="correo@ejemplo.com" type="email" disabled={formStatus === 'submitting' || formStatus === 'success'}/>
</div>
<div>
<label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Mensaje</label>
<textarea name="message" required className="w-full bg-surface-container-highest border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-4 py-3 transition-all outline-none resize-none disabled:opacity-50" placeholder="Cuéntame sobre tu proyecto..." rows={4} disabled={formStatus === 'submitting' || formStatus === 'success'}></textarea>
</div>
<button type="submit" disabled={formStatus === 'submitting' || formStatus === 'success'} className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed">
                        {formStatus === 'submitting' ? 'Enviando...' : formStatus === 'success' ? 'Enviado con éxito' : 'Platiquemos'}
                        {formStatus === 'submitting' ? (
                          <span className="material-symbols-outlined animate-spin">refresh</span>
                        ) : formStatus === 'success' ? (
                          <span className="material-symbols-outlined">check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined">arrow_forward</span>
                        )}
</button>
{formStatus === 'success' && (
  <p className="text-primary text-sm font-bold text-center animate-pulse">¡Gracias! Me pondré en contacto contigo pronto.</p>
)}
{formStatus === 'error' && (
  <p className="text-red-400 text-sm font-bold text-center">Hubo un error al enviar tu mensaje. Asegúrate de haber activado tu cuenta en Formsubmit.</p>
)}
</form>
</div>
</div>
</section>

    </>
  )
}

export default App
