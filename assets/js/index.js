/* ===================================
   WEBBOOST STUDIO - ANIMATIONS
   Dark moderne avec toutes les animations
   =================================== */

// INTRO ANIMATION - EXPLOSION DORÉE
(function() {
    const intro = document.getElementById('intro-animation');
    if (!intro) return;

    // Vérifier si l'intro a déjà été vue pendant cette session
    const introAlreadySeen = sessionStorage.getItem('introSeen');
    
    if (introAlreadySeen) {
        // Si déjà vue, masquer l'intro immédiatement
        intro.style.display = 'none';
        return;
    }
    
    // Marquer l'intro comme vue
    sessionStorage.setItem('introSeen', 'true');

    // PARTICULES DORÉES
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas?.getContext('2d');
    
    if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        // Moins de particules sur mobile pour meilleures performances
        const particleCount = window.innerWidth < 768 ? 50 : 100;

        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;
                this.vx = (Math.random() - 0.5) * 8;
                this.vy = (Math.random() - 0.5) * 8;
                this.life = 1;
                this.size = Math.random() * 3 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= 0.01;
                if (this.life <= 0) this.reset();
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(252, 211, 77, ${this.life})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        setTimeout(animateParticles, 500);
        setTimeout(() => particles.length = 0, 4000);
    }

    // LETTRES EXPLOSION + ROTATION
    const letters = document.querySelectorAll('.letter-explode');
    letters.forEach((letter, i) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'scale(1) rotate(360deg)';
            letter.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, 600 + (i * 80));
    });

    const lettersSub = document.querySelectorAll('.letter-explode-sub');
    lettersSub.forEach((letter, i) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'scale(1) rotate(360deg)';
            letter.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, 1400 + (i * 60));
    });

    // ANIMATION WAVE - TAGLINE
    const words = document.querySelectorAll('.intro-tagline .word');
    words.forEach((word, i) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
            word.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 2000 + (i * 150));
    });

    // FADE OUT DOUX
    setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.transition = 'opacity 1.5s ease';
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1500);
    }, 3200);
})();

// ANIMATION HERO TITLE - APPARAÎT TOUT DE SUITE
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0) scale(1)';
        }
    }, 100);
});

// CURSEUR PERSONNALISÉ
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animate() {
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Agrandir sur hover
    document.querySelectorAll('a, button, .service-card, .pricing-card, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2)';
            cursorFollower.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
        });
    });
}

// MENU MOBILE
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// COMPTEURS ANIMÉS
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 30; // Réduit de 50 à 30 pour meilleures perfs
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 40); // Augmenté de 30 à 40ms
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// SCROLL REVEAL
const revealElements = document.querySelectorAll('.contact-form, .contact-info');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ANIMATION CASCADE - SERVICES
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150);
            });
            servicesObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
    servicesObserver.observe(servicesGrid);
}

// ANIMATION CASCADE - PRICING
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150);
            });
            pricingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const pricingGrid = document.querySelector('.pricing-grid');
if (pricingGrid) {
    pricingObserver.observe(pricingGrid);
}

// ANIMATION CASCADE - PORTFOLIO
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
            portfolioObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    portfolioObserver.observe(portfolioGrid);
}

// ANIMATION TITRES - FADE + SCALE
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h2 = entry.target.querySelector('h2');
            const p = entry.target.querySelector('p');
            const h3 = entry.target.querySelector('h3');
            
            if (h2) {
                setTimeout(() => h2.classList.add('animate'), 100);
            }
            if (p) {
                setTimeout(() => p.classList.add('animate'), 100);
            }
            if (h3) {
                setTimeout(() => h3.classList.add('animate'), 100);
            }
            
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-header, .about-text').forEach(el => {
    titleObserver.observe(el);
});

// ANIMATION ABOUT - SLIDE LATÉRAL
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const aboutImage = document.querySelector('.about-image');
            const aboutText = document.querySelector('.about-text');
            
            if (aboutImage) {
                setTimeout(() => aboutImage.classList.add('animate'), 100);
            }
            if (aboutText) {
                setTimeout(() => aboutText.classList.add('animate'), 300);
            }
            
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutObserver.observe(aboutContent);
}

// PARALLAX (Desktop seulement)
if (window.innerWidth > 1024) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// FORMULAIRE CONTACT
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// HEADER SCROLL
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

console.log('🚀 WebBoost Studio - Dark Mode chargé !');