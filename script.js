// script.js

// A simple script to handle navigation highlighting, mobile menu, and simple interactions
// Written in a clean, human-like way, perfect for a first-year student.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // 2. Dynamic Active Class on Navigation Links
    // This highlights the current page in the navigation bar
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Simple Filtering Logic (For places.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.filter-item');

    if (filterButtons.length > 0 && cards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Get the category to filter
                const filterValue = button.getAttribute('data-filter');

                // Loop through all cards and show/hide based on category
                cards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // 4. Simple Form Validation (For about.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name.trim() === '' || email.trim() === '') {
                alert('Please fill in all required fields!');
            } else {
                alert(`Thank you, ${name}! Your message has been sent. We'll reply soon.`);
                contactForm.reset();
            }
        });
    }

    // 5. Greeting based on time of day (just a fun little extra!)
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'WELCOME';

        if (hour < 12) {
            greeting = 'GOOD MORNING';
        } else if (hour < 18) {
            greeting = 'GOOD AFTERNOON';
        } else {
            greeting = 'GOOD EVENING';
        }

        greetingElement.innerText = `${greeting} EXPLORER!`;
    }
});
