// ===== ULTRA-PREMIUM PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.body;
        this.particleCount = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        const sizeClass = size < 2 ? 'small' : size < 3 ? 'medium' : 'large';
        particle.classList.add(sizeClass);
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        this.container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, (duration + delay) * 1000);
    }
}

// ===== ADVANCED SPOTLIGHT EFFECT =====
class SpotlightEffect {
    constructor() {
        this.spotlight = document.getElementById('spotlight');
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.updateSpotlight(e), false);
    }

    updateSpotlight(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        if (this.spotlight) {
            this.spotlight.style.setProperty('--mouse-x', `${this.mouseX}px`);
            this.spotlight.style.setProperty('--mouse-y', `${this.mouseY}px`);
        }
    }
}

// ===== SMOOTH SCROLL MANAGER =====
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    smoothScroll(e) {
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ===== ENHANCED HEADER SCROLL EFFECT =====
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.onScroll(), false);
    }

    onScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        this.lastScroll = currentScroll;
    }
}

// ===== MOBILE MENU HANDLER =====
class MobileMenuHandler {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileLinks = document.querySelectorAll('.mobile-link');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.mobileMenu) return;

        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    }

    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        });

        this.init();
    }

    init() {
        const elements = document.querySelectorAll(
            '.section, .experience-card, .project-card, .skill-category, ' +
            '.education-card, .certification-item, .competencies'
        );
        
        elements.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    }
}

// ===== ACTIVE NAV LINK HIGHLIGHTER =====
class NavLinkHighlighter {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink(), false);
    }

    updateActiveLink() {
        let current = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== TYPING EFFECT FOR HERO =====
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.hero-subtitle');
        if (this.element) {
            this.init();
        }
    }

    init() {
        const text = this.element.textContent;
        this.element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                this.element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 30);
            }
        };

        setTimeout(typeWriter, 1000);
    }
}

// ===== SKILL ITEM INTERACTIONS =====
class SkillInteractions {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.init();
    }

    init() {
        this.skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.onHover(item));
            item.addEventListener('mouseleave', () => this.onLeave(item));
        });
    }

    onHover(item) {
        item.style.transform = 'scale(1.12) translateY(-4px)';
    }

    onLeave(item) {
        item.style.transform = 'scale(1)';
    }
}

// ===== THEME TOGGLE (OPTIONAL) =====
class ThemeToggle {
    constructor() {
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.init();
    }

    init() {
        if (!this.prefersDark) {
            document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// ===== INITIALIZE ALL SYSTEMS =====
document.addEventListener('DOMContentLoaded', () => {
    // Performance monitoring
    console.log('🚀 Initializing Ultra-Premium Portfolio...');
    
    // Initialize all systems
    new ParticleSystem();
    new SpotlightEffect();
    new SmoothScrollManager();
    new HeaderManager();
    new MobileMenuHandler();
    new AnimationObserver();
    new NavLinkHighlighter();
    new TypingEffect();
    new SkillInteractions();
    
    // Observe scroll with debounce for performance
    window.addEventListener('scroll', debounce(() => {
        new NavLinkHighlighter().updateActiveLink();
    }, 50), false);

    document.body.classList.add('loaded');
    console.log('✅ Portfolio fully loaded and optimized!');
});

// ===== UNLOAD CLEANUP =====
window.addEventListener('beforeunload', () => {
    // Clean up event listeners if needed
});
