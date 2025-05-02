document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Package Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-tab');
            
            packageCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
        showTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    });
    
    // Initialize first testimonial
    showTestimonial(currentIndex);
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('.destination-card, .package-card, .section-header');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('slide-up');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image Lazy Loading
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});


// Video Modal Functionality
const videoBtn = document.querySelector('.video-btn');
const modal = document.getElementById('video-modal');
const closeBtn = document.querySelector('.close');

if(videoBtn) {
    videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = "block";
        
        // Autoplay the video when modal opens
        const iframe = modal.querySelector('iframe');
        if(iframe) {
            const src = iframe.src;
            iframe.src = src.includes('autoplay=1') ? src : src + '&autoplay=1';
        }
    });
}

if(closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        
        // Reset video when modal closes
        const iframe = modal.querySelector('iframe');
        if(iframe) {
            iframe.src = iframe.src.replace('&autoplay=1', '');
        }
    });
}

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


// Add this to your existing booking.js

// Parallax Effect
function initParallax() {
    const parallax = document.querySelector('.hero-parallax');
    if (!parallax) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const layers = parallax.querySelectorAll('.parallax-layer');
        
        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const movement = scrollPosition * depth;
            layer.style.transform = `translateY(${movement}px)`;
        });
    });
}

// Animate progress steps as user scrolls
function animateProgressOnScroll() {
    const progressSteps = document.querySelectorAll('.progress-step');
    if (!progressSteps.length) return;
    
    const formSection = document.querySelector('.booking-form-section');
    const formSteps = document.querySelectorAll('.form-step');
    
    window.addEventListener('scroll', function() {
        const formTop = formSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (formTop < windowHeight * 0.8) {
            const activeStep = document.querySelector('.form-step.active');
            const stepNumber = parseInt(activeStep.dataset.step);
            
            // Update progress UI
            document.querySelector('.progress-fill').style.width = `${(stepNumber / 3) * 100}%`;
            
            progressSteps.forEach((step, index) => {
                if (index < stepNumber) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    animateProgressOnScroll();
    
    // Add hover effects to progress steps
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.querySelector('.step-icon').style.transform = 'scale(1.05)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.querySelector('.step-icon').style.transform = '';
            }
        });
    });
    
    // Smooth scroll to form when clicking scroll prompt
    const scrollPrompt = document.querySelector('.scroll-prompt');
    if (scrollPrompt) {
        scrollPrompt.addEventListener('click', function() {
            document.querySelector('.booking-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});


// Developer Slider Functionality
function initDeveloperSlider() {
    const slider = document.querySelector('.developer-slider');
    const cards = document.querySelectorAll('.developer-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => {
        nextSlide();
    }, 5000);
    
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function updateSlider() {
        slider.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', resetAutoSlide);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDeveloperSlider();
});


// Auth Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const forgotPassword = document.getElementById('forgot-password');
    const backToLogin = document.getElementById('back-to-login');
    const signupPassword = document.getElementById('signup-password');
    const passwordStrength = document.querySelector('.password-strength');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    // Open modal
    function openAuthModal(formType) {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchTab(formType);
    }

    // Close modal
    function closeAuthModal() {
        authModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Switch between tabs
    function switchTab(tabName) {
        // Update tabs
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update forms
        authForms.forEach(form => {
            form.classList.toggle('active', form.dataset.form === tabName);
        });
    }

    // Event listeners
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openAuthModal('login');
    });

    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openAuthModal('signup');
    });

    closeModal.addEventListener('click', closeAuthModal);

    // Close modal when clicking outside
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Forgot password
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('forgot');
    });

    // Back to login
    backToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('login');
    });

    // Password strength meter
    signupPassword?.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;

        // Check length
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;

        // Check for numbers
        if (/\d/.test(password)) strength++;

        // Check for special chars
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        // Update UI
        strengthBars.forEach((bar, index) => {
            bar.style.background = index < strength ? getStrengthColor(strength) : '#eee';
        });

        strengthText.textContent = getStrengthText(strength);
        strengthText.style.color = getStrengthColor(strength);
    });

    function getStrengthColor(strength) {
        const colors = ['#ff4d4d', '#ffa64d', '#66cc66', '#3399ff'];
        return colors[Math.min(strength, colors.length - 1)];
    }

    function getStrengthText(strength) {
        const texts = ['Very Weak', 'Weak', 'Medium', 'Strong'];
        return texts[Math.min(strength, texts.length - 1)];
    }

    // Form submissions
    document.getElementById('login-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Add your login logic here
        console.log('Login attempt with:', email, password);
        alert('Login functionality would be implemented here');
    });

    document.getElementById('signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        // Add your signup logic here
        console.log('Signup attempt with:', name, email, password);
        alert('Signup functionality would be implemented here');
    });

    document.getElementById('forgot-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        
        // Add your forgot password logic here
        console.log('Password reset requested for:', email);
        alert('Password reset link would be sent to ' + email);
        switchTab('login');
    });
});

// Typing Animation
function initTypingAnimation() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (!typedTextSpan || !cursorSpan) return;
    
    const textArray = ["Adventure", "Dream Travel with family", "Place"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start animation
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
});