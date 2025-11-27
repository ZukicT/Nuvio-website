// Enhanced JavaScript for better landing page
document.addEventListener('DOMContentLoaded', function() {
    // App card animation
    const appCard = document.querySelector('.app-card');
    if (appCard) {
        appCard.style.opacity = '0';
        appCard.style.transform = 'translateY(50px) scale(0.9)';
        appCard.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            appCard.style.opacity = '1';
            appCard.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }

    // Progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '65%';
        }, 1000);
    }

    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Navigation Toggle - Enhanced with debugging
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    
    console.log('Mobile menu initialization:', { 
        mobileMenuBtn: mobileMenuBtn ? 'Found' : 'Not found', 
        mobileNav: mobileNav ? 'Found' : 'Not found' 
    });
    
    if (mobileMenuBtn && mobileNav) {
        // Toggle mobile menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = mobileNav.classList.contains('mobile-nav-open');
            
            console.log('Mobile menu button clicked. Current state:', isOpen ? 'open' : 'closed');
            
            if (isOpen) {
                // Close mobile menu
                mobileNav.classList.remove('mobile-nav-open');
                mobileMenuBtn.classList.remove('mobile-menu-btn-open');
                body.classList.remove('mobile-menu-open');
                console.log('Mobile menu closed');
            } else {
                // Open mobile menu
                mobileNav.classList.add('mobile-nav-open');
                mobileMenuBtn.classList.add('mobile-menu-btn-open');
                body.classList.add('mobile-menu-open');
                console.log('Mobile menu opened');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        console.log('Mobile nav links found:', mobileNavLinks.length);
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile nav link clicked, closing menu');
                mobileNav.classList.remove('mobile-nav-open');
                mobileMenuBtn.classList.remove('mobile-menu-btn-open');
                body.classList.remove('mobile-menu-open');
            });
        });
        
        // Close mobile menu when clicking the overlay background
        mobileNav.addEventListener('click', function(e) {
            // Only close if clicking the nav overlay itself, not the content
            if (e.target === mobileNav) {
                console.log('Mobile menu overlay clicked, closing menu');
                mobileNav.classList.remove('mobile-nav-open');
                mobileMenuBtn.classList.remove('mobile-menu-btn-open');
                body.classList.remove('mobile-menu-open');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav-open')) {
                console.log('Escape key pressed, closing menu');
                mobileNav.classList.remove('mobile-nav-open');
                mobileMenuBtn.classList.remove('mobile-menu-btn-open');
                body.classList.remove('mobile-menu-open');
            }
        });
        
        console.log('Mobile menu event listeners attached successfully');
    } else {
        console.error('Mobile menu elements not found!');
    }

    // Scroll animations for features and screenshots
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate screenshot items on scroll
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    screenshotItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    // Smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});