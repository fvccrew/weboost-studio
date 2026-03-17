// ===================================
// ANIMATION D'INTRO AVEC PARTICULES
// ===================================

// Masquer le contenu principal pendant l'intro
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on doit sauter l'intro
    const skipIntro = window.location.hash === '#skip-intro' || sessionStorage.getItem('introPlayed') === 'true';
    
    const introAnimation = document.getElementById('intro-animation');
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero');
    
    if (skipIntro) {
        // Masquer immédiatement l'intro
        if (introAnimation) {
            introAnimation.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        
        // Forcer l'affichage immédiat du contenu
        if (navbar) {
            navbar.style.opacity = '1';
            navbar.style.animation = 'none';
        }
        if (hero) {
            hero.style.opacity = '1';
            hero.style.animation = 'none';
        }
        
        // Forcer l'affichage des éléments hero
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.animation = 'none';
            heroContent.style.transform = 'translateX(0)';
        }
        if (heroVisual) {
            heroVisual.style.opacity = '1';
            heroVisual.style.animation = 'none';
            heroVisual.style.transform = 'translateX(0)';
        }
        
        // Nettoyer le hash si présent
        if (window.location.hash === '#skip-intro') {
            history.replaceState(null, null, ' ');
        }
    } else {
        // Animation normale
        document.body.style.overflow = 'hidden';
        
        // Initialiser le canvas de particules
        initParticles();
        
        // Après 6 secondes (au lieu de 5), afficher le contenu et permettre le scroll
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            // Marquer que l'intro a été jouée pour cette session
            sessionStorage.setItem('introPlayed', 'true');
        }, 6000);
    }
});

// Système de particules pour l'animation d'intro
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = Math.random() > 0.5 ? '#FCD34D' : '#F59E0B';
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            
            if (this.y < 0) {
                this.reset();
                this.y = canvas.height;
            }
            
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Effet de traînée
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = this.opacity * 0.3;
            ctx.fill();
        }
    }
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    let animationActive = true;
    
    // Animation
    function animate() {
        if (!animationActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Arrêter l'animation après l'intro
    setTimeout(() => {
        animationActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);
    
    // Redimensionner le canvas
    window.addEventListener('resize', () => {
        if (animationActive) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// ===================================
// PARTICULES PERMANENTES DU SITE
// ===================================

function initSiteParticles() {
    const canvas = document.getElementById('site-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100; // Plus de particules
    
    class SiteParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1; // Plus grandes
            this.speedY = Math.random() * 2 + 0.8; // Plus rapides
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.6 + 0.4; // Plus opaques
            this.color = Math.random() > 0.5 ? '#FCD34D' : '#F59E0B';
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            
            if (this.y < 0) {
                this.reset();
                this.y = canvas.height;
            }
            
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Effet de traînée plus visible
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = this.opacity * 0.4;
            ctx.fill();
        }
    }
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new SiteParticle());
    }
    
    // Animation continue
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionner le canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Lancer les particules du site après l'intro
setTimeout(() => {
    initSiteParticles();
}, 6000);

// ===================================
// GESTION DU POPUP COOKIES
// ===================================

// Vérifier si l'utilisateur a déjà accepté/refusé les cookies
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.getElementById('cookie-banner');
    
    if (!cookieConsent) {
        // Afficher le popup après l'intro
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 7000); // Après l'animation d'intro
    }
}

// Accepter les cookies
document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').classList.remove('show');
    
    // Ici vous pouvez ajouter votre code pour activer Google Analytics, etc.
    console.log('Cookies acceptés');
});

// Refuser les cookies
document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-banner').classList.remove('show');
    
    console.log('Cookies refusés');
});

// Vérifier au chargement de la page
checkCookieConsent();

// ===================================
// NAVIGATION
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation sticky avec effet de scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre à la navbar au scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// NAVIGATION ACTIVE LINKS
// ===================================

// Observer pour mettre à jour le lien actif en fonction de la section visible
const sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
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

// ===================================
// ANIMATIONS AU SCROLL
// ===================================

// Intersection Observer pour les animations au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .stat-item, .contact-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
};

// Lancer les animations après l'intro
setTimeout(() => {
    animateOnScroll();
}, 6000);

// ===================================
// FORMULAIRE DE CONTACT
// ===================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        formule: document.getElementById('formule').value,
        message: document.getElementById('message').value
    };
    
    // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        submitButton.innerHTML = '<span>Message envoyé !</span> <i class="fas fa-check"></i>';
        submitButton.style.background = '#10b981';
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher un message de succès
        showNotification('Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', 'success');
        
        // Restaurer le bouton après 3 secondes
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
        
    }, 2000);
});

// ===================================
// SYSTÈME DE NOTIFICATION
// ===================================

function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter les styles inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10001;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Ajouter les keyframes pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// EFFET PARALLAX LÉGER
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.circle-decoration');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// ===================================
// ANIMATION DES CARTES FLOTTANTES
// ===================================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// COMPTEUR ANIMÉ POUR LES STATS
// ===================================

const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Si c'est un nombre, animer
                if (!isNaN(finalValue)) {
                    let current = 0;
                    const increment = finalValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current);
                        }
                    }, 30);
                }
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
};

setTimeout(() => {
    animateCounters();
}, 6000);

// ===================================
// EFFET HOVER SUR LES CARTES DE SERVICE
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// BOUTON SCROLL TO TOP
// ===================================

// Créer le bouton scroll to top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
    color: #0F172A;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 20px rgba(252, 211, 77, 0.3);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

// Afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll vers le haut au clic
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 6px 30px rgba(252, 211, 77, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = '';
    scrollTopBtn.style.boxShadow = '0 4px 20px rgba(252, 211, 77, 0.3)';
});

// ===================================
// CURSEUR PERSONNALISÉ (OPTIONNEL)
// ===================================

// Créer un curseur personnalisé élégant
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #FCD34D;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0;
`;

document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
});

// Animation fluide du curseur
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Agrandir le curseur sur les éléments cliquables
const clickableElements = document.querySelectorAll('a, button, .service-card, .pricing-card');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'rgba(252, 211, 77, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});

// Masquer le curseur personnalisé sur mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
}

// ===================================
// LOADING POUR LES IMAGES (SI VOUS EN AJOUTEZ)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.animation = 'fadeIn 0.5s ease';
        });
    });
});

// ===================================
// PERFORMANCE : LAZY LOADING
// ===================================

// Si vous ajoutez des images plus tard
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🚀 WebBoost Studio', 'color: #FCD34D; font-size: 24px; font-weight: bold;');
console.log('%cSite développé avec passion ❤️', 'color: #94A3B8; font-size: 14px;');
console.log('%cGolfe de Saint-Tropez', 'color: #F59E0B; font-size: 12px;');

// ===================================
// HERO GRID ANIMATION
// ===================================
function initHeroGrid() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const gridSize = 40;
    const dots = [];
    const mouse = { x: null, y: null };
    const maxDistance = 150;
    
    // Créer les points de la grille
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            dots.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0
            });
        }
    }
    
    // Suivre la souris
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les lignes de grille
        ctx.strokeStyle = 'rgba(252, 211, 77, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < canvas.width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < canvas.height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Animer et dessiner les points
        dots.forEach(dot => {
            // Interaction souris
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    dot.vx += dx * force * 0.02;
                    dot.vy += dy * force * 0.02;
                }
            }
            
            // Retour à la position de base
            dot.vx += (dot.baseX - dot.x) * 0.05;
            dot.vy += (dot.baseY - dot.y) * 0.05;
            
            // Friction
            dot.vx *= 0.9;
            dot.vy *= 0.9;
            
            // Mise à jour position
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Dessiner le point
            const distanceFromBase = Math.sqrt(
                Math.pow(dot.x - dot.baseX, 2) + Math.pow(dot.y - dot.baseY, 2)
            );
            const opacity = Math.min(0.8, 0.3 + distanceFromBase / 50);
            
            ctx.fillStyle = `rgba(252, 211, 77, ${opacity})`;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Redimensionnement
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    // Démarrer l'animation après l'intro
    setTimeout(() => {
        animate();
    }, 6000);
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroGrid);
} else {
    initHeroGrid();
}