// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Theme toggle clicked');
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
        });
    } else {
        console.error('Theme toggle not found');
    }

    // Mobile Menu Elements
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    // Close Menu Function
    const closeMenu = () => {
        console.log('Closing mobile menu');
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('open');
        themeToggle.classList.remove('hidden');
        document.body.classList.remove('no-scroll');
    };

    // Menu Toggle
    if (menuToggle) {
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
    } else {
        console.error('Menu toggle not found');
    }

    // Menu Close
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Menu close clicked');
            closeMenu();
        });
    } else {
        console.error('Menu close not found');
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('#mobile-menu .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const href = this.getAttribute('href');
            console.log('Mobile nav link clicked:', href);
            try {
                const target = document.querySelector(href);
                if (target) {
                    console.log('Scroll initiated to:', href);
                    // Ensure DOM is updated
                    requestAnimationFrame(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    });
                    // Close menu after scroll
                    setTimeout(() => {
                        console.log('Scroll completed to:', href);
                        closeMenu();
                    }, 1000); // Increased for reliability
                } else {
                    console.error('Target section not found:', href);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    closeMenu();
                }
            } catch (error) {
                console.error('Navigation error:', error);
                closeMenu();
            }
        });
    });

    // Active Section Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
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
    } else {
        console.warn('No sections or nav links found for active highlighting');
    }

    // Check Close Button Visibility
    if (menuClose) {
        const rect = menuClose.getBoundingClientRect();
        console.log('Close button position:', rect);
        if (rect.right > window.innerWidth || rect.left < 0 || rect.width < 50) {
            console.warn('Close button may be clipped:', rect);
        }
    }
});
