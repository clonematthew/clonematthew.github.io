// Load the shared header
async function loadHeader() {
    const header = document.getElementById('header');

    if (!header) return;

    try {
        const response = await fetch('header.html');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        header.innerHTML = await response.text();

    } catch (error) {
        console.error('Failed to load header:', error);
    }
}

// Initialise particles.js if the page contains a particles container
function initialiseParticles() {
    const particlesContainer = document.getElementById('particles-js');

    if (!particlesContainer) return;

    if (typeof particlesJS === 'undefined') {
        console.error('particles.js failed to load.');
        return;
    }

    particlesJS.load(
        'particles-js',
        'particles.json',
        () => console.log('Particles loaded successfully')
    );
}

// Run shared functionality
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    initialiseParticles();
});

// Check where centre of the viewport is for card images on mobile
if (window.matchMedia("(hover: none)").matches) {
    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".outer-item");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                } else {
                    entry.target.classList.remove("in-view");
                }
            });
        }, {
            root: null,
            rootMargin: "-60% 0px -60% 0px",
            threshold: 0
        });

        cards.forEach(card => observer.observe(card));
    });
}
