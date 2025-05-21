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
        smoothScroll: false,
        scrollDuration: 800,
        scrollEasing: 'easeInOut',
        reverse: false // Whether to scroll to bottom instead of top
    };

    // Color palette mapping function
    const colorSlots = {
        slot1: 'hsla(var(--white-hsl), 1)',          // White
        slot2: 'hsla(var(--lightAccent-hsl), 1)',    // Light Accent
        slot3: 'hsla(var(--accent-hsl), 1)',         // Accent
        slot4: 'hsla(var(--darkAccent-hsl), 1)',     // Dark Accent
        slot5: 'hsla(var(--black-hsl), 1)'           // Black
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
        console.info(`SquareHero Scroll to Top: Creating ${settings.reverse ? 'back-to-bottom' : 'back-to-top'} button`);
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
        
        // Get colors directly from settings
        console.info(`SquareHero Scroll to Top: Raw color settings - arrow: ${settings.arrow}, circle: ${settings.circle}, background: ${settings.background}`);
        
        // Process arrow color
        let arrowColor = settings.arrow;
        if (arrowColor && arrowColor.startsWith('slot')) {
            arrowColor = colorSlots[arrowColor];
            console.info(`SquareHero Scroll to Top: Translated arrow slot to: ${arrowColor}`);
        }
        
        // Process circle color
        let circleColor = settings.circle;
        if (circleColor && circleColor.startsWith('slot')) {
            circleColor = colorSlots[circleColor];
            console.info(`SquareHero Scroll to Top: Translated circle slot to: ${circleColor}`);
        } else if (circleColor && circleColor.startsWith('#')) {
            console.info(`SquareHero Scroll to Top: Using direct hex color for circle: ${circleColor}`);
        }
        
        // Process background color
        let backgroundColor = settings.background;
        if (backgroundColor && backgroundColor.startsWith('slot')) {
            backgroundColor = colorSlots[backgroundColor];
            console.info(`SquareHero Scroll to Top: Translated background slot to: ${backgroundColor}`);
        }
        
        // Set defaults if needed
        if (!arrowColor) {
            arrowColor = colorSlots.slot1;
            console.info(`SquareHero Scroll to Top: Using default white for arrow`);
        }
        if (!circleColor) {
            circleColor = colorSlots.slot3;
            console.info(`SquareHero Scroll to Top: Using default accent for circle`);
        }
        if (!backgroundColor) {
            backgroundColor = colorSlots.slot5;
            console.info(`SquareHero Scroll to Top: Using default black for background`);
        }
        
        console.info(`SquareHero Scroll to Top: Final colors - arrow: ${arrowColor}, circle: ${circleColor}, background: ${backgroundColor}`);
        
        // Set background color
        backToTopButton.style.backgroundColor = backgroundColor;
        
        // Apply shadow if enabled
        if (settings.shadow) {
            backToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            console.info("SquareHero Scroll to Top: Applied shadow to button");
        }
        
        backToTopButton.innerHTML = `
            <svg class="back-to-top-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 36">
                <path stroke="${arrowColor}" stroke-miterlimit="10" stroke-width="1.887" d="${settings.reverse ? 'M15.115 1.65V35.4M1.516 21.9l13.5 13.5 13.5-13.5' : 'M15.115 35.4V1.65M1.516 15.1l13.5-13.5 13.5 13.5'}"/>
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
            
            // Apply additional CSS for color styling
            const styleElement = document.createElement('style');
            styleElement.id = 'squarehero-scroll-to-top-styles';
            styleElement.textContent = `
                #backToTop .scroll-ring, #backToTop #progressCircle {
                    stroke: ${circleColor} !important;
                }
                #backToTop .back-to-top-arrow path {
                    stroke: ${arrowColor} !important;
                }
            `;
            document.head.appendChild(styleElement);
            console.info("SquareHero Scroll to Top: Added custom style element for colors");
            
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

            if (settings.reverse) {
                // For scroll to bottom: show when not at bottom
                const nearBottom = scrollPosition + window.innerHeight + 100 >= document.documentElement.scrollHeight;
                if (!nearBottom) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            } else {
                // Original behavior: show when scrolled down
                if (scrollPosition > scrollOffset) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }
        });

        // Configure button click behavior
        backToTopButton.addEventListener('click', () => {
            if (settings.reverse) {
                // Scroll to bottom behavior
                if (settings.smoothScroll !== false) {
                    const duration = settings.scrollDuration || 800;
                    const easing = settings.scrollEasing || 'easeInOut';
                    
                    scrollToBottom(duration, easing);
                } else {
                    // Fallback to basic scrolling to bottom
                    window.scrollTo(0, document.documentElement.scrollHeight);
                }
            } else {
                // Original scroll to top behavior
                if (settings.smoothScroll !== false) {
                    const duration = settings.scrollDuration || 800;
                    const easing = settings.scrollEasing || 'easeInOut';
                    
                    scrollToTop(duration, easing);
                } else {
                    // Fallback to basic scrolling
                    window.scrollTo(0, 0);
                }
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
        
        // Smooth scrolling to bottom implementation with easing
        function scrollToBottom(duration, easingType) {
            const start = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const distance = maxScroll - start;
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
                
                window.scrollTo(0, start + (distance * easingValue));
                
                if (time < 1) {
                    requestAnimationFrame(scroll);
                }
            }
            
            requestAnimationFrame(scroll);
        }
    }

    /**
     * Extracts JSON data from a CSS file
     * This is a workaround for CORS restrictions that may apply to JSON files
     * but not CSS files in certain environments like Squarespace
     */
    async function loadJSONFromCSS(cssFileUrl) {
        try {
            console.info(`SquareHero Scroll to Top: Attempting to load JSON from CSS file: ${cssFileUrl}`);
            // Fetch the CSS file as text
            const response = await fetch(cssFileUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to load CSS file: ${response.status} ${response.statusText}`);
            }
            
            const cssText = await response.text();
            
            // Extract the JSON data from between markers
            const jsonStartMarker = 'JSON_DATA_START';
            const jsonEndMarker = 'JSON_DATA_END';
            
            const startIndex = cssText.indexOf(jsonStartMarker) + jsonStartMarker.length;
            const endIndex = cssText.indexOf(jsonEndMarker);
            
            if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
                throw new Error('Could not find JSON data markers in CSS file');
            }
            
            // Extract and parse the JSON
            const jsonString = cssText.substring(startIndex, endIndex).trim();
            const jsonData = JSON.parse(jsonString);
            console.info(`SquareHero Scroll to Top: Successfully extracted JSON data from CSS file`);
            
            return jsonData;
        } catch (error) {
            console.error('SquareHero Scroll to Top: Error loading JSON from CSS:', error);
            return null;
        }
    }

    // Main initialization function
    function initPlugin() {
        try {
            console.info("SquareHero Scroll to Top: Starting initialization");
            
            // Try to load the CSS first
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdn.jsdelivr.net/gh/squarehero-store/dashboard@v2.0.0-beta.1/plugins/scroll-to-top/back-to-top.min.css';
            document.head.appendChild(cssLink);
            console.info("SquareHero Scroll to Top: Added CSS stylesheet");
            
            // Get settings URL from script tag
            const scriptTag = document.querySelector('script[data-squarehero-plugin="scroll-to-top"]');
            const settingsUrl = scriptTag?.getAttribute('settings');
            const reverseAttr = scriptTag?.getAttribute('reverse');
            
            // Check if reverse mode is enabled via script tag
            const isReverse = reverseAttr === 'true';
            if (isReverse) {
                console.info("SquareHero Scroll to Top: Reverse mode enabled via script tag");
                defaultSettings.reverse = true;
            }
            
            if (!settingsUrl) {
                console.warn("SquareHero Scroll to Top: No settings URL found in script tag, using default settings");
                initWithSettings();
                return;
            }
            
            console.info(`SquareHero Scroll to Top: Found settings URL in script tag: ${settingsUrl}`);
            
            // Create a container for our settings if it doesn't exist
            let pluginData = document.getElementById('plugin-data');
            if (!pluginData) {
                console.info("SquareHero Scroll to Top: Creating plugin-data container");
                pluginData = document.createElement('div');
                pluginData.id = 'plugin-data';
                pluginData.style.display = 'none';
                document.body.appendChild(pluginData);
                console.info("SquareHero Scroll to Top: plugin-data container created");
            } else {
                console.info("SquareHero Scroll to Top: Found existing plugin-data container");
            }
            
            // First check if we already have settings embedded
            const existingSettings = document.getElementById('plugin-settings');
            if (existingSettings) {
                console.info("SquareHero Scroll to Top: Found existing settings, checking if valid");
                
                try {
                    const config = JSON.parse(existingSettings.textContent);
                    if (config.plugin === "scroll-to-top") {
                        console.info("SquareHero Scroll to Top: Found valid embedded settings, using them");
                        initWithSettings(config);
                        return;
                    } else {
                        console.info("SquareHero Scroll to Top: Existing settings are for a different plugin");
                    }
                } catch (error) {
                    console.warn("SquareHero Scroll to Top: Error parsing existing settings", error);
                }
            }
            
            // Flag to track if we've already initialized
            let initialized = false;
            
            // Try to load the settings from the URL provided in the script tag
            console.info(`SquareHero Scroll to Top: Attempting to load settings from: ${settingsUrl}`);
            fetch(settingsUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(config => {
                    console.info("SquareHero Scroll to Top: Successfully loaded settings from URL");
                    
                    // Create a script tag to hold the settings
                    const settingsScript = document.createElement('script');
                    settingsScript.id = 'plugin-settings';
                    settingsScript.type = 'application/json';
                    settingsScript.textContent = JSON.stringify(config);
                    
                    // Remove any existing settings
                    if (existingSettings) {
                        existingSettings.remove();
                    }
                    
                    // Add the settings to the container
                    pluginData.appendChild(settingsScript);
                    console.info("SquareHero Scroll to Top: Added settings to DOM");
                    
                    // Validate plugin ID
                    if (config.plugin !== "scroll-to-top") {
                        console.warn("SquareHero Scroll to Top: Invalid plugin configuration, using default settings");
                        if (!initialized) {
                            initialized = true;
                            initWithSettings();
                        }
                        return;
                    }
                    
                    console.info("SquareHero Scroll to Top: Valid configuration found, initializing with settings");
                    if (!initialized) {
                        initialized = true;
                        initWithSettings(config);
                    }
                })
                .catch(error => {
                    console.warn(`SquareHero Scroll to Top: Failed to load settings from URL: ${error.message}, using default settings`);
                    if (!initialized) {
                        initialized = true;
                        initWithSettings();
                    }
                });
            
            // Set a timeout to ensure we initialize if loading takes too long
            setTimeout(function() {
                if (!initialized) {
                    console.warn("SquareHero Scroll to Top: Settings loading timed out, using default settings");
                    initialized = true;
                    initWithSettings();
                }
            }, 1500); // 1.5 second timeout
            
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