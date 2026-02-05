// ===== Spotlight Effect =====
document.addEventListener('mousemove', (e) => {
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Smooth Scroll for Navigation Links =====
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Header Background on Scroll =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Fade In Animation on Scroll =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections and observe them
document.querySelectorAll('.section, .experience-card, .project-card, .skill-category, .education-card, .certification-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Typing Effect for Hero Subtitle =====
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Skill Items Hover Effect =====
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ===== Close mobile menu on escape key =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Prevent Flash of Unstyled Content =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
