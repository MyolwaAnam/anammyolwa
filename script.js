// Spotlight cursor effect
const spotlight = document.getElementById('spotlight');

document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', e.clientX + 'px');
    spotlight.style.setProperty('--y', e.clientY + 'px');
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = 'about';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile nav if open
            const mobileNav = document.getElementById('mobile-nav');
            if (mobileNav && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });
});

// Mobile navigation
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
}

// Close mobile nav when clicking outside
if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// Add subtle entrance animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.experience-card, .project-card, .skill-category, .education-item, .cert-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        mobileMenuBtn.focus();
    }
});
