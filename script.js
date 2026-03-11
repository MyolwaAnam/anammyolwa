// ===== THEME MANAGER =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        // Listen to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        if (theme === 'light') {
            this.body.classList.remove('dark-theme');
            this.body.classList.add('light-theme');
        } else {
            this.body.classList.remove('light-theme');
            this.body.classList.add('dark-theme');
        }
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = this.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ===== MOBILE MENU TOGGLE =====
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

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
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

// ===== HEADER BACKGROUND ON SCROLL =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== FADE IN ANIMATION ON SCROLL =====
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

document.querySelectorAll('.section, .experience-card, .skill-category, .education-card, .certification-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== ACTIVE NAVIGATION LINK HIGHLIGHT =====
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

// ===== CLOSE MOBILE MENU ON ESCAPE =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== INITIALIZE THEME MANAGER =====
new ThemeManager();

// ===== SPOTLIGHT EFFECT =====
const spotlight = document.getElementById('spotlight');
if (spotlight) {
    document.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    });
}
