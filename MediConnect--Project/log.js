document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle (remains the same)
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
            document.body.classList.toggle('no-scroll');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // 2. Smooth Scrolling for Navigation Links with Header Offset (remains the same for index.html)
    // IMPORTANT: For links pointing to auth.html, we handle them separately below.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply this smooth scroll to links that are staying on the same page
            if (this.getAttribute('href').length > 1 && !this.classList.contains('switch-to-login') && !this.classList.contains('switch-to-signup')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // 3. Dynamic Animate-on-Scroll with Intersection Observer (remains the same)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const animateInViewElements = document.querySelectorAll('.animate-in-view');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('is-visible');
                    const childrenToAnimate = entry.target.querySelectorAll('.animate-in-view');
                    childrenToAnimate.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.classList.add('is-visible');
                    });
                } else if (entry.target.classList.contains('animate-in-view')) {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        intersectionObserver.observe(element);
    });

    // Special handling for auth-card if it's the only animate-in-view on the page
    const authCard = document.querySelector('.auth-card');
    if (authCard && !authCard.closest('.animate-on-scroll')) {
        intersectionObserver.observe(authCard);
    }


    // 4. Hero Content Animation (remains the same for index.html)
    const heroTagline = document.querySelector('.hero-tagline');
    const heroTitle = document.querySelector('.hero-content h2');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTagline) heroTagline.style.animationDelay = '0.3s';
    if (heroTitle) heroTitle.style.animationDelay = '0.6s';
    if (heroDescription) heroDescription.style.animationDelay = '0.9s';
    if (heroButtons) heroButtons.style.animationDelay = '1.2s';


    // 5. Modal Functionality for "List an Item" (remains the same)
    const listItemBtn = document.getElementById('list-item-btn');
    const listItemModal = document.getElementById('listItemModal');
    const closeModalButton = document.querySelector('#listItemModal .close-button');
    const itemListingForm = document.getElementById('itemListingForm');

    if (listItemBtn && listItemModal && closeModalButton && itemListingForm) {
        listItemBtn.addEventListener('click', (e) => {
            e.preventDefault();
            listItemModal.style.display = 'flex';
            document.body.classList.add('no-scroll');
        });

        closeModalButton.addEventListener('click', () => {
            listItemModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });

        listItemModal.addEventListener('click', (e) => {
            if (e.target === listItemModal) {
                listItemModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });

        itemListingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Item submitted successfully! (This is a demo, no actual data sent)');
            itemListingForm.reset();
            listItemModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    }

    // --- Start of NEW additions for Combined Auth Page ---

    // Helper function to show/hide error messages (re-used)
    function displayError(elementId, message) {
        const errorDiv = document.getElementById(elementId);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = message ? 'block' : 'none';
        }
    }

    // Function to clear all error messages on a given form
    function clearFormErrors(formElement) {
        formElement.querySelectorAll('.error-message').forEach(errorDiv => {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        });
    }

    // 6. Auth Page Tab Switching Logic
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginFormSection = document.getElementById('login-form-section');
    const signupFormSection = document.getElementById('signup-form-section');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Get the navigation links that trigger tab changes
    const showLoginNavBtn = document.getElementById('show-login-nav');
    const showSignupNavBtn = document.getElementById('show-signup-nav');

    // Get footer links that trigger tab changes
    const switchLinksLogin = document.querySelectorAll('.switch-to-login'); // All links with this class
    const switchLinksSignup = document.querySelectorAll('.switch-to-signup'); // All links with this class


    function showForm(formType) {
        if (!loginFormSection || !signupFormSection || !loginTab || !signupTab) return; // Exit if elements not found

        // Clear all errors and reset forms when switching
        clearFormErrors(loginForm);
        clearFormErrors(signupForm);
        loginForm.reset();
        signupForm.reset();


        if (formType === 'login') {
            loginFormSection.classList.add('active');
            loginFormSection.classList.remove('hidden');
            signupFormSection.classList.add('hidden');
            signupFormSection.classList.remove('active');

            loginTab.classList.add('active');
            signupTab.classList.remove('active');

            // Set URL hash to #login
            if (window.location.hash !== '#login') {
                history.pushState(null, '', 'auth.html#login');
            }

        } else if (formType === 'signup') {
            signupFormSection.classList.add('active');
            signupFormSection.classList.remove('hidden');
            loginFormSection.classList.add('hidden');
            loginFormSection.classList.remove('active');

            signupTab.classList.add('active');
            loginTab.classList.remove('active');

            // Set URL hash to #signup
            if (window.location.hash !== '#signup') {
                history.pushState(null, '', 'auth.html#signup');
            }
        }
    }

    // Event listeners for tab buttons
    if (loginTab) {
        loginTab.addEventListener('click', () => showForm('login'));
    }
    if (signupTab) {
        signupTab.addEventListener('click', () => showForm('signup'));
    }

    // Event listeners for navigation bar buttons (if present)
    if (showLoginNavBtn) {
        showLoginNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('login');
            // Close mobile nav if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    if (showSignupNavBtn) {
        showSignupNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('signup');
            // Close mobile nav if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Event listeners for footer/inner links to switch forms
    switchLinksLogin.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('login');
        });
    });
    switchLinksSignup.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('signup');
        });
    });

    // Initial form display based on URL hash or default to login
    if (window.location.pathname.includes('auth.html')) {
        const hash = window.location.hash;
        if (hash === '#signup') {
            showForm('signup');
        } else {
            showForm('login');
        }
    }


    // 7. Login Form Validation & Submission (Logic remains same, just moved into combined file)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFormErrors(loginForm); // Clear errors at start of submission

            const email = loginForm.elements['login-email'].value.trim();
            const password = loginForm.elements['login-password'].value.trim();
            let isValid = true;

            if (!email) {
                displayError('login-email-error', 'Email is required.');
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                displayError('login-email-error', 'Please enter a valid email address.');
                isValid = false;
            }

            if (!password) {
                displayError('login-password-error', 'Password is required.');
                isValid = false;
            } else if (password.length < 6) {
                displayError('login-password-error', 'Password must be at least 6 characters long.');
                isValid = false;
            }

            if (isValid) {
                console.log('Login attempt:', { email, password });
                alert('Attempting to log in... (Check console for data. No actual backend yet)');
                // Simulate success and redirect
                // window.location.href = 'index.html';
            }
        });
    }

    // 8. Signup Form Validation & Submission (Logic remains same, just moved into combined file)
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFormErrors(signupForm); // Clear errors at start of submission

            const username = signupForm.elements['signup-username'].value.trim();
            const email = signupForm.elements['signup-email'].value.trim();
            const password = signupForm.elements['signup-password'].value.trim();
            const confirmPassword = signupForm.elements['signup-confirm-password'].value.trim();
            const termsAgreed = signupForm.elements['terms-agree'].checked;

            let isValid = true;

            if (!username) {
                displayError('signup-username-error', 'Username is required.');
                isValid = false;
            } else if (username.length < 3) {
                displayError('signup-username-error', 'Username must be at least 3 characters.');
                isValid = false;
            }

            if (!email) {
                displayError('signup-email-error', 'Email is required.');
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                displayError('signup-email-error', 'Please enter a valid email address.');
                isValid = false;
            }

            if (!password) {
                displayError('signup-password-error', 'Password is required.');
                isValid = false;
            } else if (password.length < 8) {
                displayError('signup-password-error', 'Password must be at least 8 characters long.');
                isValid = false;
            } else if (!/[A-Z]/.test(password)) {
                displayError('signup-password-error', 'Password needs at least one uppercase letter.');
                isValid = false;
            } else if (!/[a-z]/.test(password)) {
                displayError('signup-password-error', 'Password needs at least one lowercase letter.');
                isValid = false;
            } else if (!/[0-9]/.test(password)) {
                displayError('signup-password-error', 'Password needs at least one number.');
                isValid = false;
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                displayError('signup-password-error', 'Password needs at least one special character.');
                isValid = false;
            }


            if (!confirmPassword) {
                displayError('signup-confirm-password-error', 'Please confirm your password.');
                isValid = false;
            } else if (password !== confirmPassword) {
                displayError('signup-confirm-password-error', 'Passwords do not match.');
                isValid = false;
            }

            if (!termsAgreed) {
                displayError('terms-error', 'You must agree to the Terms and Privacy Policy.');
                isValid = false;
            }

            if (isValid) {
                console.log('Signup attempt:', { username, email, password });
                alert('Attempting to sign up... (Check console for data. No actual backend yet)');
                // Simulate success and redirect to login
                // showForm('login');
            }
        });
    }
    // --- End of NEW additions for Combined Auth Page ---

}); // End of DOMContentLoaded