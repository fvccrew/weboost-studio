// ========================================
// CREATE ORBITAL PARTICLES
// ========================================
function createOrbitalParticles() {
    const container = document.getElementById('orbitalParticles');
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('orbital-particle');
        
        // Calculate orbit properties
        const orbitRadius = 150 + (i * 30);
        const duration = 4 + (i * 0.5);
        const delay = (i * 0.3);
        const size = 8 + Math.random() * 4;
        
        particle.style.setProperty('--orbit-radius', `${orbitRadius}px`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = '50%';
        particle.style.left = '50%';
        
        container.appendChild(particle);
    }
}

// ========================================
// ENTER BUTTON
// ========================================
const enterBtn = document.getElementById('enterBtn');
const introPage = document.querySelector('.intro-page');

enterBtn.addEventListener('click', () => {
    goToMainSite();
});

// ========================================
// KEYBOARD SUPPORT
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToMainSite();
    }
});

// ========================================
// GO TO MAIN SITE
// ========================================
function goToMainSite() {
    introPage.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 1000);
}

// ========================================
// PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Create orbital particles
    createOrbitalParticles();
    
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Auto focus button
    setTimeout(() => {
        enterBtn.focus();
    }, 2000);
    
    // Preload main page
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'main.html';
    document.head.appendChild(link);
});