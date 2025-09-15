document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            // Scroll to the section corresponding to the href attribute
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
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
            const activeDifficultyBtn = document.querySelector('.filter-group:nth-child(1) .filter-btn.active');
            const activeToolBtn = document.querySelector('.filter-group:nth-child(2) .filter-btn.active');

            const activeDifficulty = activeDifficultyBtn ? activeDifficultyBtn.dataset.filter : 'all';
            const activeTool = activeToolBtn ? activeToolBtn.dataset.filter : 'all';

            projectCards.forEach(card => {
                const cardDifficulty = card.dataset.difficulty;
                // Split tools string into an array to handle multiple tools per project
                const cardTools = card.dataset.tools.split(',').map(tool => tool.trim().toLowerCase());

                // Check if card matches both active filters
                const matchesDifficulty = (activeDifficulty === 'all' || cardDifficulty === activeDifficulty);
                // Check if the card's tools array includes the active tool filter
                const matchesTool = (activeTool === 'all' || cardTools.includes(activeTool.toLowerCase()));

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

    // // --- Basic Contact Form Submission (Frontend only) ---
    // // For a real-world scenario, you'd need a backend to process emails.
    // const contactForm = document.getElementById('contact-form');
    // const formMessages = document.getElementById('form-messages');

    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault(); // Prevent default form submission

    //         const name = document.getElementById('name').value.trim();
    //         const email = document.getElementById('email').value.trim();
    //         const message = document.getElementById('message').value.trim();

    //         // Simple client-side validation
    //         if (name && email && message) {
    //             // Simulate success message
    //             formMessages.innerHTML = '<p class="success-message">Message sent successfully! I will contact you soon.</p>';
    //             formMessages.style.color = "green"; // Matches CSS success message style
    //             contactForm.reset(); // Clear the form fields
    //         } else {
    //             // Simulate error message
    //             formMessages.innerHTML = '<p class="error-message">Please fill in all fields.</p>';
    //             formMessages.style.color = "red"; // Matches CSS error message style
    //         }

    //         // Clear messages after 5 seconds
    //         setTimeout(() => {
    //             formMessages.innerHTML = '';
    //         }, 5000);
    //     });
    // }
});