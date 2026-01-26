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
// FORM VALIDATION
// ========================================
const contactForm = document.getElementById('contactForm');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    company: document.getElementById('company'),
    service: document.getElementById('service'),
    message: document.getElementById('message')
};

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Optional field - always valid if empty, otherwise check format
    if (!phone.trim()) return true;
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    return phoneRegex.test(phone);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function validateService(service) {
    return service !== '';
}

// Show error message
function showError(fieldName, message) {
    const formGroup = formInputs[fieldName].closest('.form-group');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

// Clear error message
function clearError(fieldName) {
    const formGroup = formInputs[fieldName].closest('.form-group');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation on blur
Object.keys(formInputs).forEach(fieldName => {
    if (formInputs[fieldName]) {
        formInputs[fieldName].addEventListener('blur', () => {
            validateField(fieldName);
        });
        
        // Clear error on focus
        formInputs[fieldName].addEventListener('focus', () => {
            clearError(fieldName);
        });
    }
});

// Validate individual field
function validateField(fieldName) {
    const value = formInputs[fieldName].value;
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            isValid = validateName(value);
            errorMessage = 'Veuillez entrer un nom valide (minimum 2 caractères)';
            break;
        case 'email':
            isValid = validateEmail(value);
            errorMessage = 'Veuillez entrer une adresse email valide';
            break;
        case 'phone':
            isValid = validatePhone(value);
            errorMessage = 'Veuillez entrer un numéro de téléphone valide';
            break;
        case 'service':
            isValid = validateService(value);
            errorMessage = 'Veuillez sélectionner un service';
            break;
        case 'message':
            isValid = validateMessage(value);
            errorMessage = 'Veuillez entrer un message (minimum 10 caractères)';
            break;
    }
    
    if (!isValid) {
        showError(fieldName, errorMessage);
    }
    
    return isValid;
}

// ========================================
// FORM SUBMISSION
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear all errors
    Object.keys(formInputs).forEach(fieldName => {
        clearError(fieldName);
    });
    
    // Validate all required fields
    let isFormValid = true;
    
    if (!validateField('name')) isFormValid = false;
    if (!validateField('email')) isFormValid = false;
    if (!validateField('service')) isFormValid = false;
    if (!validateField('message')) isFormValid = false;
    
    // Optional phone validation
    if (formInputs.phone.value && !validateField('phone')) {
        isFormValid = false;
    }
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Submit form (simulate submission)
    submitForm();
});

function submitForm() {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMessage = document.getElementById('formSuccess');
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 1500);
}

// ========================================
// INPUT ANIMATIONS
// ========================================
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.info-card, .benefit-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// ========================================
// CHARACTER COUNT FOR TEXTAREA
// ========================================
const messageTextarea = document.getElementById('message');
const minLength = 10;

messageTextarea.addEventListener('input', () => {
    const currentLength = messageTextarea.value.length;
    
    if (currentLength > 0 && currentLength < minLength) {
        messageTextarea.style.borderColor = 'rgba(239, 68, 68, 0.5)';
    } else if (currentLength >= minLength) {
        messageTextarea.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    } else {
        messageTextarea.style.borderColor = 'rgba(252, 211, 77, 0.2)';
    }
});

// ========================================
// PHONE NUMBER FORMATTING
// ========================================
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format as: +33 6 12 34 56 78
    if (value.startsWith('33')) {
        value = value.slice(2);
    }
    if (value.startsWith('0')) {
        value = value.slice(1);
    }
    
    if (value.length > 0) {
        let formatted = '+33 ';
        for (let i = 0; i < value.length && i < 9; i++) {
            if (i > 0 && i % 2 === 0) {
                formatted += ' ';
            }
            formatted += value[i];
        }
        e.target.value = formatted;
    }
});

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
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(252, 211, 77, 0.06) 0%, transparent 70%);
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
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createCursorGlow();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});