// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    }
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Fade-in animation on scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .contact-card, .about-text, .about-card, .experience-item'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Modale =====
const modal         = document.getElementById('modal');
const modalImg      = document.getElementById('modalImg');
const modalClose    = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalPrev     = document.getElementById('modalPrev');
const modalNext     = document.getElementById('modalNext');
const modalCounter  = document.getElementById('modalCounter');

let activeGallery = [];
let currentIndex  = 0;

function openModal(gallery, index) {
    activeGallery = gallery;
    currentIndex  = index;
    const img = activeGallery[currentIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    updateCounter();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function updateCounter() {
    modalCounter.textContent = `${currentIndex + 1} / ${activeGallery.length}`;
    modalPrev.disabled = currentIndex === 0;
    modalNext.disabled = currentIndex === activeGallery.length - 1;
}

function navigate(dir) {
    const next = currentIndex + dir;
    if (next >= 0 && next < activeGallery.length) {
        currentIndex = next;
        modalImg.src = activeGallery[currentIndex].src;
        modalImg.alt = activeGallery[currentIndex].alt;
        updateCounter();
    }
}

// Attache les clics sur chaque galerie séparément
document.querySelectorAll('.mockup-gallery').forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    imgs.forEach((img, i) => {
        img.addEventListener('click', () => openModal(imgs, i));
    });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
modalPrev.addEventListener('click', () => navigate(-1));
modalNext.addEventListener('click', () => navigate(1));

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
