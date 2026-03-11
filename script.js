// ===== THEME MANAGER =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.querySelector('.sun-icon');
        this.moonIcon = document.querySelector('.moon-icon');
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

// ===== SPOTLIGHT EFFECT =====
document.addEventListener('mousemove', (e) => {
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('
