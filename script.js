// Theme Toggle - Dark mode is default. The initial class is set by an inline
// script in each page's <head> so the page doesn't flash on load.
document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(!root.classList.contains('light')));
        themeToggle.addEventListener('click', function() {
            const isLight = root.classList.toggle('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggle.setAttribute('aria-pressed', String(!isLight));
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

// Home page CMOS inverter: click to flip the input
document.addEventListener('DOMContentLoaded', function() {
    const inverter = document.querySelector('.inverter');
    if (!inverter) return;

    const inVal = inverter.querySelector('.val-in');
    const outVal = inverter.querySelector('.val-out');

    function toggle() {
        const next = inverter.dataset.in === '1' ? '0' : '1';
        inverter.dataset.in = next;
        inVal.textContent = next;
        outVal.textContent = next === '1' ? '0' : '1';
        inverter.setAttribute('aria-pressed', String(next === '1'));
    }

    inverter.addEventListener('click', toggle);
    inverter.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
        }
    });
});
