/* =====================================================
   BRUNO BARBERSHOP - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loader = document.getElementById('loader');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // =====================================================
  // LOADER
  // =====================================================
  const hideLoader = () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, 1500);
  };

  // Check if page is already loaded
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  // Add no-scroll class initially
  document.body.classList.add('no-scroll');

  // =====================================================
  // NAVIGATION
  // =====================================================

  // Scroll effect
  let lastScroll = 0;
  const navScrollThreshold = 100;

  const handleNavScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > navScrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu on link click
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // =====================================================
  // SMOOTH SCROLL
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =====================================================
  // SCROLL ANIMATIONS (CSS-based for reliability)
  // =====================================================

  // Simple reveal on scroll using CSS classes
  const revealElements = document.querySelectorAll(
    '.about-image, .about-content, .service-card, .barber-card, .gallery-item, .location-card, .book-content, .section-header'
  );

  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        el.classList.add('revealed');
      }
    });
  };

  // Run on load and scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });

  // Add reveal animation styles
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .about-image, .about-content, .service-card, .barber-card,
    .gallery-item, .location-card, .book-content, .section-header {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .service-card:nth-child(1) { transition-delay: 0s; }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
    .service-card:nth-child(5) { transition-delay: 0.4s; }
    .service-card:nth-child(6) { transition-delay: 0.5s; }
    .barber-card:nth-child(1) { transition-delay: 0s; }
    .barber-card:nth-child(2) { transition-delay: 0.1s; }
    .barber-card:nth-child(3) { transition-delay: 0.2s; }
    .barber-card:nth-child(4) { transition-delay: 0.3s; }
    .gallery-item:nth-child(1) { transition-delay: 0s; }
    .gallery-item:nth-child(2) { transition-delay: 0.05s; }
    .gallery-item:nth-child(3) { transition-delay: 0.1s; }
    .gallery-item:nth-child(4) { transition-delay: 0.15s; }
    .gallery-item:nth-child(5) { transition-delay: 0.2s; }
    .gallery-item:nth-child(6) { transition-delay: 0.25s; }
  `;
  document.head.appendChild(revealStyle);

  // =====================================================
  // PARALLAX EFFECT (subtle)
  // =====================================================
  const parallaxElements = document.querySelectorAll('.hero-bg, .book-bg');

  const handleParallax = () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = 0.3;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax, { passive: true });

  // =====================================================
  // ACTIVE NAV LINK HIGHLIGHT
  // =====================================================
  const sections = document.querySelectorAll('section[id]');

  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkItems.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // Add active link styles
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav-links a.active {
      color: var(--color-gold) !important;
    }
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(activeStyle);

  // =====================================================
  // GALLERY LIGHTBOX (simple)
  // =====================================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const src = img.src.replace('w=500', 'w=1200').replace('w=800', 'w=1200');
      const alt = img.alt;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <img src="${src}" alt="${alt}">
          <button class="lightbox-close" aria-label="Close">&times;</button>
        </div>
      `;

      // Add styles
      const lightboxStyle = document.createElement('style');
      lightboxStyle.textContent = `
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .lightbox-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.95);
        }
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
        }
        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 0.5rem;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(lightboxStyle);

      document.body.appendChild(lightbox);
      document.body.classList.add('no-scroll');

      // Close lightbox
      const closeLightbox = () => {
        lightbox.remove();
        document.body.classList.remove('no-scroll');
      };

      lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      }, { once: true });
    });
  });

  // =====================================================
  // CONSOLE BRANDING
  // =====================================================
  console.log(
    '%c BRUNO BARBERSHOP %c Best Quality Barbershop in Penang ',
    'background: #c9a962; color: #0a0a0a; font-weight: bold; padding: 5px 10px;',
    'background: #0a0a0a; color: #c9a962; padding: 5px 10px;'
  );
});
