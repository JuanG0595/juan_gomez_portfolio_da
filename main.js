document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Basic Contact Form Submission (Frontend only)
    // For a real-world scenario, you'd need a backend to process emails.
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Here you would typically send the form data to a backend server
            // using fetch() or XMLHttpRequest.
            // For this example, we'll just simulate a success/error message.

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // Simulate success
                formMessages.innerHTML = '<p class="success-message">¡Mensaje enviado con éxito! Te contactaré pronto.</p>';
                contactForm.reset(); // Clear the form
            } else {
                // Simulate error
                formMessages.innerHTML = '<p class="error-message">Por favor, rellena todos los campos.</p>';
            }

            // Clear messages after a few seconds
            setTimeout(() => {
                formMessages.innerHTML = '';
            }, 5000);
        });
    }
});