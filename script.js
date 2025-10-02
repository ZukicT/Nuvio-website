// Enhanced JavaScript for better landing page
document.addEventListener('DOMContentLoaded', function() {
    // App Store link placeholder
    const appStoreLink = document.getElementById('app-store-link');
    if (appStoreLink) {
        appStoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show coming soon message
            const originalText = this.innerHTML;
            this.innerHTML = '<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>Coming Soon!';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
            }, 2000);
        });
    }

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

    // Parallax effect removed - hero image now stays static
});