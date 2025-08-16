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

// Theme detection and application
function detectAndApplyTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const style = urlParams.get('style');
    
    if (style === 'academic') {
        document.body.classList.add('academic-theme');
        // Update content for academic audience
        updateContentForAcademic();
    }
}

function updateContentForAcademic() {
    console.log('Updating content for academic theme'); // Debug log
    
    // Add academic header graphic
    const header = document.querySelector('.header');
    if (header && !header.querySelector('.academic-graphic')) {
        const academicGraphic = document.createElement('div');
        academicGraphic.className = 'academic-graphic';
        academicGraphic.innerHTML = `
            <div class="academic-symbols">
                <span class="symbol">Ψ</span>
                <span class="symbol">∞</span>
                <span class="symbol">∆</span>
            </div>
            <div class="academic-circuit">
                <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <path d="M10 20 L30 20 L35 15 L40 25 L45 15 L50 25 L55 20 L110 20" stroke="#34495e" stroke-width="2" fill="none"/>
                    <circle cx="20" cy="20" r="3" fill="#34495e"/>
                    <circle cx="70" cy="20" r="3" fill="#34495e"/>
                    <circle cx="100" cy="20" r="3" fill="#34495e"/>
                </svg>
            </div>
        `;
        header.insertBefore(academicGraphic, header.firstChild);
    }
    
    // Create psychology floating symbols
    createPsychologyFloatingSymbols();
    
    // Update main title and subtitle
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const description = document.querySelector('.description');
    
    if (title) title.textContent = 'JOIN THE AI FRONTIER';
    if (subtitle) subtitle.textContent = 'Build the Future, Improve the World';
    if (description) description.textContent = 'We\'re looking for experts in psychology, UX design, and AI to help shape the future of human-computer interaction.';
    
    // Update roles preview for academic theme
    const previewRoles = document.querySelectorAll('.preview-role');
    if (previewRoles.length >= 3) {
        previewRoles[0].innerHTML = '🎨 UX Design';
        previewRoles[1].innerHTML = '🧮 AI Research';
        previewRoles[2].innerHTML = 'Ψ Psychology';
    }
    
    // Update role descriptions for academic audience
    const roleCards = document.querySelectorAll('.role-card');
    if (roleCards.length >= 3) {
        // UX Designer
        const uxDesc = roleCards[0].querySelector('.role-description');
        if (uxDesc) uxDesc.textContent = 'Design user-centered experiences that make complex psychological data accessible and meaningful';
        
        // AI Engineer
        const aiDesc = roleCards[1].querySelector('.role-description');
        if (aiDesc) aiDesc.textContent = 'Research and develop algorithms that understand human behavior and personality patterns';
        
        // Psychology
        const psychDesc = roleCards[2].querySelector('.role-description');
        if (psychDesc) psychDesc.textContent = 'Apply psychological research to create engaging and scientifically-grounded user experiences';
    }
}

// Create cognitive psychology map animation for academic theme
function createPsychologyFloatingSymbols() {
    // Only create if network doesn't already exist
    if (document.querySelector('.neural-network')) {
        return;
    }
    
    console.log('Creating cognitive psychology map');
    
    const networkContainer = document.createElement('div');
    networkContainer.className = 'neural-network';
    document.body.appendChild(networkContainer);
    
    // Cognitive psychology domains and their insights
    const cognitiveRegions = [
        { name: 'Working Memory', insights: ['Information processing', 'Cognitive load', 'Attention span'], x: 0.2, y: 0.25 },
        { name: 'Long-term Memory', insights: ['Memory consolidation', 'Retrieval processes', 'Schema formation'], x: 0.8, y: 0.3 },
        { name: 'Attention', insights: ['Selective attention', 'Focus mechanisms', 'Cognitive control'], x: 0.15, y: 0.7 },
        { name: 'Decision Making', insights: ['Heuristics & biases', 'Risk assessment', 'Choice architecture'], x: 0.85, y: 0.65 },
        { name: 'Social Cognition', insights: ['Theory of mind', 'Social perception', 'Empathy processes'], x: 0.5, y: 0.15 },
        { name: 'Emotion Regulation', insights: ['Emotional intelligence', 'Coping strategies', 'Mood patterns'], x: 0.3, y: 0.8 },
        { name: 'Language Processing', insights: ['Semantic networks', 'Syntax processing', 'Comprehension'], x: 0.7, y: 0.8 },
        { name: 'Executive Function', insights: ['Cognitive flexibility', 'Inhibitory control', 'Planning abilities'], x: 0.5, y: 0.5 }
    ];
    
    // Create cognitive region nodes with even distribution
    const nodes = [];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    cognitiveRegions.forEach((region, index) => {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.setAttribute('data-region', region.name);
        
        // Calculate position based on viewport percentage
        const x = Math.max(80, Math.min(viewportWidth - 80, region.x * viewportWidth));
        const y = Math.max(100, Math.min(viewportHeight - 100, region.y * viewportHeight));
        
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        
        networkContainer.appendChild(node);
        nodes.push({
            element: node, 
            x: x, 
            y: y, 
            region: region.name,
            insights: region.insights
        });
    });
    
    // Create connections based on psychological relationships
    const psychologicalConnections = [
        [0, 1], // Working Memory ↔ Long-term Memory
        [0, 2], // Working Memory ↔ Attention
        [0, 7], // Working Memory ↔ Executive Function
        [1, 4], // Long-term Memory ↔ Social Cognition
        [1, 6], // Long-term Memory ↔ Language Processing
        [2, 7], // Attention ↔ Executive Function
        [3, 7], // Decision Making ↔ Executive Function
        [3, 5], // Decision Making ↔ Emotion Regulation
        [4, 5], // Social Cognition ↔ Emotion Regulation
        [4, 6], // Social Cognition ↔ Language Processing
        [5, 7], // Emotion Regulation ↔ Executive Function
        [6, 7]  // Language Processing ↔ Executive Function
    ];
    
    const connections = [];
    psychologicalConnections.forEach(([i, j]) => {
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        connection.style.left = nodes[i].x + 'px';
        connection.style.top = nodes[i].y + 'px';
        connection.style.width = distance + 'px';
        connection.style.transform = `rotate(${angle}rad)`;
        
        networkContainer.appendChild(connection);
        connections.push({ element: connection, fromNode: i, toNode: j });
    });
    
    console.log(`Created ${nodes.length} cognitive regions and ${connections.length} connections`);
    
    // Start cognitive activity simulation
    function triggerCognitiveActivity() {
        // Select a random cognitive region to activate
        const randomIndex = Math.floor(Math.random() * nodes.length);
        const activeNode = nodes[randomIndex];
        
        activeNode.element.classList.add('active');
        
        // Remove active class after animation
        setTimeout(() => {
            activeNode.element.classList.remove('active');
        }, 2500);
        
        // Activate related connections
        connections.forEach(conn => {
            if (conn.fromNode === randomIndex || conn.toNode === randomIndex) {
                if (Math.random() < 0.6) { // 60% chance for related connections
                    conn.element.classList.add('active');
                    setTimeout(() => {
                        conn.element.classList.remove('active');
                    }, 2000);
                }
            }
        });
        
        // Show domain-specific insight
        if (Math.random() < 0.7) { // 70% chance to show insight
            const insight = document.createElement('div');
            insight.className = 'psychology-insight';
            
            // Get random insight from the active region
            const randomInsight = activeNode.insights[Math.floor(Math.random() * activeNode.insights.length)];
            insight.textContent = randomInsight;
            
            // Position near the activated node with better spacing
            const offsetX = (Math.random() - 0.5) * 150;
            const offsetY = (Math.random() - 0.5) * 120;
            
            insight.style.left = Math.max(20, Math.min(viewportWidth - 200, activeNode.x + offsetX)) + 'px';
            insight.style.top = Math.max(20, Math.min(viewportHeight - 50, activeNode.y + offsetY)) + 'px';
            
            networkContainer.appendChild(insight);
            insight.classList.add('active');
            
            // Remove insight after animation
            setTimeout(() => {
                insight.remove();
            }, 4500);
        }
        
        // Schedule next cognitive process
        setTimeout(triggerCognitiveActivity, 3000 + Math.random() * 4000); // 3-7 seconds
    }
    
    // Start the cognitive simulation after a short delay
    setTimeout(triggerCognitiveActivity, 1500);
}

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    detectAndApplyTheme();
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
        console.log('Form submission started');
        console.log('Academic theme active:', document.body.classList.contains('academic-theme'));
        
        if (!validateForm()) {
            console.log('Form validation failed');
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        console.log('Form validation passed');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';

        // For FormSubmit to work properly, we need to allow the natural form submission
        // Add theme parameter as hidden input before submission
        const isAcademic = document.body.classList.contains('academic-theme');
        console.log('Is academic theme:', isAcademic);
        
        if (isAcademic) {
            // Add theme information to form data
            let themeInput = form.querySelector('input[name="_theme"]');
            if (!themeInput) {
                themeInput = document.createElement('input');
                themeInput.type = 'hidden';
                themeInput.name = '_theme';
                themeInput.value = 'academic';
                form.appendChild(themeInput);
            }
        }

        // Set the redirect URL based on theme
        let redirectInput = form.querySelector('input[name="_next"]');
        if (!redirectInput) {
            redirectInput = document.createElement('input');
            redirectInput.type = 'hidden';
            redirectInput.name = '_next';
            form.appendChild(redirectInput);
        }
        
        const successUrl = isAcademic 
            ? window.location.origin + window.location.pathname.replace('index.html', '') + 'success.html?style=academic'
            : window.location.origin + window.location.pathname.replace('index.html', '') + 'success.html';
        
        redirectInput.value = successUrl;
        
        console.log('Redirect URL set to:', successUrl);
        console.log('Form action:', form.action);
        
        // Allow the form to submit naturally to FormSubmit
        // Don't preventDefault - let it submit normally
        console.log('Allowing natural form submission to FormSubmit');
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
function toggleRoles() {
    const toggle = document.querySelector('.roles-toggle');
    const expandable = document.getElementById('rolesExpandable');
    
    toggle.classList.toggle('expanded');
    expandable.classList.toggle('expanded');
}

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
    
    // Collapse the roles section after selection
    setTimeout(() => {
        const toggle = document.querySelector('.roles-toggle');
        const expandable = document.getElementById('rolesExpandable');
        toggle.classList.remove('expanded');
        expandable.classList.remove('expanded');
    }, 1000);
}