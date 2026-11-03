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
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".outer-item");

    function updateActiveCard() {
        // Only activate on screens narrower than 800px
        if (window.innerWidth >= 800) {
            cards.forEach(card => card.classList.remove("in-view"));
            return;
        }

        const viewportCentre = window.innerHeight / 2;

        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCentre = rect.top + rect.height / 2;
            const distance = Math.abs(cardCentre - viewportCentre);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => {
            card.classList.toggle("in-view", card === closestCard);
        });
    }

    window.addEventListener("scroll", updateActiveCard, {
        passive: true
    });

    window.addEventListener("resize", updateActiveCard);

    updateActiveCard();
});