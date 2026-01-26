// ========================================
// MOBILE MENU TOGGLE
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats are in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll(
    '.stat-card, .mission-card, .value-card, .tech-category'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(element);
});

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// ========================================
// TECH ITEMS WAVE ANIMATION
// ========================================
function animateTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    let delay = 0;
    
    techItems.forEach(item => {
        setTimeout(() => {
            item.style.animation = 'techPulse 0.5s ease-out';
        }, delay);
        delay += 50;
    });
    
    // Add keyframes
    if (!document.getElementById('techPulseAnimation')) {
        const style = document.createElement('style');
        style.id = 'techPulseAnimation';
        style.textContent = `
            @keyframes techPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Trigger tech animation when visible
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateTechItems();
        }
    });
}, { threshold: 0.3 });

const techSection = document.querySelector('.tech-section');
if (techSection) {
    techObserver.observe(techSection);
}

// ========================================
// MISSION CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.mission-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const number = card.querySelector('.mission-number');
        number.style.color = 'rgba(252, 211, 77, 0.3)';
        number.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const number = card.querySelector('.mission-number');
        number.style.color = 'rgba(252, 211, 77, 0.1)';
        number.style.transform = 'scale(1)';
    });
});

// ========================================
// VALUE CARDS STAGGER ANIMATION
// ========================================
const valueCards = document.querySelectorAll('.value-card');

const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

valueCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    valueObserver.observe(card);
});

// ========================================
// CURSOR GLOW EFFECT
// ========================================
function createCursorGlow() {
    // Skip on mobile
    if ('ontouchstart' in window) return;
    
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(252, 211, 77, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        trail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
    
    // Smooth follow
    function animate() {
        trailX += (cursorX - trailX) * 0.15;
        trailY += (cursorY - trailY) * 0.15;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// STORY TEXT FADE IN
// ========================================
const storyText = document.querySelector('.story-text');
if (storyText) {
    const paragraphs = storyText.querySelectorAll('p');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    paragraphs.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateX(-20px)';
        p.style.transition = 'all 0.8s ease-out';
        textObserver.observe(p);
    });
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--color-yellow);
        z-index: 10000;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========================================
// INITIALIZE ALL EFFECTS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createCursorGlow();
    createScrollProgress();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('*').forEach(element => {
        element.style.transition = 'all 0.2s ease !important';
    });
}

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});