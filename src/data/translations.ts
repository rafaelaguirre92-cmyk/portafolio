export interface Project {
  category: string;
  title: string;
  description: Record<'es' | 'en', string>;
  image: string;
  tags: Record<'es' | 'en', string[]>;
  link: string;
}

export const projectsData: Project[] = [
  {
    category: 'Salud',
    title: 'Vaxicare',
    description: {
      es: 'Servicio integral de marketing digital para una marca de servicios de vacunación. Diseño y desarrollo del sitio web, identidad de marca, estrategia y gestión de redes sociales, campañas de pauta digital, posicionamiento SEO, creación de blogs y estrategia de email marketing.',
      en: 'Comprehensive digital marketing service for a vaccination services brand. Website design & development, brand identity, social media strategy & management, digital ad campaigns, SEO positioning, blog creation, and email marketing strategy.'
    },
    image: '/Vaxicare.jpg',
    tags: {
      es: ['Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Identidad', 'Email Marketing', 'Contenido'],
      en: ['Web Design', 'SEO', 'Paid Ads', 'Social Media', 'Branding', 'Email Marketing', 'Content']
    },
    link: 'https://vaxicare.mx/'
  },
  {
    category: 'ONG / Bienestar',
    title: 'Trauma Free World',
    description: {
      es: 'Desarrollo de un sitio web institucional y una plataforma de cursos en línea para una organización enfocada en bienestar y salud emocional. El reto fue crear un ecosistema digital que combinara la comunicación de la causa con una experiencia de aprendizaje accesible.',
      en: 'Development of an institutional website and online learning platform for an emotional well-being organization. The goal was building a digital ecosystem pairing cause messaging with an accessible e-learning experience.'
    },
    image: '/Trauma-Free-World.jpg',
    tags: {
      es: ['Diseño Web'],
      en: ['Web Design']
    },
    link: 'https://www.unmundolibredetrauma.com/'
  },
  {
    category: 'Educación',
    title: 'IUCLA',
    description: {
      es: 'Diseño y desarrollo web para una institución educativa. Interfaz clara, profesional y orientada a la captación de prospectos, reflejando los valores y la oferta académica de la institución.',
      en: 'Web design and development for an educational institution. Clear, professional, lead-generation-focused interface reflecting academic values and enrollment offers.'
    },
    image: '/iucla.jpg',
    tags: {
      es: ['Diseño Web'],
      en: ['Web Design']
    },
    link: 'http://iucla.edu.mx/'
  },
  {
    category: 'E-commerce',
    title: 'Tío Grill',
    description: {
      es: 'Estrategia integral de marketing digital para un e-commerce de asadores. Desarrollo de la tienda en línea, identidad de marca, gestión de redes sociales, campañas de pauta digital enfocadas en conversión, estrategia SEO y email marketing para retención y recompra.',
      en: 'Full digital marketing strategy for a grill e-commerce store. Online store development, brand identity, social media management, conversion-focused paid campaigns, SEO, and retention email marketing.'
    },
    image: '/tio grill.jpg',
    tags: {
      es: ['Diseño Web', 'E-commerce', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Identidad', 'Email Marketing'],
      en: ['Web Design', 'E-commerce', 'SEO', 'Paid Ads', 'Social Media', 'Branding', 'Email Marketing']
    },
    link: 'https://tiogrill.com/?srsltid=AfmBOorS3gfT6hit2ln_8GfbI1cOOHjTNCdbpFEtQz88ztvIyu8IW4Bh'
  },
  {
    category: 'Iglesia Cristiana',
    title: 'Familia de Fe',
    description: {
      es: 'Diseño web y estrategia SEO para una iglesia cristiana. Sitio que comunica la identidad de la congregación y facilita la conexión con su comunidad, optimizado para búsquedas locales.',
      en: 'Web design and SEO strategy for a church organization. Website communicating congregational identity and connection with the community, optimized for local search.'
    },
    image: '/familia-de-fe.jpg',
    tags: {
      es: ['Diseño Web', 'SEO'],
      en: ['Web Design', 'SEO']
    },
    link: 'https://iglesiafamiliadefe.org/'
  },
  {
    category: 'Iglesia Cristiana',
    title: 'Iglesia Pilar',
    description: {
      es: 'Diseño web y posicionamiento SEO para una iglesia cristiana. Sitio funcional y accesible como punto de contacto digital para miembros y visitantes, con optimización para búsqueda orgánica.',
      en: 'Web design and SEO positioning for a church. Functional, accessible digital hub for community members and visitors with organic search optimization.'
    },
    image: '/iglesia-pilar.jpg',
    tags: {
      es: ['Diseño Web', 'SEO'],
      en: ['Web Design', 'SEO']
    },
    link: 'https://www.iglesiapilar.mx/'
  },
  {
    category: 'Industria B2B',
    title: 'MEP Industrial',
    description: {
      es: 'Diseño y desarrollo web para una empresa del sector industrial. Enfocado en comunicar profesionalismo, mostrar servicios y generar confianza con clientes potenciales del sector B2B.',
      en: 'Web design and development for an industrial enterprise. Focused on showcasing technical expertise, services, and trust for B2B prospects.'
    },
    image: '/mep.jpg',
    tags: {
      es: ['Diseño Web'],
      en: ['Web Design']
    },
    link: 'https://www.mepindustrial.com.mx/'
  },
  {
    category: 'Educación',
    title: 'Bright School',
    description: {
      es: 'Servicio integral de marketing digital para una institución educativa. Diseño web, gestión de redes sociales, campañas de pauta digital, estrategia SEO, creación de blogs y email marketing orientados a la captación de alumnos y el posicionamiento de marca.',
      en: '360° digital marketing service for a private school. Web design, social media management, paid ads, SEO strategy, blogging, and student acquisition campaigns.'
    },
    image: '/bright school.jpg',
    tags: {
      es: ['Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Email Marketing', 'Contenido'],
      en: ['Web Design', 'SEO', 'Paid Ads', 'Social Media', 'Email Marketing', 'Content']
    },
    link: 'https://brightschool.mx/'
  },
  {
    category: 'Equipo médico B2B',
    title: 'SEJ',
    description: {
      es: 'Diseño web, campañas de pauta digital, estrategia SEO y creación de blogs para una empresa que comercializa equipo médico a hospitales. Presencia web profesional con campañas de adquisición B2B y contenido especializado para posicionamiento en un mercado de nicho.',
      en: 'Web design, paid ad campaigns, SEO, and content creation for a medical equipment distributor. Professional B2B acquisition campaigns and niche market search positioning.'
    },
    image: '/Sej.png',
    tags: {
      es: ['Diseño Web', 'SEO', 'Pauta Digital', 'Contenido'],
      en: ['Web Design', 'SEO', 'Paid Ads', 'Content']
    },
    link: 'https://www.saludenjapones.com/'
  }
];

export const projectFilterOptions = {
  es: ['Todos', 'Diseño Web', 'SEO', 'Pauta Digital', 'Redes Sociales', 'Email Marketing', 'Identidad', 'Contenido', 'E-commerce'],
  en: ['All', 'Web Design', 'SEO', 'Paid Ads', 'Social Media', 'Email Marketing', 'Branding', 'Content', 'E-commerce']
};

export const filterMapping: Record<string, { es: string; en: string }> = {
  'Todos': { es: 'Todos', en: 'All' },
  'Diseño Web': { es: 'Diseño Web', en: 'Web Design' },
  'SEO': { es: 'SEO', en: 'SEO' },
  'Pauta Digital': { es: 'Pauta Digital', en: 'Paid Ads' },
  'Redes Sociales': { es: 'Redes Sociales', en: 'Social Media' },
  'Email Marketing': { es: 'Email Marketing', en: 'Email Marketing' },
  'Identidad': { es: 'Identidad', en: 'Branding' },
  'Contenido': { es: 'Contenido', en: 'Content' },
  'E-commerce': { es: 'E-commerce', en: 'E-commerce' }
};

export const translations = {
  es: {
    nav: {
      about: 'Sobre mí',
      services: 'Servicios',
      work: 'Proyectos',
      contact: 'Contacto'
    },
    hero: {
      role: 'Marketing y Estrategia Digital',
      bio: 'Convierto objetivos de negocio en campañas digitales con resultados medibles. Planeo, ejecuto y mido estrategias que conectan marcas con su audiencia.',
      ctaProjects: 'Ver proyectos'
    },
    about: {
      sectionTag: 'Sobre mí',
      badge: 'Estrategia + Ejecución Digital',
      titlePrefix: 'Arquitecto de ',
      titleHighlight: 'Autoridad Digital.',
      p1: 'Estratega digital y gestor de proyectos con más de 10 años de experiencia en marketing, campañas multicanal y coordinación de proyectos digitales. Gestiono proyectos de principio a fin — desde la planeación estratégica y el brief creativo hasta la medición de resultados.',
      p2: 'Me apasiona conectar los objetivos de negocio con la ejecución digital, trabajando con equipos multidisciplinarios y agencias para entregar campañas con impacto real.',
      stackTitle: 'Stack Tecnológico',
      metrics: {
        campaigns: 'Campañas Multicanal',
        managed: 'Administrado en Medios',
        projects: 'Proyectos Integrales'
      }
    },
    services: {
      sectionTag: 'Servicios',
      title: 'Experiencia Principal.',
      items: [
        {
          title: 'Pauta Digital',
          description: 'Campañas de alto rendimiento en Meta y Google enfocadas en retorno de inversión medible.',
          icon: 'rocket_launch'
        },
        {
          title: 'Diseño Web',
          description: 'Interfaces memorables enfocadas en la experiencia de usuario y la identidad de marca premium.',
          icon: 'web'
        },
        {
          title: 'RevOps & Estrategia',
          description: 'Alineación de procesos, datos y tecnología entre marketing y ventas para eliminar silos y acelerar el ciclo de ingresos.',
          icon: 'insights'
        },
        {
          title: 'SEO',
          description: 'Posicionamiento orgánico mediante auditorías técnicas, contenido estratégico y construcción de enlaces.',
          icon: 'search'
        },
        {
          title: 'Social Media',
          description: 'Gestión estratégica de comunidades y creación de contenido que genera engagement real.',
          icon: 'share'
        },
        {
          title: 'Analítica & Datos',
          description: 'Medición de resultados, dashboards y toma de decisiones basadas en data con Google Analytics, Tag Manager, Looker Studio y Hotjar.',
          icon: 'analytics'
        }
      ]
    },
    methodology: {
      sectionTag: 'Metodología',
      titlePrefix: 'Cómo ',
      titleHighlight: 'Trabajo.',
      description: 'Cada proyecto que lidero sigue un proceso de 6 fases que asegura dirección, orden y resultados medibles.',
      steps: [
        { num: '01', title: 'Diagnóstico', desc: 'Analizo dónde estás hoy: mercado, competencia, métricas y oportunidades.' },
        { num: '02', title: 'Objetivos', desc: 'Definimos metas claras, medibles y alineadas con el negocio.' },
        { num: '03', title: 'Estrategia', desc: 'Diseño el camino: audiencias, canales y mensaje.' },
        { num: '04', title: 'Tácticos', desc: 'Selecciono las herramientas y plataformas ideales para ejecutar.' },
        { num: '05', title: 'Ejecución', desc: 'Implemento el plan con timelines y responsables definidos.' },
        { num: '06', title: 'Medición', desc: 'Analizo y optimizo en tiempo real para asegurar resultados.' }
      ]
    },
    projects: {
      sectionTag: 'Proyectos',
      title: 'Trabajos Destacados.',
      visitSite: 'Ver sitio'
    },
    contact: {
      sectionTag: 'Contacto',
      titlePrefix: 'Hablemos de ',
      titleHighlight: 'resultados.',
      description: '¿Tienes un proyecto en mente? Cuéntame qué necesitas y encontremos la mejor forma de trabajar juntos.',
      downloadCv: 'Descargar CV',
      cvPath: '/Rafael_Aguirre_CV_es.pdf',
      formName: 'Nombre completo',
      formEmail: 'Correo electrónico',
      formMessage: 'Mensaje',
      placeholderName: 'Nombre completo',
      placeholderEmail: 'correo@ejemplo.com',
      placeholderMessage: 'Cuéntame sobre tu proyecto...',
      submitIdle: 'Platiquemos',
      submitSubmitting: 'Enviando...',
      submitSuccess: 'Enviado con éxito',
      successMsg: '¡Gracias! Me pondré en contacto contigo pronto.',
      errorMsg: 'Hubo un error al enviar tu mensaje. Asegúrate de intentar nuevamente.'
    }
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      work: 'Projects',
      contact: 'Contact'
    },
    hero: {
      role: 'Marketing & Digital Strategy',
      bio: 'I turn business goals into digital campaigns with measurable results. I plan, execute, and track strategies that connect brands with their target audience.',
      ctaProjects: 'View projects'
    },
    about: {
      sectionTag: 'About Me',
      badge: 'Strategy + Digital Execution',
      titlePrefix: 'Architect of ',
      titleHighlight: 'Digital Authority.',
      p1: 'Digital strategist and project manager with over 10 years of experience in marketing, omnichannel campaigns, and digital project execution. I manage projects end-to-end — from strategic planning and creative briefs to performance tracking.',
      p2: 'I am passionate about bridging business objectives with digital execution, collaborating with cross-functional teams and agencies to deliver high-impact campaigns.',
      stackTitle: 'Tech & Tool Stack',
      metrics: {
        campaigns: 'Omnichannel Campaigns',
        managed: 'Managed Ad Spend',
        projects: '360° Projects'
      }
    },
    services: {
      sectionTag: 'Services',
      title: 'Core Expertise.',
      items: [
        {
          title: 'Paid Media & Performance',
          description: 'High-performing Meta and Google ad campaigns focused on measurable return on ad spend (ROAS).',
          icon: 'rocket_launch'
        },
        {
          title: 'Web Design',
          description: 'Memorable web interfaces built for premium brand identity, seamless UX, and conversion.',
          icon: 'web'
        },
        {
          title: 'RevOps & Strategy',
          description: 'Aligning processes, data, and technology between sales & marketing to remove silos and boost growth.',
          icon: 'insights'
        },
        {
          title: 'SEO & Growth',
          description: 'Organic search positioning driven by technical audits, strategic content, and link building.',
          icon: 'search'
        },
        {
          title: 'Social Media',
          description: 'Strategic community management and compelling content creation that drives genuine engagement.',
          icon: 'share'
        },
        {
          title: 'Analytics & Data',
          description: 'Performance measurement, custom dashboards, and data-backed decisions using GA4, GTM, Looker Studio, and Hotjar.',
          icon: 'analytics'
        }
      ]
    },
    methodology: {
      sectionTag: 'Methodology',
      titlePrefix: 'How I ',
      titleHighlight: 'Work.',
      description: 'Every project I lead follows a 6-phase framework that guarantees clear direction, structure, and measurable outcomes.',
      steps: [
        { num: '01', title: 'Diagnosis', desc: 'I analyze current status: market positioning, competitors, metrics, and key growth gaps.' },
        { num: '02', title: 'Objectives', desc: 'We define clear, measurable goals directly aligned with your business targets.' },
        { num: '03', title: 'Strategy', desc: 'I architect the roadmap: target audiences, channels, positioning, and core messaging.' },
        { num: '04', title: 'Tactics', desc: 'Selecting optimal tools, platforms, and tech stack for flawless execution.' },
        { num: '05', title: 'Execution', desc: 'Rolling out the strategy with strict timelines, milestones, and accountability.' },
        { num: '06', title: 'Measurement', desc: 'Tracking and optimizing in real-time to maximize campaign ROI.' }
      ]
    },
    projects: {
      sectionTag: 'Projects',
      title: 'Featured Work.',
      visitSite: 'Visit site'
    },
    contact: {
      sectionTag: 'Contact',
      titlePrefix: "Let's talk ",
      titleHighlight: 'results.',
      description: 'Have a project in mind? Tell me what you need and let us find the best way to collaborate.',
      downloadCv: 'Download CV',
      cvPath: '/Rafael_Aguirre_CV_es.pdf',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formMessage: 'Message',
      placeholderName: 'Full name',
      placeholderEmail: 'email@example.com',
      placeholderMessage: 'Tell me about your project...',
      submitIdle: "Let's Talk",
      submitSubmitting: 'Sending...',
      submitSuccess: 'Sent Successfully',
      successMsg: 'Thank you! I will get in touch with you shortly.',
      errorMsg: 'There was an error sending your message. Please try again.'
    }
  }
};
