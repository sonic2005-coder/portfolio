/**
 * ==============================================================================
 * AHMED YASSER - PORTFOLIO INTERACTIVITY SCRIPT
 * Vanilla JavaScript (No Frameworks, No Dependencies)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================================
  // 1. Theme Management (Dark / Light Mode)
  // ============================================================================
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;
  const THEME_STORAGE_KEY = 'ahmed_yasser_portfolio_theme';

  /**
   * Determine the initial theme:
   * 1. Check localStorage
   * 2. Default to 'dark' as explicitly specified in requirements
   */
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'dark'; // Dark mode is default
  }

  /**
   * Apply theme to root and update aria attributes
   */
  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'
      );
      themeToggle.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'
      );
    }
  }

  // Initialize theme
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ============================================================================
  // 2. Dynamic Typewriter Animation (Hero Section)
  // ============================================================================
  const typewriterElement = document.getElementById('typewriterText');
  const titlesToType = [
    'AI for Business Enthusiast',
    'Machine Learning Learner',
    'Computer Science Student'
  ];

  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    if (!typewriterElement) return;

    const currentTitle = titlesToType[currentTitleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      typewriterElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // standard typing pace
    }

    // Word complete: pause before deleting
    if (!isDeleting && currentCharIndex === currentTitle.length) {
      typingSpeed = 2000; // 2s pause
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titlesToType.length;
      typingSpeed = 400; // pause before next word
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing
  if (typewriterElement) {
    setTimeout(typeText, 600);
  }

  // ============================================================================
  // 3. Navigation Bar: Sticky Scrolled State & Scroll Progress Bar
  // ============================================================================
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Navbar scrolled effect
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 2. Reading progress bar
    if (scrollProgress && docHeight > 0) {
      const progressPercent = Math.min((scrollY / docHeight) * 100, 100);
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // 3. Back to Top visibility
    if (backToTopBtn) {
      if (scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================================
  // 4. Mobile Hamburger Menu & Overlay
  // ============================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (!navMenu || !hamburger) return;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeMobileMenu() {
    if (!navMenu || !hamburger) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu && navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on any link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeProjectModal();
    }
  });

  // ============================================================================
  // 5. ScrollSpy (Active Navigation Link Highlighting)
  // ============================================================================
  const sections = document.querySelectorAll('section[id]');

  const scrollSpyObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, scrollSpyObserverOptions);

  sections.forEach((section) => scrollSpyObserver.observe(section));

  // ============================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // ============================================================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, parseInt(delay, 10));
        } else {
          el.classList.add('revealed');
        }
        observer.unobserve(el);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ============================================================================
  // 7. Ambient Cursor Glow (Non-touch devices)
  // ============================================================================
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursorGlow && !isTouchDevice && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // ============================================================================
  // 8. Magnetic Buttons Interaction (Desktop)
  // ============================================================================
  if (!isTouchDevice && !prefersReducedMotion) {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================================================
  // 9. Project Details Modal (Sentinel Shield)
  // ============================================================================
  const viewProjectBtn = document.getElementById('viewProjectBtn');
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  function openProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (viewProjectBtn) {
    viewProjectBtn.addEventListener('click', openProjectModal);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalDismissBtn) {
    modalDismissBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // ============================================================================
  // 10. Contact Form Validation & User Guidance
  // ============================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const formNotice = document.getElementById('formNotice');
  const noticeTitle = document.getElementById('noticeTitle');
  const noticeDesc = document.getElementById('noticeDesc');
  const noticeActions = document.getElementById('noticeActions');
  const mailtoFallbackLink = document.getElementById('mailtoFallbackLink');

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function setFieldError(field, hasError) {
    const parentGroup = field.closest('.form-group');
    if (!parentGroup) return;
    if (hasError) {
      parentGroup.classList.add('has-error');
      field.setAttribute('aria-invalid', 'true');
    } else {
      parentGroup.classList.remove('has-error');
      field.removeAttribute('aria-invalid');
    }
  }

  // Real-time error dismissal on user input
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        setFieldError(input, false);
        if (formNotice) formNotice.style.display = 'none';
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Name validation
      if (!nameInput || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // 2. Email validation
      if (!emailInput || !validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // 3. Subject validation
      if (!subjectInput || subjectInput.value.trim().length < 3) {
        setFieldError(subjectInput, true);
        isValid = false;
      } else {
        setFieldError(subjectInput, false);
      }

      // 4. Message validation
      if (!messageInput || messageInput.value.trim().length < 10) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) {
        if (formNotice) {
          formNotice.className = 'form-notice error';
          formNotice.style.display = 'flex';
          noticeTitle.textContent = 'Please check the highlighted fields';
          noticeDesc.textContent = 'All fields are required and must satisfy minimum character lengths.';
          noticeActions.style.display = 'none';
        }
        return;
      }

      // Client-side validated successfully!
      const nameVal = encodeURIComponent(nameInput.value.trim());
      const emailVal = encodeURIComponent(emailInput.value.trim());
      const subjectVal = encodeURIComponent(subjectInput.value.trim());
      const messageVal = encodeURIComponent(
        `From: ${decodeURIComponent(nameVal)} (${decodeURIComponent(emailVal)})\n\n${messageInput.value.trim()}`
      );

      // Create a direct mailto action
      const targetEmail = 'contact-placeholder@ahmedyasser.dev';
      const mailtoUrl = `mailto:${targetEmail}?subject=${subjectVal}&body=${messageVal}`;

      if (mailtoFallbackLink) {
        mailtoFallbackLink.setAttribute('href', mailtoUrl);
      }

      if (formNotice) {
        formNotice.className = 'form-notice success';
        formNotice.style.display = 'flex';
        noticeTitle.textContent = 'Message Validated & Ready!';
        noticeDesc.textContent =
          'Your message is structured and ready. Because this portfolio runs client-side (no live backend email server configured), click below to open your default email client with your message pre-filled, or reach out directly on LinkedIn or GitHub.';
        noticeActions.style.display = 'block';
      }

      // Reset form fields
      contactForm.reset();
    });
  }

  // ============================================================================
  // 11. Footer Current Year
  // ============================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
});

