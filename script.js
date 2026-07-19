document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight Active Nav Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (navToggle && navMenu) {
    const setNavOpen = (open) => {
      navMenu.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setNavOpen(!navMenu.classList.contains('open'));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        setNavOpen(false);
      }
    });
  }

  // 2. Project Modal and Image Switcher
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTags = document.getElementById('modal-project-tags');
  const modalImg = document.getElementById('modal-main-img');
  
  const prevBtn = document.querySelector('.switcher-prev');
  const nextBtn = document.querySelector('.switcher-next');
  const closeBtn = document.querySelector('.modal-close');

  let currentProjectImages = [];
  let currentImageIdx = 0;

  window.openProjectModal = function(title, desc, tagsString, imagesListString) {
    if (!modalOverlay) return;
    
    currentProjectImages = imagesListString.split(',').map(s => s.trim()).filter(s => s.length > 0);
    currentImageIdx = 0;
    
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    
    modalTags.innerHTML = '';
    tagsString.split(',').forEach(tag => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag.trim();
      modalTags.appendChild(span);
    });

    updateModalImage();

    if (currentProjectImages.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }

    modalOverlay.classList.add('active');
  };

  function updateModalImage() {
    if (currentProjectImages.length > 0 && modalImg) {
      modalImg.src = currentProjectImages[currentImageIdx];
      modalImg.alt = `Project Image ${currentImageIdx + 1}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentImageIdx = (currentImageIdx - 1 + currentProjectImages.length) % currentProjectImages.length;
      updateModalImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentImageIdx = (currentImageIdx + 1) % currentProjectImages.length;
      updateModalImage();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
    }
  });

  // 3. Contact Form Submission simulation
  const contactForm = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('success-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          contactForm.reset();
          showToast();
        }, 1500);
      }
    });
  }

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});
