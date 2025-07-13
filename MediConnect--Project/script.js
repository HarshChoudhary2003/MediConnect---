
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
            document.body.classList.toggle('no-scroll'); // Prevents scrolling when mobile nav is open
        });

        // Close mobile nav when a link is clicked
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

    // 2. Smooth Scrolling for Navigation Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply this smooth scroll to links that are staying on the same page
            if (this.getAttribute('href').length > 1 && !this.classList.contains('no-smooth-scroll')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // -20 for extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // 3. Dynamic Animate-on-Scroll with Intersection Observer
    // Select elements that should animate when visible
    const animateElements = document.querySelectorAll('.animate-in-view');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.15 // element is 15% visible
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        intersectionObserver.observe(element);
    });

    // 4. Modal Popups (Generic)
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Use flex to center content
            setTimeout(() => { // Trigger transition after display is set
                modal.classList.add('show');
                document.body.classList.add('no-scroll');
            }, 10); // Small delay to allow display to register
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
            setTimeout(() => { // Hide after transition
                modal.style.display = 'none';
            }, 300); // Match CSS transition duration
        }
    };

    // Attach close functionality to all close buttons
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                window.closeModal(modal.id);
            }
        });
    });

    // Close modal if clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeModal(modal.id);
            }
        });
    });

    // Helper function to show/hide error messages for forms
    window.displayError = (elementId, message) => {
        const errorDiv = document.getElementById(elementId);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = message ? 'block' : 'none';
        }
    };

    // Helper function to clear all error messages on a given form
    window.clearFormErrors = (formElement) => {
        formElement.querySelectorAll('.error-message').forEach(errorDiv => {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        });
    };

});

// --- New additions for Home Page (FAQ Accordion) ---

// 5. FAQ Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');

            // Toggle active class on header and content
            header.classList.toggle('active');
            accordionContent.classList.toggle('active');

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.closest('.accordion-item').querySelector('.accordion-content').classList.remove('active');
                }
            });
        });
    });
}

// --- End of new additions for Home Page ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
            document.body.classList.toggle('no-scroll'); // Prevents scrolling when mobile nav is open
        });

        // Close mobile nav when a link is clicked
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

    // 2. Smooth Scrolling for Navigation Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply this smooth scroll to links that are staying on the same page
            if (this.getAttribute('href').length > 1 && !this.classList.contains('no-smooth-scroll')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // -20 for extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // 3. Dynamic Animate-on-Scroll with Intersection Observer
    // Select elements that should animate when visible
    const animateElements = document.querySelectorAll('.animate-in-view');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.15 // element is 15% visible
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        intersectionObserver.observe(element);
    });

    // 4. Modal Popups (Generic)
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Use flex to center content
            setTimeout(() => { // Trigger transition after display is set
                modal.classList.add('show');
                document.body.classList.add('no-scroll');
            }, 10); // Small delay to allow display to register
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
            setTimeout(() => { // Hide after transition
                modal.style.display = 'none';
            }, 300); // Match CSS transition duration
        }
    };

    // Attach close functionality to all close buttons
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                window.closeModal(modal.id);
            }
        });
    });

    // Close modal if clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeModal(modal.id);
            }
        });
    });

    // Helper function to show/hide error messages for forms
    window.displayError = (elementId, message) => {
        const errorDiv = document.getElementById(elementId);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = message ? 'block' : 'none';
        }
    };

    // Helper function to clear all error messages on a given form
    window.clearFormErrors = (formElement) => {
        formElement.querySelectorAll('.error-message').forEach(errorDiv => {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        });
    };

    // 5. FAQ Accordion Functionality (from index.html)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.closest('.accordion-item');
                const accordionContent = accordionItem.querySelector('.accordion-content');

                // Toggle active class on header and content
                header.classList.toggle('active');
                accordionContent.classList.toggle('active');

                // Close other open accordions
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherHeader.closest('.accordion-item').querySelector('.accordion-content').classList.remove('active');
                    }
                });
            });
        });
    }

    // --- NEW LOGIC FOR OTHER PAGES ---

    // 6. Donate Medicine Form Validation and Submission (donate.html)
    const donateForm = document.getElementById('donate-form');
    const medicineImageInput = document.getElementById('medicine-image');
    const imagePreview = document.getElementById('medicine-image-preview');
    const imagePreviewImg = imagePreview ? imagePreview.querySelector('img') : null;
    const imagePreviewText = imagePreview ? imagePreview.querySelector('.preview-text') : null;

    if (medicineImageInput && imagePreviewImg && imagePreviewText) {
        medicineImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreviewImg.src = e.target.result;
                    imagePreviewImg.style.display = 'block';
                    imagePreviewText.style.display = 'none';
                };
                reader.readAsDataURL(this.files[0]);
            } else {
                imagePreviewImg.src = '#';
                imagePreviewImg.style.display = 'none';
                imagePreviewText.style.display = 'block';
            }
        });
    }

    if (donateForm) {
        donateForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            clearFormErrors(this); // Clear previous errors

            let isValid = true;

            // Donor Name validation
            const donorName = document.getElementById('donor-name').value.trim();
            if (donorName.length < 2) {
                displayError('donor-name-error', 'Donor Name is required and must be at least 2 characters.');
                isValid = false;
            }

            // Contact Number validation (simple regex for digits and optional +)
            const contactNumber = document.getElementById('contact-number').value.trim();
            const phoneRegex = /^\+?[0-9\s-()]{7,20}$/; // Allows +, digits, spaces, hyphens, parentheses
            if (!phoneRegex.test(contactNumber)) {
                displayError('contact-number-error', 'Please enter a valid contact number.');
                isValid = false;
            }

            // Medicine Name validation
            const medicineName = document.getElementById('medicine-name').value.trim();
            if (medicineName.length < 2) {
                displayError('medicine-name-error', 'Medicine Name is required and must be at least 2 characters.');
                isValid = false;
            }

            // Expiry Date validation
            const expiryDateInput = document.getElementById('expiry-date');
            const expiryDate = new Date(expiryDateInput.value);
            const today = new Date();
            today.setHours(0,0,0,0); // Reset time for comparison

            if (!expiryDateInput.value || isNaN(expiryDate.getTime()) || expiryDate < today) {
                displayError('expiry-date-error', 'Expiry Date is required and must be in the future.');
                isValid = false;
            }

            // Quantity validation
            const quantity = parseInt(document.getElementById('quantity').value);
            if (isNaN(quantity) || quantity <= 0) {
                displayError('quantity-error', 'Quantity is required and must be a positive number.');
                isValid = false;
            }

            // Location validation
            const location = document.getElementById('location').value;
            if (location === '') {
                displayError('location-error', 'Please select a location.');
                isValid = false;
            }

            if (isValid) {
                // For a front-end prototype, we'll store this in localStorage
                const newMedicine = {
                    id: Date.now(), // Unique ID
                    donorName: donorName,
                    contactNumber: contactNumber,
                    medicineName: medicineName,
                    expiryDate: expiryDateInput.value, // Keep as YYYY-MM-DD string
                    quantity: quantity,
                    location: location,
                    imageUrl: imagePreviewImg && imagePreviewImg.style.display === 'block' ? imagePreviewImg.src : 'images/default-medicine.svg' // Placeholder image if no upload
                };

                let medicines = JSON.parse(localStorage.getItem('donatedMedicines')) || [];
                medicines.push(newMedicine);
                localStorage.setItem('donatedMedicines', JSON.stringify(medicines));

                openModal('successModal');
                this.reset(); // Clear form fields
                if (imagePreviewImg) { // Reset image preview
                    imagePreviewImg.src = '#';
                    imagePreviewImg.style.display = 'none';
                    imagePreviewText.style.display = 'block';
                }
            } else {
                openModal('errorModal');
            }
        });
    }

    // 7. Available Medicines Listing & Filtering (available-medicines.html)
    const medicinesGrid = document.getElementById('medicines-grid');
    const locationFilter = document.getElementById('location-filter');
    const expiryFilter = document.getElementById('expiry-filter');
    const noMedicinesMessage = medicinesGrid ? medicinesGrid.querySelector('.no-medicines-message') : null;

    if (medicinesGrid && locationFilter && expiryFilter) {
        // Dummy data for medicines if localStorage is empty or for initial load
        let donatedMedicines = JSON.parse(localStorage.getItem('donatedMedicines')) || [
            { id: 1, medicineName: 'Paracetamol 500mg', expiryDate: '2026-06-30', quantity: 5, location: 'Delhi', imageUrl: '.images/para.webp' },
            { id: 2, medicineName: 'Amoxicillin 250mg', expiryDate: '2025-08-15', quantity: 3, location: 'Mumbai', imageUrl: 'images/sample-medicine2.svg' },
            { id: 3, medicineName: 'Cetirizine 10mg', expiryDate: '2025-05-20', quantity: 10, location: 'Bangalore', imageUrl: 'images/sample-medicine3.svg' },
            { id: 4, medicineName: 'Cough Syrup (Sugar-Free)', expiryDate: '2026-01-01', quantity: 2, location: 'Chennai', imageUrl: 'images/sample-medicine4.svg' },
            { id: 5, medicineName: 'Multivitamin Tablets', expiryDate: '2025-07-10', quantity: 7, location: 'Kolkata', imageUrl: 'images/sample-medicine1.svg' },
            { id: 6, medicineName: 'Pain Relief Spray', expiryDate: '2025-04-25', quantity: 1, location: 'Hyderabad', imageUrl: 'images/sample-medicine2.svg' },
            { id: 7, medicineName: 'Antacid Tablets', expiryDate: '2025-09-30', quantity: 8, location: 'Delhi', imageUrl: 'images/sample-medicine3.svg' },
            { id: 8, medicineName: 'ORS Sachets', expiryDate: '2026-03-15', quantity: 12, location: 'Pune', imageUrl: 'images/sample-medicine4.svg' },
            { id: 9, medicineName: 'Fever Reducer (Pediatric)', expiryDate: '2025-06-05', quantity: 4, location: 'Mumbai', imageUrl: 'images/sample-medicine1.svg' }
        ];

        // Store dummy data if localStorage is empty
        if (!localStorage.getItem('donatedMedicines')) {
            localStorage.setItem('donatedMedicines', JSON.stringify(donatedMedicines));
        }

        // Function to determine expiry status
        const getExpiryStatus = (expiryDateStr) => {
            const expiry = new Date(expiryDateStr);
            const today = new Date();
            const threeMonths = new Date();
            threeMonths.setMonth(today.getMonth() + 3);
            const sixMonths = new Date();
            sixMonths.setMonth(today.getMonth() + 6);

            if (expiry < today) {
                return 'Expired'; // Should ideally not be listed
            } else if (expiry < threeMonths) {
                return 'Expiring Soon';
            } else if (expiry < sixMonths) {
                return 'Next 6 Months';
            } else {
                return 'Beyond 6 Months';
            }
        };

        // Function to render medicine cards
        const renderMedicineCards = (medicinesToDisplay) => {
            medicinesGrid.innerHTML = ''; // Clear previous cards
            if (medicinesToDisplay.length === 0) {
                if (noMedicinesMessage) noMedicinesMessage.style.display = 'block';
                return;
            } else {
                if (noMedicinesMessage) noMedicinesMessage.style.display = 'none';
            }

            medicinesToDisplay.forEach((medicine, index) => {
                const expiryStatus = getExpiryStatus(medicine.expiryDate);
                let statusClass = '';
                if (expiryStatus === 'Expiring Soon') statusClass = 'expiring-soon';
                else if (expiryStatus === 'Next 6 Months' || expiryStatus === 'Beyond 6 Months') statusClass = 'safe';
                else if (expiryStatus === 'Expired') statusClass = 'critical'; // Just in case expired ones sneak in

                const card = document.createElement('div');
                card.classList.add('medicine-card', 'animate-in-view');
                card.style.transitionDelay = `${index * 0.05}s`; // Staggered animation

                card.innerHTML = `
                    <div class="medicine-card-image">
                        ${medicine.imageUrl && medicine.imageUrl !== 'images/default-medicine.svg' ?
                            `<img src="${medicine.imageUrl}" alt="${medicine.medicineName}">` :
                            `<i class="fas fa-pills placeholder-icon"></i>`
                        }
                    </div>
                    <div class="medicine-card-content">
                        <h3>${medicine.medicineName}</h3>
                        <p><strong>Quantity:</strong> ${medicine.quantity}</p>
                        <p><strong>Location:</strong> ${medicine.location}</p>
                        <p><strong>Expiry Date:</strong> ${medicine.expiryDate}</p>
                        <span class="expiry-status ${statusClass}">${expiryStatus}</span>
                        <a href="#" class="btn btn-primary btn-request animate-btn">Request Medicine <i class="fas fa-paper-plane"></i></a>
                    </div>
                `;
                medicinesGrid.appendChild(card);

                // Re-observe newly added animate-in-view elements
                intersectionObserver.observe(card);
            });
        };

        // Function to filter medicines
        const filterMedicines = () => {
            const selectedLocation = locationFilter.value;
            const selectedExpiry = expiryFilter.value;

            let filteredMedicines = JSON.parse(localStorage.getItem('donatedMedicines')) || [];

            // Filter by location
            if (selectedLocation !== 'all') {
                filteredMedicines = filteredMedicines.filter(med => med.location === selectedLocation);
            }

            // Filter by expiry
            if (selectedExpiry !== 'all') {
                const today = new Date();
                today.setHours(0,0,0,0);

                filteredMedicines = filteredMedicines.filter(med => {
                    const expiry = new Date(med.expiryDate);
                    expiry.setHours(0,0,0,0); // Ensure comparison is date-only

                    if (expiry < today) return false; // Always exclude expired

                    if (selectedExpiry === 'next3months') {
                        const threeMonthsFromNow = new Date();
                        threeMonthsFromNow.setMonth(today.getMonth() + 3);
                        threeMonthsFromNow.setHours(0,0,0,0);
                        return expiry <= threeMonthsFromNow;
                    } else if (selectedExpiry === 'next6months') {
                        const sixMonthsFromNow = new Date();
                        sixMonthsFromNow.setMonth(today.getMonth() + 6);
                        sixMonthsFromNow.setHours(0,0,0,0);
                        return expiry <= sixMonthsFromNow;
                    } else if (selectedExpiry === 'beyond6months') {
                        const sixMonthsFromNow = new Date();
                        sixMonthsFromNow.setMonth(today.getMonth() + 6);
                        sixMonthsFromNow.setHours(0,0,0,0);
                        return expiry > sixMonthsFromNow;
                    }
                    return true; // Should not happen with current options
                });
            }

            renderMedicineCards(filteredMedicines);
        };

        // Event listeners for filters
        locationFilter.addEventListener('change', filterMedicines);
        expiryFilter.addEventListener('change', filterMedicines);

        // Initial render on page load
        filterMedicines(); // Call filterMedicines instead of render directly to apply initial filters if any
    }

    // 8. NGO Partners Listing (ngos.html)
    const ngosGrid = document.getElementById('ngos-grid');

    if (ngosGrid) {
        const ngoData = [
            { name: 'Health & Hope Foundation', contact: '98765-11111', email: 'contact@healthhope.org', areas: 'Delhi, Haryana, UP', icon: 'fas fa-hand-holding-medical' },
            { name: 'Care Connect India', contact: '98765-22222', email: 'info@careconnect.in', areas: 'Mumbai, Pune, Nashik', icon: 'fas fa-hospital' },
            { name: 'जीवनधारा (Jeevan Dhara)', contact: '98765-33333', email: 'jeevandhara@ngo.in', areas: 'Bangalore, Chennai', icon: 'fas fa-heartbeat' },
            { name: 'Rural Aid Trust', contact: '98765-44444', email: 'ruralaid@trust.org', areas: 'Remote Villages (All India)', icon: 'fas fa-seedling' },
            { name: 'City Relief Network', contact: '98765-55555', email: 'help@cityrelief.org', areas: 'Kolkata, Hyderabad', icon: 'fas fa-city' }
        ];

        ngoData.forEach((ngo, index) => {
            const card = document.createElement('div');
            card.classList.add('ngo-card', 'animate-in-view');
            card.style.transitionDelay = `${index * 0.08}s`; // Staggered animation

            card.innerHTML = `
                <div class="ngo-icon"><i class="${ngo.icon}"></i></div>
                <h3>${ngo.name}</h3>
                <p><strong>Contact:</strong> <span class="contact-info">
                    <a href="tel:${ngo.contact}">${ngo.contact}</a> |
                    <a href="mailto:${ngo.email}">${ngo.email}</a>
                </span></p>
                <p class="areas-served">Serving Areas: ${ngo.areas}</p>
                <a href="#" class="btn btn-secondary animate-btn" style="margin-top: 15px;">Learn More <i class="fas fa-arrow-right"></i></a>
            `;
            ngosGrid.appendChild(card);
            // Re-observe newly added animate-in-view elements
            intersectionObserver.observe(card);
        });
    }

    // 9. Contact Us Form Validation and Submission (contact.html)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearFormErrors(this);

            let isValid = true;

            // Name validation
            const contactName = document.getElementById('contact-name').value.trim();
            if (contactName.length < 2) {
                displayError('contact-name-error', 'Your Name is required and must be at least 2 characters.');
                isValid = false;
            }

            // Email validation
            const contactEmail = document.getElementById('contact-email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactEmail)) {
                displayError('contact-email-error', 'Please enter a valid email address.');
                isValid = false;
            }

            // Message validation
            const contactMessage = document.getElementById('contact-message').value.trim();
            if (contactMessage.length < 10) {
                displayError('contact-message-error', 'Message is required and must be at least 10 characters.');
                isValid = false;
            }

            if (isValid) {
                // In a real application, you'd send this data to a server
                console.log('Contact form submitted:', {
                    name: contactName,
                    email: contactEmail,
                    subject: document.getElementById('contact-subject').value.trim(),
                    message: contactMessage
                });
                openModal('contactSuccessModal');
                this.reset(); // Clear form fields
            } else {
                openModal('contactErrorModal');
            }
        });
    }

}); // End of DOMContentLoaded