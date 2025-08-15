// Create animated background particles
function createAnimatedParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: #00ffff;
            border-radius: 50%;
            box-shadow: 0 0 10px #00ffff;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg); 
                opacity: 0.3; 
            }
            25% { 
                transform: translateY(-30px) translateX(20px) rotate(90deg); 
                opacity: 0.8; 
            }
            50% { 
                transform: translateY(-10px) translateX(-15px) rotate(180deg); 
                opacity: 1; 
            }
            75% { 
                transform: translateY(-25px) translateX(10px) rotate(270deg); 
                opacity: 0.6; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedParticles();
    const form = document.getElementById('applicationForm');
    const submitBtn = form.querySelector('.submit-btn');
    const inputs = form.querySelectorAll('.input');
    const requiredInputs = form.querySelectorAll('.input[required]');

    // Form validation
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error state
        formGroup.classList.remove('error');
        let existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check if required field is empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // URL validation
        else if (field.type === 'url' && field.value) {
            try {
                new URL(field.value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }
        // Phone validation (basic)
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/\s|-|\(|\)/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            formGroup.classList.add('error');
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = errorMessage;
            field.parentNode.appendChild(errorEl);
        }

        return isValid;
    }

    // Validate all fields
    function validateForm() {
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Check consent checkbox
        const consentCheckbox = document.getElementById('consent');
        if (!consentCheckbox.checked) {
            isFormValid = false;
            consentCheckbox.closest('.checkbox-group').style.borderColor = '#ef4444';
        } else {
            consentCheckbox.closest('.checkbox-group').style.borderColor = '#e5e7eb';
        }

        return isFormValid;
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Consent checkbox validation
    const consentCheckbox = document.getElementById('consent');
    consentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            this.closest('.checkbox-group').style.borderColor = '#e5e7eb';
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';

        // Submit form data using FormSubmit
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Redirect to success page after successful submission
                window.location.href = 'success.html';
            } else {
                showErrorMessage('There was a problem submitting your application. Please try again.');
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = 'Submit Application';
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showEmailFallback();
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Submit Application';
        });
    });

    // Fallback - show email option
    function showEmailFallback() {
        const formData = new FormData(form);
        let emailBody = `NEW JOB APPLICATION\n\n`;
        emailBody += `Name: ${formData.get('first_name')} ${formData.get('last_name')}\n`;
        emailBody += `Email: ${formData.get('email')}\n`;
        emailBody += `Phone: ${formData.get('phone') || 'Not provided'}\n`;
        emailBody += `Position: ${formData.get('position')}\n`;
        emailBody += `Experience: ${formData.get('experience')}\n`;
        emailBody += `Skills: ${formData.get('skills')}\n`;
        emailBody += `Motivation: ${formData.get('motivation')}\n`;
        
        const mailtoLink = `mailto:contact@present-the-app.com?subject=${encodeURIComponent('Job Application - AI Frontier')}&body=${encodeURIComponent(emailBody)}`;
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message-banner show';
        errorMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="color: #ef4444;">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <strong>Submission Failed</strong><br>
                    Please <a href="${mailtoLink}" style="color: #00ffff; text-decoration: underline;">click here to send via email</a> or contact us directly at contact@present-the-app.com
                </div>
            </div>
        `;
        
        form.insertBefore(errorMessage, form.firstChild);
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Show success message
    function showSuccessMessage() {
        // Remove existing messages
        const existingSuccess = document.querySelector('.success-message');
        const existingError = document.querySelector('.error-message-banner');
        if (existingSuccess) existingSuccess.remove();
        if (existingError) existingError.remove();

        // Create and show new success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message show';
        successMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="color: #10b981;">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                </svg>
                <div>
                    <strong>Application Submitted Successfully!</strong><br>
                    Thank you for your interest! We'll review your application and get back to you soon.
                </div>
            </div>
        `;
        
        form.insertBefore(successMessage, form.firstChild);
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Show error message
    function showErrorMessage(message) {
        // Remove existing messages
        const existingSuccess = document.querySelector('.success-message');
        const existingError = document.querySelector('.error-message-banner');
        if (existingSuccess) existingSuccess.remove();
        if (existingError) existingError.remove();

        // Create and show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message-banner show';
        errorMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="color: #ef4444;">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m15 9-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="m9 9 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                    <strong>Submission Failed</strong><br>
                    ${message}
                </div>
            </div>
        `;
        
        form.insertBefore(errorMessage, form.firstChild);
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Auto-resize textareas
    const textareas = document.querySelectorAll('.textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Position dropdown enhancement
    const positionSelect = document.getElementById('position');
    const customRoleInput = document.createElement('input');
    customRoleInput.type = 'text';
    customRoleInput.className = 'input';
    customRoleInput.placeholder = 'Please specify the position';
    customRoleInput.style.display = 'none';
    positionSelect.parentNode.appendChild(customRoleInput);

    positionSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            customRoleInput.style.display = 'block';
            customRoleInput.required = true;
            customRoleInput.name = 'customPosition';
        } else {
            customRoleInput.style.display = 'none';
            customRoleInput.required = false;
            customRoleInput.name = '';
        }
    });

    // Enhanced form interactions
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
});

// Featured Roles functionality
function selectRole(roleValue) {
    const positionSelect = document.getElementById('position');
    const form = document.getElementById('applicationForm');
    
    // Set the position in the form
    positionSelect.value = roleValue;
    
    // Smooth scroll to the form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add visual feedback
    positionSelect.style.borderColor = '#00ffff';
    positionSelect.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.2)';
    
    // Reset styling after 3 seconds
    setTimeout(() => {
        positionSelect.style.borderColor = '';
        positionSelect.style.boxShadow = '';
    }, 3000);
    
    // Focus on first empty required field
    setTimeout(() => {
        const firstNameInput = document.getElementById('firstName');
        if (!firstNameInput.value) {
            firstNameInput.focus();
        }
    }, 500);
}