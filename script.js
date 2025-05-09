// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Theme toggle clicked');
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('#mobile-menu .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const href = this.getAttribute('href');
        console.log('Mobile nav link clicked:', href);
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            console.error('Target section not found:', href);
        }
        // Close mobile menu
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('open');
        themeToggle.classList.remove('hidden');
        document.body.classList.remove('no-scroll');
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Menu toggle clicked');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('translate-x-0');
    mobileMenu.classList.toggle('open');
    themeToggle.classList.toggle('hidden');
    document.body.classList.toggle('no-scroll');
});

menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Menu close clicked');
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('open');
    themeToggle.classList.remove('hidden');
    document.body.classList.remove('no-scroll');
});

// Active Section Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));
