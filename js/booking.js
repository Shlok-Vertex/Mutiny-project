document.addEventListener('DOMContentLoaded', function() {
    // Initialize form steps
    const form = document.getElementById('bookingForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 0;
    
    // Show initial step
    showStep(currentStep);
    
    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate current step before proceeding
            if (!validateStep(currentStep)) {
                return;
            }
            
            // For payment step, show loading overlay
            if (currentStep === 1) {
                showLoadingOverlay();
                
                // Simulate payment processing
                setTimeout(() => {
                    hideLoadingOverlay();
                    goToStep(currentStep + 1);
                }, 2000);
            } else {
                goToStep(currentStep + 1);
            }
        });
    });
    
    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            goToStep(currentStep - 1);
        });
    });
    
    // Function to navigate between steps
    function goToStep(stepIndex) {
        // Hide current step with animation
        steps[currentStep].classList.remove('active');
        steps[currentStep].classList.add('fade-out');
        
        setTimeout(() => {
            steps[currentStep].classList.remove('fade-out');
            currentStep = stepIndex;
            showStep(currentStep);
            updateStepIndicator(currentStep);
            
            // Scroll to top of form
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
    
    // Function to show a specific step
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
                
                // Focus first input in step
                const firstInput = step.querySelector('input, select');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 400);
                }
            } else {
                step.classList.remove('active');
            }
        });
        
        // Disable back button on first step
        if (stepIndex === 0) {
            document.querySelector('.prev-step').disabled = true;
        } else {
            document.querySelector('.prev-step').disabled = false;
        }
        
        // Update confirmation summary on last step
        if (stepIndex === 2) {
            updateConfirmationSummary();
        }
    }
    
    // Update step indicator visuals
    function updateStepIndicator(stepIndex) {
        stepIndicators.forEach((indicator, index) => {
            if (index <= stepIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Validate current step
    function validateStep(stepIndex) {
        let isValid = true;
        const currentStepInputs = steps[stepIndex].querySelectorAll('input[required], select[required]');
        
        currentStepInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            const errorMsg = formGroup.querySelector('.error-message');
            
            // Basic required field validation
            if (!input.value.trim()) {
                formGroup.classList.add('has-error');
                errorMsg.textContent = 'This field is required';
                isValid = false;
            } 
            // Email validation
            else if (input.type === 'email' && !validateEmail(input.value)) {
                formGroup.classList.add('has-error');
                errorMsg.textContent = 'Please enter a valid email';
                isValid = false;
            }
            // Phone validation
            else if (input.id === 'phone' && !validatePhone(input.value)) {
                formGroup.classList.add('has-error');
                errorMsg.textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            // Card number validation
            else if (input.id === 'cardNumber') {
                const cardNumber = input.value.replace(/\s/g, '');
                if (cardNumber.length < 16 || !validateCardNumber(cardNumber)) {
                    formGroup.classList.add('has-error');
                    errorMsg.textContent = 'Please enter a valid card number';
                    isValid = false;
                } else {
                    detectCardType(cardNumber);
                }
            }
            // Expiry date validation
            else if (input.id === 'expiry' && !validateExpiryDate(input.value)) {
                formGroup.classList.add('has-error');
                errorMsg.textContent = 'Please enter a valid expiry date (MM/YY)';
                isValid = false;
            }
            // CVV validation
            else if (input.id === 'cvv' && !validateCVV(input.value)) {
                formGroup.classList.add('has-error');
                errorMsg.textContent = 'Please enter a valid CVV';
                isValid = false;
            }
            // If valid, remove error state
            else {
                formGroup.classList.remove('has-error');
            }
        });
        
        // Scroll to first error if any
        if (!isValid) {
            const firstError = steps[stepIndex].querySelector('.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }
    
    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone validation
    function validatePhone(phone) {
        const re = /^[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    // Card number validation (Luhn algorithm)
    function validateCardNumber(cardNumber) {
        // Remove all non-digit characters
        cardNumber = cardNumber.replace(/\D/g, '');
        
        // Check if the card number is all digits and has proper length
        if (!/^\d{13,19}$/.test(cardNumber)) {
            return false;
        }
        
        // Luhn algorithm
        let sum = 0;
        let shouldDouble = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return (sum % 10) === 0;
    }
    
    // Expiry date validation
    function validateExpiryDate(expiry) {
        const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!re.test(expiry)) return false;
        
        const [month, year] = expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        // Convert to numbers
        const expMonth = parseInt(month);
        const expYear = parseInt(year);
        
        // Check if expiry is in the future
        if (expYear > currentYear || 
           (expYear === currentYear && expMonth >= currentMonth)) {
            return true;
        }
        
        return false;
    }
    
    // CVV validation
    function validateCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    // Detect card type
    function detectCardType(cardNumber) {
        const cardContainer = document.getElementById('cardNumber').closest('.form-group');
        cardContainer.classList.remove('visa', 'mastercard', 'amex');
        
        // Remove all non-digit characters
        const num = cardNumber.replace(/\D/g, '');
        
        if (/^4/.test(num)) {
            cardContainer.classList.add('visa');
        } else if (/^5[1-5]/.test(num)) {
            cardContainer.classList.add('mastercard');
        } else if (/^3[47]/.test(num)) {
            cardContainer.classList.add('amex');
        }
    }
    
    // Format card number input
    document.getElementById('cardNumber')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 16) value = value.substr(0, 16);
        
        // Add space after every 4 digits
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        
        // Detect card type
        detectCardType(value);
    });
    
    // Format expiry date input
    document.getElementById('expiry')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substr(0, 2) + '/' + value.substr(2, 2);
        }
        e.target.value = value;
    });
    
    // Format phone number input
    document.getElementById('phone')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.substr(0, 10);
        
        // Format as (123) 456-7890
        if (value.length > 3 && value.length <= 6) {
            value = `(${value.substr(0, 3)}) ${value.substr(3)}`;
        } else if (value.length > 6) {
            value = `(${value.substr(0, 3)}) ${value.substr(3, 3)}-${value.substr(6)}`;
        }
        
        e.target.value = value;
    });
    
    // Update confirmation summary
    function updateConfirmationSummary() {
        const summary = document.getElementById('bookingSummary');
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            country: document.getElementById('country').options[document.getElementById('country').selectedIndex].text,
            travelers: document.getElementById('travelers').options[document.getElementById('travelers').selectedIndex].text,
            travelDate: document.getElementById('travelDate').value,
            cardLast4: document.getElementById('cardNumber').value.slice(-4)
        };
        
        // Format date
        const formattedDate = new Date(formData.travelDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        summary.innerHTML = `
            <div class="summary-item">
                <strong>Booking Reference</strong>
                <p>WL-${Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <div class="summary-item">
                <strong>Full Name</strong>
                <p>${formData.name}</p>
            </div>
            <div class="summary-item">
                <strong>Email</strong>
                <p>${formData.email}</p>
            </div>
            <div class="summary-item">
                <strong>Phone</strong>
                <p>${formData.phone}</p>
            </div>
            <div class="summary-item">
                <strong>Travel Date</strong>
                <p>${formattedDate}</p>
            </div>
            <div class="summary-item">
                <strong>Number of Travelers</strong>
                <p>${formData.travelers}</p>
            </div>
            <div class="summary-item">
                <strong>Payment Method</strong>
                <p>Credit Card ending in ${formData.cardLast4}</p>
            </div>
        `;
    }
    
    // Loading overlay functions
    function showLoadingOverlay() {
        document.querySelector('.loading-overlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function hideLoadingOverlay() {
        document.querySelector('.loading-overlay').style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Initialize all form groups with error containers
    document.querySelectorAll('.form-group').forEach(group => {
        if (!group.querySelector('.error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            group.appendChild(errorMsg);
        }
    });
    
    // Set minimum date for travel date (today + 1 day)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
    
    document.getElementById('travelDate').min = `${yyyy}-${mm}-${dd}`;
});