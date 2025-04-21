(function() {
    console.info("🚀 SquareHero.store Scroll to Top Button plugin by SquareHero.store loaded");

    // Default settings to use if JSON settings aren't found
    const defaultSettings = {
        enabled: true,
        position: 'right',
        offset: 400,
        size: 50,
        bottom: 30,
        background: 'slot5',
        circle: 'slot3',
        arrow: 'slot1',
        shadow: true,
        smoothScroll: true,
        scrollDuration: 800,
        scrollEasing: 'easeInOut'
    };

    // Color palette mapping function
    const colorSlots = {
        slot1: 'hsla(var(--white-hsl), 1)',
        slot2: 'hsla(var(--lightAccent-hsl), 1)',
        slot3: 'hsla(var(--accent-hsl), 1)',
        slot4: 'hsla(var(--darkAccent-hsl), 1)', 
        slot5: 'hsla(var(--black-hsl), 1)'
    };

    // Get color value based on slot or hex value
    const getColorValue = (colorSetting, settings) => {
        if (colorSetting.startsWith('slot')) {
            return colorSlots[colorSetting] || colorSlots.slot1;
        }
        // Check for hex color values
        const hexKey = `${colorSetting}-hex`;
        if (settings[hexKey]) {
            return settings[hexKey];
        }
        return colorSlots.slot1;
    };

    // Function to initialize with settings
    function initWithSettings(config = null) {
        // Use default settings if config is null or not provided
        const settings = (config && config.settings) || defaultSettings;
        
        // Check if enabled
        if (settings.enabled === false) {
            console.info("SquareHero Scroll to Top: Plugin is disabled in settings");
            return;
        }
        
        // Create back-to-top button
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'backToTop';
        
        // Apply size setting if provided
        if (settings.size) {
            backToTopButton.style.width = `${settings.size}px`;
            backToTopButton.style.height = `${settings.size}px`;
        }
        
        // Apply bottom margin if provided
        if (settings.bottom) {
            backToTopButton.style.bottom = `${settings.bottom}px`;
        }
        
        // Get colors
        const arrowColor = getColorValue(settings.arrow || 'slot1', settings);
        const circleColor = getColorValue(settings.circle || 'slot3', settings);
        const backgroundColor = getColorValue(settings.background || 'slot5', settings);
        
        // Set background color
        backToTopButton.style.backgroundColor = backgroundColor;
        
        // Apply shadow if enabled
        if (settings.shadow) {
            backToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        }
        
        backToTopButton.innerHTML = `
            <svg class="back-to-top-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 36">
                <path stroke="${arrowColor}" stroke-miterlimit="10" stroke-width="1.887" d="M15.115 35.4V1.65M1.516 15.1l13.5-13.5 13.5 13.5"/>
            </svg>
            <svg width="100%" height="100%">
                <circle cx="50%" cy="50%" r="40%" stroke="${circleColor}" stroke-width="4" fill="none" stroke-dasharray="126" stroke-dashoffset="126" class="scroll-ring" id="progressCircle" />
            </svg>
        `;

        // Add position-specific class
        const position = settings.position || 'right';
        backToTopButton.classList.add(`position-${position}`);
        document.body.appendChild(backToTopButton);

        const progressCircle = document.getElementById('progressCircle');
        const circumference = progressCircle.r.baseVal.value * 2 * Math.PI;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

        function setProgress(percent) {
            const offset = circumference - percent / 100 * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        // Configure scroll offset
        const scrollOffset = settings.offset || 400;

        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPosition = window.scrollY;
            const scrollPercent = (scrollPosition / scrollTotal) * 100;
            setProgress(scrollPercent);

            if (scrollPosition > scrollOffset) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Configure smooth scrolling
        backToTopButton.addEventListener('click', () => {
            if (settings.smoothScroll !== false) {
                // If smooth scroll is enabled in settings
                const duration = settings.scrollDuration || 800;
                const easing = settings.scrollEasing || 'easeInOut';
                
                scrollToTop(duration, easing);
            } else {
                // Fallback to basic scrolling
                window.scrollTo(0, 0);
            }
        });
        
        // Smooth scrolling implementation with easing
        function scrollToTop(duration, easingType) {
            const start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
            
            function scroll() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, ((now - startTime) / duration));
                
                let easingValue;
                
                // Apply easing function based on settings
                switch(easingType) {
                    case 'linear':
                        easingValue = time;
                        break;
                    case 'easeInOut':
                        easingValue = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                        break;
                    case 'easeIn':
                        easingValue = time * time;
                        break;
                    case 'easeOut':
                        easingValue = time * (2 - time);
                        break;
                    default:
                        easingValue = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // Default to easeInOut
                }
                
                window.scrollTo(0, start * (1 - easingValue));
                
                if (time < 1) {
                    requestAnimationFrame(scroll);
                }
            }
            
            requestAnimationFrame(scroll);
        }
    }

    // STEP 1: Create the HTML layout for settings if it doesn't exist
    let settingsContainer = document.getElementById('squarehero-settings');
    if (!settingsContainer) {
        console.info("SquareHero Scroll to Top: Creating settings container");
        settingsContainer = document.createElement('div');
        settingsContainer.id = 'squarehero-settings';
        settingsContainer.style.display = 'none';
        document.body.appendChild(settingsContainer);
    }

    // Get settings ID from script tag
    const scriptTag = document.querySelector('script[data-squarehero-plugin="scroll-to-top"]');
    const settingsId = scriptTag?.getAttribute('settings');
    
    if (!settingsId) {
        console.warn("SquareHero Scroll to Top: Settings ID not found in script tag, using default settings");
        initWithSettings();
        return;
    }

    // Create the settings element if it doesn't exist
    let pluginSettings = settingsContainer.querySelector('.scroll-to-top-settings');
    if (!pluginSettings) {
        pluginSettings = document.createElement('div');
        pluginSettings.className = 'scroll-to-top-settings';
        settingsContainer.appendChild(pluginSettings);
    }

    // Set the settings URL
    const settingsUrl = `/s/squarehero-scroll-to-top-settings-${settingsId}.json`;
    pluginSettings.setAttribute('data-settings-url', settingsUrl);
    
    console.info(`SquareHero Scroll to Top: Settings URL set to ${settingsUrl}`);

    // STEP 2: Read the JSON file
    console.info(`SquareHero Scroll to Top: Fetching settings from ${settingsUrl}`);
    
    fetch(settingsUrl)
        .then(response => {
            if (!response.ok) {
                console.warn(`SquareHero Scroll to Top: Failed to fetch settings: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch settings: ${response.status}`);
            }
            console.info("SquareHero Scroll to Top: Settings file found and loaded successfully");
            return response.json();
        })
        .then(config => {
            // Validate plugin ID
            if (config.plugin !== "scroll-to-top") {
                console.warn("SquareHero Scroll to Top: Invalid plugin configuration, using default settings");
                initWithSettings();
                return;
            }

            console.info("SquareHero Scroll to Top: Valid configuration found, initializing with settings");
            // Initialize with the fetched config
            initWithSettings(config);
        })
        .catch(error => {
            console.error("SquareHero Scroll to Top: Error loading configuration, using default settings", error);
            initWithSettings();
        });
})();