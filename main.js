document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            // Scroll to the section corresponding to the href attribute
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Smooth scroll effect
            });
        });
    });

    // --- Logic for project filtering ---
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const filterGroup = this.closest('.filter-group');
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');

            // Get current active filters from both groups
            // Assuming there are two filter groups: one for difficulty and one for tools
            const activeDifficulty = document.querySelector('.filter-group:nth-child(1) .filter-btn.active').dataset.filter;
            const activeTool = document.querySelector('.filter-group:nth-child(2) .filter-btn.active').dataset.filter;

            projectCards.forEach(card => {
                const cardDifficulty = card.dataset.difficulty;
                // Split tools string into an array to handle multiple tools per project
                const cardTools = card.dataset.tools.split(','); 

                // Check if card matches both active filters
                const matchesDifficulty = (activeDifficulty === 'all' || cardDifficulty === activeDifficulty);
                // Check if the card's tools array includes the active tool filter
                const matchesTool = (activeTool === 'all' || cardTools.includes(activeTool));

                if (matchesDifficulty && matchesTool) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });

    // --- Update current year in footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Basic Contact Form Submission (Frontend only) ---
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

            // Simple client-side validation
            if (name && email && message) {
                // Simulate success message (translated to English)
                formMessages.innerHTML = '<p class="success-message">Message sent successfully! I will contact you soon.</p>';
                formMessages.style.color = "green"; // Assuming you have CSS for success messages
                contactForm.reset(); // Clear the form fields
            } else {
                // Simulate error message (translated to English)
                formMessages.innerHTML = '<p class="error-message">Please fill in all fields.</p>';
                formMessages.style.color = "red"; // Assuming you have CSS for error messages
            }

            // Clear messages after a few seconds
            setTimeout(() => {
                formMessages.innerHTML = '';
            }, 5000); // Messages disappear after 5 seconds
        });
    }
});