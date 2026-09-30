/* ============================================
   AYOMIKUN STEVEN SEIDU — PORTFOLIO
   Interactive Features & Animations
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Cache ---------- */
  const DOM = {
    nav: document.querySelector('.nav'),
    navLinks: document.querySelectorAll('.nav__link'),
    hamburger: document.querySelector('.nav__hamburger'),
    mobileMenu: document.querySelector('.nav__mobile'),
    themeToggle: document.querySelector('.theme-toggle'),
    backToTop: document.querySelector('.back-to-top'),
    reveals: document.querySelectorAll('.reveal'),
    modalOverlay: document.querySelector('.modal-overlay'),
    modalClose: document.querySelector('.modal__close'),
    projectCards: document.querySelectorAll('[data-project]'),
    cursorDot: document.querySelector('.cursor-dot'),
    cursorRing: document.querySelector('.cursor-ring'),
    sections: document.querySelectorAll('section[id]'),
  };

  /* ---------- Project Data ---------- */
  const projectsData = {
    'corporate-setup': {
      category: 'Business Platform',
      title: 'Corporate Setup',
      challenge: 'Businesses need a centralized digital platform to manage operations—from documentation and contracts to bids, tenders, and service requests—without juggling multiple disconnected tools.',
      solution: 'Built a comprehensive business-focused web platform designed around streamlining corporate operations, enabling businesses to manage services, contracts, documentation, bids/tenders, and service requests in a unified digital environment.',
      role: 'Software Development Executive — Leading web development, platform operations, software testing, performance monitoring, and documentation.',
      tech: ['Web Platform', 'WordPress', 'JavaScript', 'CSS', 'Digital Operations'],
      outcome: 'A fully operational business platform serving corporate clients with streamlined digital operations and service management capabilities.',
      url: 'https://www.corporate-setup.app/'
    },
    'smallface-records': {
      category: 'Music Industry Platform',
      title: 'SmallFace Records',
      challenge: 'A music label needed a professional digital presence to showcase artists, manage content, and engage with their audience across digital channels.',
      solution: 'Developed and managed a comprehensive music-industry digital platform that serves as the label\'s digital headquarters—handling artist profiles, content distribution, and audience engagement.',
      role: 'Web Manager — Overseeing website development, digital presence, content management, and the artist/music ecosystem.',
      tech: ['Web Development', 'CMS', 'Content Management', 'Digital Platform'],
      outcome: 'A polished digital platform that effectively communicates the label\'s brand identity and provides a seamless experience for fans and industry professionals.',
      url: 'https://smallfacerecords.com/'
    },
    'evoke360': {
      category: 'Digital Platform',
      title: 'Evoke360',
      challenge: 'The project required a professional digital experience that effectively communicates services and engages visitors with a modern, clean interface.',
      solution: 'Engineered a professional digital platform with a focus on clean design, clear communication, and an intuitive user experience that reflects the brand\'s identity.',
      role: 'Web Development — Frontend implementation, responsive design, and user experience optimization.',
      tech: ['JavaScript', 'CSS', 'Responsive Design', 'Web Development'],
      outcome: 'A professional and responsive digital platform that effectively serves its audience with a polished online presence.',
      url: 'https://evoke360.ng/'
    },
    'procoders': {
      category: 'EdTech Platform',
      title: 'PDO Coders',
      challenge: 'Aspiring developers need accessible, structured technology education that bridges the gap between theoretical knowledge and practical software development skills.',
      solution: 'Built a software education platform focused on practical technology training—providing structured learning paths, hands-on coding instruction, and a supportive software development ecosystem.',
      role: 'Software Instructor — Teaching software development, programming fundamentals, and practical technology skills.',
      tech: ['Web Development', 'Education Platform', 'JavaScript', 'Software Training'],
      outcome: 'A functioning education platform that has helped students gain practical software development skills and enter the technology industry.',
      url: 'https://procoders.ng/'
    },
    'trenur': {
      category: 'Digital Product',
      title: 'Trenur',
      challenge: 'The project needed a modern digital product that delivers value through a clean, functional, and professional web experience.',
      solution: 'Developed a digital product with attention to user experience, visual design, and functional performance—creating a platform that effectively serves its intended purpose.',
      role: 'Web Development — Full development lifecycle from concept through deployment.',
      tech: ['Web Development', 'JavaScript', 'CSS', 'Digital Product'],
      outcome: 'A complete digital product delivered with professional-grade design and development standards.',
      url: 'https://trenur.com/'
    },
    'chefbid': {
      category: 'Digital Platform',
      title: 'ChefBid',
      challenge: 'The project required building a digital platform focused on connecting users with services through an intuitive, well-designed web experience.',
      solution: 'Engineered a digital platform with a focus on usability, clean interface design, and reliable functionality to serve its target audience effectively.',
      role: 'Web Development — Platform development, interface design, and deployment.',
      tech: ['Web Development', 'JavaScript', 'Digital Platform', 'UI/UX'],
      outcome: 'A functional digital platform that provides a seamless user experience and reliable service delivery.',
      url: null
    }
  };

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }

    DOM.themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Sticky Navigation ---------- */
  function initNav() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        DOM.nav?.classList.add('scrolled');
      } else {
        DOM.nav?.classList.remove('scrolled');
      }

      lastScroll = scrollY;
    }, { passive: true });
  }

  /* ---------- Active Navigation Highlighting ---------- */
  function initActiveNav() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    DOM.sections.forEach(section => observer.observe(section));
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    DOM.hamburger?.addEventListener('click', () => {
      const isOpen = DOM.hamburger.classList.toggle('active');
      DOM.mobileMenu?.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Close on link click
    DOM.mobileMenu?.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        DOM.hamburger?.classList.remove('active');
        DOM.mobileMenu?.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    DOM.reveals.forEach(el => observer.observe(el));
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        DOM.backToTop?.classList.add('visible');
      } else {
        DOM.backToTop?.classList.remove('visible');
      }
    }, { passive: true });

    DOM.backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Project Modal ---------- */
  function initProjectModals() {
    DOM.projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking a direct link
        if (e.target.closest('a[href]') && !e.target.closest('[data-case-study]')) return;

        const projectKey = card.getAttribute('data-project');
        const project = projectsData[projectKey];
        if (!project) return;

        openModal(project);
      });
    });

    // Also handle case study buttons specifically
    document.querySelectorAll('[data-case-study]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectKey = btn.getAttribute('data-case-study');
        const project = projectsData[projectKey];
        if (!project) return;
        openModal(project);
      });
    });

    DOM.modalClose?.addEventListener('click', closeModal);

    DOM.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === DOM.modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(project) {
    const modal = DOM.modalOverlay;
    if (!modal) return;

    // Populate modal content
    modal.querySelector('.modal__category').textContent = project.category;
    modal.querySelector('.modal__title').textContent = project.title;

    const sections = modal.querySelectorAll('.modal__section');
    const texts = [project.challenge, project.solution, project.role, null, project.outcome];
    const labels = ['The Challenge', 'The Solution', 'My Role', 'Technology', 'Outcome'];

    sections.forEach((section, i) => {
      const titleEl = section.querySelector('.modal__section-title');
      const textEl = section.querySelector('.modal__section-text');
      const tagsEl = section.querySelector('.modal__tech-tags');

      if (titleEl) titleEl.textContent = labels[i];

      if (i === 3 && tagsEl) {
        // Technology tags
        tagsEl.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
      } else if (textEl) {
        textEl.textContent = texts[i];
      }
    });

    // Update link
    const linkEl = modal.querySelector('.modal__link');
    if (project.url) {
      linkEl.href = project.url;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }

    modal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    DOM.modalOverlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  /* ---------- Custom Cursor ---------- */
  function initCursor() {
    const dot = DOM.cursorDot;
    const ring = DOM.cursorRing;
    if (!dot || !ring) return;

    // Only on desktop with fine pointer
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 3 + 'px';
      dot.style.top = mouseY - 3 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX - 18 + 'px';
      ring.style.top = ringY - 18 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .service-card, .expertise-tag, .tech-tag');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---------- Typed Text Effect (Hero) ---------- */
  function initHeroAnimation() {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    // Staggered reveal
    const children = heroContent.children;
    Array.from(children).forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
      child.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12 + 0.2}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12 + 0.2}s`;
    });

    // Trigger after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        Array.from(children).forEach(child => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
      }, 100);
    });
  }

  /* ---------- Counter Animation ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();
    const suffix = el.getAttribute('data-suffix') || '';

    function update(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ---------- Parallax Orbs ---------- */
  function initParallax() {
    const orbs = document.querySelectorAll('.hero__orb');
    if (!orbs.length) return;

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Dynamic Year ---------- */
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ---------- Initialize ---------- */
  function init() {
    initYear();
    initTheme();
    initNav();
    initActiveNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initBackToTop();
    initProjectModals();
    initCursor();
    initHeroAnimation();
    initCounters();
    initParallax();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
