document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Theme toggle clicked');
            html.classList.toggle('dark');
            themeToggle.innerHTML = `<i class="fas fa-${html.classList.contains('dark') ? 'sun' : 'moon'}"></i>`;
        });
    } else {
        console.error('Theme toggle not found');
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const closeMenu = () => {
        console.log('Closing mobile menu');
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('open');
        themeToggle.classList.remove('hidden');
        document.body.classList.remove('no-scroll');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Menu toggle clicked');
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
            themeToggle.classList.toggle('hidden');
            document.body.classList.toggle('no-scroll');
        });
    } else {
        console.error('Menu toggle not found');
    }

    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Menu close clicked');
            closeMenu();
        });
    } else {
        console.error('Menu close not found');
    }

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
                    const navHeight = 64;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    setTimeout(() => {
                        console.log('Scroll completed to:', href);
                        closeMenu();
                    }, 1000);
                } else {
                    console.error('Target section not found:', href);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeMenu();
                }
            } catch (error) {
                console.error('Navigation error:', error);
                closeMenu();
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
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
        }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => observer.observe(section));
    } else {
        console.warn('No sections or nav links found for active highlighting');
    }

    if (menuClose) {
        const rect = menuClose.getBoundingClientRect();
        console.log('Close button position:', rect);
        if (rect.right > window.innerWidth || rect.left < 0 || rect.width < 50) {
            console.warn('Close button may be clipped:', rect);
        }
    }
});
