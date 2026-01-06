// Theme Toggle - Dark mode is default
document.addEventListener('DOMContentLoaded', function() {
    // Check localStorage, default to dark mode if not set
    const savedTheme = localStorage.getItem('theme');
    
    // Default to dark mode
    if (savedTheme === null || savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Update icon visibility
    function updateIcons() {
        const isDark = document.body.classList.contains('dark-mode');
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');
        
        sunIcons.forEach(icon => {
            icon.style.display = isDark ? 'none' : 'block';
        });
        moonIcons.forEach(icon => {
            icon.style.display = isDark ? 'block' : 'none';
        });
    }

    // Initial icon update
    updateIcons();

    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
            updateIcons();
        });
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});
