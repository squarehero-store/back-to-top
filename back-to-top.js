(function() {
    console.info("🚀 SquareHero.store Scroll to Top Button plugin by SquareHero.store loaded");

    // Default settings to use if embedded settings aren't found
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
        console.info("SquareHero Scroll to Top: initWithSettings called", config ? "with custom settings" : "with default settings");
        
        // Use default settings if config is null or not provided
        const settings = (config && config.settings) || defaultSettings;
        console.info("SquareHero Scroll to Top: Using settings:", JSON.stringify(settings, null, 2));
        
        // Check if enabled
        if (settings.enabled === false) {
            console.info("SquareHero Scroll to Top: Plugin is disabled in settings");
            return;
        }
        
        // Create back-to-top button
        console.info("SquareHero Scroll to Top: Creating back-to-top button");
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'backToTop';
        
        // Apply size setting if provided
        if (settings.size) {
            backToTopButton.style.width = `${settings.size}px`;
            backToTopButton.style.height = `${settings.size}px`;
            console.info(`SquareHero Scroll to Top: Set button size to ${settings.size}px`);
        }
        
        // Apply bottom margin if provided
        if (settings.bottom) {
            backToTopButton.style.bottom = `${settings.bottom}px`;
            console.info(`SquareHero Scroll to Top: Set button bottom margin to ${settings.bottom}px`);
        }
        
        // Get colors
        const arrowColor = getColorValue(settings.arrow || 'slot1', settings);
        const circleColor = getColorValue(settings.circle || 'slot3', settings);
        const backgroundColor = getColorValue(settings.background || 'slot5', settings);
        
        console.info(`SquareHero Scroll to Top: Using colors - arrow: ${arrowColor}, circle: ${circleColor}, background: ${backgroundColor}`);
        
        // Set background color
        backToTopButton.style.backgroundColor = backgroundColor;
        
        // Apply shadow if enabled
        if (settings.shadow) {
            backToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            console.info("SquareHero Scroll to Top: Applied shadow to button");
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
        console.info(`SquareHero Scroll to Top: Set button position to ${position}`);
        
        console.info("SquareHero Scroll to Top: Appending button to document body");
        document.body.appendChild(backToTopButton);
        console.info("SquareHero Scroll to Top: Button added to DOM");
        
        // Verify button is in DOM
        setTimeout(() => {
            const buttonInDOM = document.getElementById('backToTop');
            console.info(`SquareHero Scroll to Top: Button in DOM check: ${buttonInDOM ? 'Yes' : 'No'}`);
            if (!buttonInDOM) {
                console.warn("SquareHero Scroll to Top: Button was not found in DOM after adding it");
            }
        }, 100);

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

    // Main initialization function
    function initPlugin() {
        try {
            console.info("SquareHero Scroll to Top: Starting initialization");
            
            // Get settings ID from script tag
            const scriptTag = document.querySelector('script[data-squarehero-plugin="scroll-to-top"]');
            const settingsId = scriptTag?.getAttribute('settings');
            
            if (!settingsId) {
                console.warn("SquareHero Scroll to Top: No settings ID found in script tag, using default settings");
                initWithSettings();
                return;
            }
            
            console.info(`SquareHero Scroll to Top: Found settings ID in script tag: ${settingsId}`);
            
            // Create container for settings if it doesn't exist
            let settingsContainer = document.getElementById('squarehero-settings');
            if (!settingsContainer) {
                console.info("SquareHero Scroll to Top: Creating settings container");
                settingsContainer = document.createElement('div');
                settingsContainer.id = 'squarehero-settings';
                settingsContainer.style.display = 'none';
                document.body.appendChild(settingsContainer);
                console.info("SquareHero Scroll to Top: Settings container created and added to body");
            } else {
                console.info("SquareHero Scroll to Top: Found existing settings container");
            }
            
            // Create the scroll-to-top settings element if it doesn't exist
            let pluginSettings = settingsContainer.querySelector('.scroll-to-top-settings');
            if (!pluginSettings) {
                console.info("SquareHero Scroll to Top: Creating plugin settings element");
                pluginSettings = document.createElement('div');
                pluginSettings.className = 'scroll-to-top-settings';
                settingsContainer.appendChild(pluginSettings);
                console.info("SquareHero Scroll to Top: Plugin settings element created and added to container");
            } else {
                console.info("SquareHero Scroll to Top: Found existing plugin settings element");
            }
            
            // Set the URL for the settings JSON file
            const settingsUrl = `/s/squarehero-scroll-to-top-settings-${settingsId}.json`;
            console.info(`SquareHero Scroll to Top: Settings URL is ${settingsUrl}`);
            
            // Try to load the CSS first
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdn.jsdelivr.net/gh/squarehero-store/dashboard@v2.0.0-beta.1/plugins/scroll-to-top/back-to-top.min.css';
            document.head.appendChild(cssLink);
            console.info("SquareHero Scroll to Top: Added CSS stylesheet");
            
            // Approach similar to the reference code
            // Create a script tag with the URL that will fetch the JSON
            const loaderScript = document.createElement('script');
            loaderScript.id = 'squarehero-settings-loader';
            loaderScript.src = settingsUrl;
            loaderScript.async = true;
            
            // Once the loader script loads the JSON, we'll process it
            loaderScript.onload = function() {
                console.info("SquareHero Scroll to Top: Settings loader script loaded");
                
                // Create a script tag to hold the actual JSON data
                const settingsScript = document.createElement('script');
                settingsScript.id = 'squarehero-scroll-to-top-settings';
                settingsScript.type = 'application/json';
                
                // Get the raw content of the JSON file
                const jsonContent = loaderScript.textContent || loaderScript.innerHTML;
                console.info("SquareHero Scroll to Top: Retrieved JSON content", jsonContent ? "successfully" : "failed");
                
                if (jsonContent) {
                    // Store the JSON content in the script tag
                    settingsScript.textContent = jsonContent;
                    pluginSettings.appendChild(settingsScript);
                    console.info("SquareHero Scroll to Top: Added settings script to DOM");
                    
                    // Read the settings similar to the reference code
                    readAndApplySettings();
                } else {
                    console.warn("SquareHero Scroll to Top: No JSON content found, using default settings");
                    initWithSettings();
                }
            };
            
            // Handle loading failure
            loaderScript.onerror = function() {
                console.warn("SquareHero Scroll to Top: Failed to load settings, using default settings");
                initWithSettings();
            };
            
            // Add the loader script to the document head
            document.head.appendChild(loaderScript);
            console.info("SquareHero Scroll to Top: Added settings loader to DOM");
            
            // Create a function to read and apply settings similar to the reference code
            function readAndApplySettings() {
                const settingsElement = document.getElementById('squarehero-scroll-to-top-settings');
                
                if (settingsElement) {
                    try {
                        console.info("SquareHero Scroll to Top: Reading settings from DOM element");
                        const jsonContent = settingsElement.textContent;
                        console.info(`SquareHero Scroll to Top: Settings content length: ${jsonContent.length}`);
                        
                        if (jsonContent) {
                            const config = JSON.parse(jsonContent);
                            console.info("SquareHero Scroll to Top: Successfully parsed settings JSON");
                            
                            // Validate plugin ID
                            if (config.plugin !== "scroll-to-top") {
                                console.warn("SquareHero Scroll to Top: Invalid plugin configuration, using default settings");
                                initWithSettings();
                                return;
                            }
                            
                            console.info("SquareHero Scroll to Top: Valid configuration found, initializing with settings");
                            initWithSettings(config);
                        } else {
                            console.warn("SquareHero Scroll to Top: Empty settings element, using default settings");
                            initWithSettings();
                        }
                    } catch (error) {
                        console.error("SquareHero Scroll to Top: Error parsing settings:", error);
                        initWithSettings();
                    }
                } else {
                    console.warn("SquareHero Scroll to Top: Settings element not found, using default settings");
                    initWithSettings();
                }
            }
            
            // Set a timeout to ensure we fall back to default settings if everything else fails
            setTimeout(function() {
                if (!document.getElementById('backToTop')) {
                    console.warn("SquareHero Scroll to Top: Timeout reached, initializing with default settings");
                    initWithSettings();
                }
            }, 2000);
            
        } catch (error) {
            console.error("SquareHero Scroll to Top: Unexpected error during initialization, using default settings", error);
            initWithSettings();
        }
    }
    
    // Wait for the DOM to be fully loaded before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlugin);
    } else {
        // DOM already loaded, initialize immediately
        initPlugin();
    }
})();