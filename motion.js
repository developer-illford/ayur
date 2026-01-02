const fadeElements = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {
    fadeElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.85;
        if (top < trigger) el.classList.add('active');
    });
})