document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle & Persistence --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let icon = null;
    if (themeToggle) {
        icon = themeToggle.querySelector('i');
        
        // Check local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else if (savedTheme === 'light') {
            body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Listeners
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    /* --- Navigation & Header --- */
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* --- Scroll Spy Navigation Context --- */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (!sectionsClass) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active');
            } else {
                sectionsClass.classList.remove('active');
            }
        });
    };
    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Trigger on load

    /* --- Intersection Observer for Scroll Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation triggers once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    animatedElements.forEach(el => observer.observe(el));

    /* --- Typewriter Effect for Name --- */
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const nameText = nameElement.textContent.trim();
        nameElement.innerHTML = '<span class="typed-text"></span><span class="cursor"></span>';
        const typedTextSpan = nameElement.querySelector('.typed-text');
        
        let charIndex = 0;
        const cursorSpan = nameElement.querySelector('.cursor');
        
        function type() {
            if (charIndex < nameText.length) {
                typedTextSpan.textContent += nameText.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Typing speed
            } else if (cursorSpan) {
                cursorSpan.remove(); // Remove cursor after typing completes
            }
        }
        
        // Start typing effect after the main fade-in animation completes
        setTimeout(type, 1000);
    }

});
