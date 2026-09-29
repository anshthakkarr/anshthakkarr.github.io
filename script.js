// Theme Toggle - Dark mode is default. The initial class is set by an inline
// script in each page's <head> so the page doesn't flash on load.
document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isLight = root.classList.toggle('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        function setOpen(open) {
            navMenu.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
        }

        hamburger.addEventListener('click', function() {
            setOpen(!navMenu.classList.contains('active'));
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                setOpen(false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                setOpen(false);
            }
        });
    }
});

// Scroll reveal
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    items.forEach(el => {
        const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
        el.style.setProperty('--delay', (siblings.indexOf(el) % 6) * 90 + 'ms');
    });

    function show(el) {
        el.classList.add('is-visible');
        // Drop the reveal classes afterwards so hover transitions use their own timing
        setTimeout(() => {
            el.classList.remove('reveal', 'is-visible');
            el.style.removeProperty('--delay');
        }, 1300);
    }

    if (!('IntersectionObserver' in window)) {
        items.forEach(show);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                show(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
});

// Cursor-following highlight on cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.spotlight').forEach(card => {
        card.addEventListener('pointermove', function(event) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
        });
    });
});
