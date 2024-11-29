(function() {
    console.info("🚀 SquareHero.store Scroll to Top Button plugin by SquareHero.store loaded");

    // Get configuration from meta tag
    const metaTag = document.querySelector('meta[squarehero-plugin="back-to-top"]');
    const position = metaTag?.getAttribute('position')?.toLowerCase() || 'right';
    const enabled = metaTag?.getAttribute('enabled')?.toLowerCase() !== 'false';
    const ringColor = metaTag?.getAttribute('ring') || '1';
    const arrowColor = metaTag?.getAttribute('arrow') || '1';

    if (!enabled) return;

    // Color palette mapping function
    const getColorValue = (colorNumber) => {
        switch (colorNumber) {
            case '1': return 'hsla(var(--white-hsl), 1)';
            case '2': return 'hsla(var(--lightAccent-hsl), 1)';
            case '3': return 'hsla(var(--accent-hsl), 1)';
            case '4': return 'hsla(var(--darkAccent-hsl), 1)';
            case '5': return 'hsla(var(--black-hsl), 1)';
            default: return 'hsla(var(--white-hsl), 1)';
        }
    };

    // Create back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTop';
    backToTopButton.innerHTML = `
        <svg class="back-to-top-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 36">
            <path stroke="${getColorValue(arrowColor)}" stroke-miterlimit="10" stroke-width="1.887" d="M15.115 35.4V1.65M1.516 15.1l13.5-13.5 13.5 13.5"/>
        </svg>
        <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" stroke="${getColorValue(ringColor)}" stroke-width="4" fill="none" stroke-dasharray="126" stroke-dashoffset="126" class="scroll-ring" id="progressCircle" />
        </svg>
    `;

    // Add position-specific class
    backToTopButton.classList.add(`position-${position}`);
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