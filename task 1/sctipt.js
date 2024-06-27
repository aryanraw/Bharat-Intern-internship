document.addEventListener("DOMContentLoaded", () => {
    const progress = document.querySelectorAll(".progress-done");

    progress.forEach((bar) => {
        setTimeout(() => {
            bar.style.width = bar.getAttribute("data-done") + "%";
            bar.style.opacity = 1000;
        }, 5);
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust offset to avoid hiding under the navbar
                behavior: 'smooth'
            });
        });
    });
});

