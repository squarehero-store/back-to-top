// ================================================
//   ⚡ Back to Top plugin by SquareHero.store
// ================================================
(function() {
    console.info("🚀 SquareHero.store Back to Top plugin loaded");

    // Create back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTop';
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 36">
            <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.887" d="M15.115 35.4V1.65M1.516 15.1l13.5-13.5 13.5 13.5"/>
        </svg>
        <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" stroke-width="4" fill="none" stroke-dasharray="126" stroke-dashoffset="126" id="progressCircle" />
        </svg>
    `;
    document.body.appendChild(backToTopButton);

    const progressCircle = document.getElementById('progressCircle');
    const circumference = progressCircle.r.baseVal.value * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercent = (scrollPosition / scrollTotal) * 100;
        setProgress(scrollPercent);

        if (scrollPosition > 100) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();