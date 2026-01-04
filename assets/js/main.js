// Main JavaScript file for RG RANKS website

// DOM Elements Cache
const elements = {
    loader: null,
    header: null,
    mobileMenuBtn: null,
    mobileMenu: null,
    scrollTopBtn: null,
    ambientCanvas: null,
    particlesContainer: null,
    galleryGrid: null,
    faqContainer: null,
    socialLinks: null,
    // Countdown elements
    countdownOverlay: null,
    continueBtn: null,
    countdownVersionOverlay: null,
    daysOverlay: null,
    hoursOverlay: null,
    minutesOverlay: null,
    secondsOverlay: null,
    // Hero section dynamic elements
    heroDynamicContent: null,
    rankImageCycler: null,
    viewGalleryLink: null
};

// Initialize DOM elements after page load
function initElements() {
    elements.loader = document.getElementById('loader');
    elements.header = document.getElementById('header');
    elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    elements.mobileMenu = document.getElementById('mobileMenu');
    elements.scrollTopBtn = document.getElementById('scrollTop');
    elements.ambientCanvas = document.getElementById('ambientCanvas');
    elements.particlesContainer = document.getElementById('particlesContainer');
    elements.galleryGrid = document.getElementById('galleryGrid');
    elements.faqContainer = document.getElementById('faqContainer');
    elements.socialLinks = document.getElementById('socialLinks');
    // Countdown elements
    elements.countdownOverlay = document.getElementById('countdownOverlay');
    elements.continueBtn = document.getElementById('continueBtn');
    elements.countdownVersionOverlay = document.getElementById('countdownVersionOverlay');
    elements.daysOverlay = document.getElementById('daysOverlay');
    elements.hoursOverlay = document.getElementById('hoursOverlay');
    elements.minutesOverlay = document.getElementById('minutesOverlay');
    elements.secondsOverlay = document.getElementById('secondsOverlay');
    // Hero section dynamic elements
    elements.heroDynamicContent = document.getElementById('heroDynamicContent');
    elements.rankImageCycler = document.getElementById('rankImageCycler');
    elements.viewGalleryLink = document.getElementById('viewGalleryLink');
}

// Apply configuration to the page
function applyConfig() {
    // Update version number
    const versionElement = document.getElementById('versionNumber');
    if (versionElement) {
        versionElement.textContent = SiteConfig.version;
    }
    
    // Update Discord links
    const discordBtn = document.getElementById('discordBtn');
    const mobileDiscordBtn = document.getElementById('mobileDiscordBtn');
    const supportDiscordBtn = document.getElementById('supportDiscordBtn');
    if (discordBtn) discordBtn.href = SiteConfig.social.discord;
    if (mobileDiscordBtn) mobileDiscordBtn.href = SiteConfig.social.discord;
    if (supportDiscordBtn) supportDiscordBtn.href = SiteConfig.social.discord;
    
    // Setup download buttons for direct file download
    setupDownloadButtons();
    
    // Setup tutorial video
    setupTutorialVideo();
    
    // Setup resources links
    setupResourcesLinks();
    
    // Update copyright
    const copyrightText = document.getElementById('copyrightText');
    if (copyrightText) {
        copyrightText.textContent = `© ${SiteConfig.copyrightYear} ${SiteConfig.siteName}. All rights reserved. Not affiliated with Mojang Studios or Microsoft.`;
    }
    
    // Generate gallery items
    generateGallery();
    
    // Generate FAQ items
    generateFAQ();
    
    // Generate social links
    generateSocialLinks();


    // Initialize Countdown
    initCountdown();
}

// Setup resources links
function setupResourcesLinks() {
    const documentationLink = document.querySelector('a[href="#"][data-resource="documentation"]');
    const tutorialsLink = document.querySelector('a[href="#"][data-resource="tutorials"]');
    const supportLink = document.querySelector('a[href="#"][data-resource="support"]');
    
    if (documentationLink) {
        documentationLink.href = SiteConfig.resources.documentation;
        documentationLink.target = "_blank";
        documentationLink.rel = "noopener noreferrer";
    }
    
    if (tutorialsLink) {
        tutorialsLink.href = SiteConfig.resources.tutorials;
        tutorialsLink.target = "_blank";
        tutorialsLink.rel = "noopener noreferrer";
    }
    
    if (supportLink) {
        supportLink.href = SiteConfig.resources.support;
        supportLink.target = "_blank";
        supportLink.rel = "noopener noreferrer";
    }
}

// Setup download buttons for direct file download
function setupDownloadButtons() {
    const downloadJava = document.getElementById('downloadJava');
    const downloadBedrock = document.getElementById('downloadBedrock');
    
    if (downloadJava) {
        downloadJava.href = SiteConfig.downloads.javaEdition;
        // Remove download attribute to let browser handle it naturally
        downloadJava.removeAttribute('download');
        // Remove any click handlers that might interfere
        downloadJava.onclick = null;
    }
    
    if (downloadBedrock) {
        downloadBedrock.href = SiteConfig.downloads.bedrockEdition;
        // Remove download attribute to let browser handle it naturally
        downloadBedrock.removeAttribute('download');
        // Remove any click handlers that might interfere
        downloadBedrock.onclick = null;
    }
}


// Setup tutorial video
function setupTutorialVideo() {
    const videoContainer = document.getElementById('videoThumbnail');
    
    if (videoContainer && SiteConfig.tutorialVideo) {
        const thumbnailElement = videoContainer.querySelector('.video-thumbnail');
        const videoTitle = document.getElementById('videoTitle');
        
        // Set video thumbnail
        if (thumbnailElement) {
            thumbnailElement.style.backgroundImage = `url('${SiteConfig.tutorialVideo.thumbnailUrl}')`;
        }
        
        // Set video title
        if (videoTitle) {
            videoTitle.textContent = SiteConfig.tutorialVideo.title;
        }
        
        // Add click event to open YouTube video
        videoContainer.addEventListener('click', () => {
            window.open(SiteConfig.tutorialVideo.youtubeUrl, '_blank');
        });
    }
}

// Generate gallery items dynamically
function generateGallery() {
    if (!elements.galleryGrid) return;
    
    elements.galleryGrid.innerHTML = SiteConfig.gallery.map((item, index) => `
        <div class="gallery-item animate-on-scroll" data-delay="${0.1 * (index + 1)}">
            <div class="gallery-placeholder" style="background-image: url('${item.image}');">
                <span class="placeholder-text">${item.placeholder}</span>
            </div>
            <div class="overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="gallery-hover-effect"></div>
        </div>
    `).join('');
}

// Generate FAQ items dynamically
function generateFAQ() {
    if (!elements.faqContainer) return;
    
    elements.faqContainer.innerHTML = SiteConfig.faq.map((item, index) => `
        <div class="faq-item animate-on-scroll" data-delay="${0.1 * (index + 1)}">
            <div class="faq-question">
                <span>${item.question}</span>
                <i class="fas fa-chevron-down faq-toggle"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
    
    // Reattach FAQ event listeners
    initFAQ();
}

// Generate social links dynamically - Updated for only Discord and YouTube
function generateSocialLinks() {
    if (!elements.socialLinks) return;
    
    const socialIcons = {
        discord: 'fab fa-discord',
        youtube: 'fab fa-youtube'
    };
    
    elements.socialLinks.innerHTML = Object.entries(SiteConfig.social).map(([platform, url]) => `
        <a href="${url}" target="_blank" aria-label="${platform.charAt(0).toUpperCase() + platform.slice(1)}">
            <i class="${socialIcons[platform] || 'fas fa-link'}"></i>
        </a>
    `).join('');
}

// Loading Screen
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (elements.loader) {
                elements.loader.classList.add('fade-out');
                setTimeout(() => {
                    elements.loader.style.display = 'none';
                }, 500);
            }
        }, 1500);
    });
}

// Mobile Menu
function initMobileMenu() {
    if (!elements.mobileMenuBtn || !elements.mobileMenu) return;
    
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenuBtn.classList.toggle('active');
        elements.mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu-content a[data-nav]').forEach(link => {
        link.addEventListener('click', () => {
            elements.mobileMenuBtn.classList.remove('active');
            elements.mobileMenu.classList.remove('active');
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    if (!elements.scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            elements.scrollTopBtn.classList.add('visible');
        } else {
            elements.scrollTopBtn.classList.remove('visible');
        }
    });
    
    elements.scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Ambient Canvas Animation
function initAmbientCanvas() {
    const canvas = elements.ambientCanvas;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function drawAmbient() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create flowing gradient waves
        const gradient1 = ctx.createRadialGradient(
            canvas.width * 0.3 + Math.sin(time) * 50,
            canvas.height * 0.3 + Math.cos(time) * 50,
            0,
            canvas.width * 0.3,
            canvas.height * 0.3,
            canvas.width * 0.5
        );
        gradient1.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
        gradient1.addColorStop(1, 'transparent');
        
        const gradient2 = ctx.createRadialGradient(
            canvas.width * 0.7 + Math.cos(time * 0.8) * 50,
            canvas.height * 0.6 + Math.sin(time * 0.8) * 50,
            0,
            canvas.width * 0.7,
            canvas.height * 0.6,
            canvas.width * 0.4
        );
        gradient2.addColorStop(0, 'rgba(255, 0, 255, 0.15)');
        gradient2.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += SiteConfig.animations.ambientWaveSpeed;
        requestAnimationFrame(drawAmbient);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawAmbient();
}

// Particle System
function initParticles() {
    const container = elements.particlesContainer;
    if (!container || window.innerWidth < 768) return;
    
    const particles = [];
    const config = SiteConfig.animations;
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * window.innerHeight;
        }
        
        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = window.innerHeight + 50;
            this.size = Math.random() * (config.particleMaxSize - config.particleMinSize) + config.particleMinSize;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.element = document.createElement('div');
            this.element.className = 'particle';
            this.element.style.width = `${this.size}px`;
            this.element.style.height = `${this.size}px`;
            this.element.style.opacity = this.opacity;
            container.appendChild(this.element);
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            
            if (this.y < -50) {
                this.reset();
            }
            
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
        
        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }
    
    // Create particles with spacing
    for (let i = 0; i < config.particleCount; i++) {
        setTimeout(() => {
            particles.push(new Particle());
        }, i * 200);
    }
    
    // Animation loop
    function animateParticles() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        particles.forEach(particle => particle.destroy());
    });
}

// Interactive hover effects
function initInteractiveEffects() {
    // Gallery items parallax
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            item.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                translateZ(20px)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // Rank Image Cycler hover effect
    if (elements.rankImageCycler) {
        elements.rankImageCycler.addEventListener('mousemove', (e) => {
            const rect = elements.rankImageCycler.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            elements.rankImageCycler.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.05)`;
        });

        elements.rankImageCycler.addEventListener('mouseleave', () => {
            elements.rankImageCycler.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    }
}

// Countdown Timer Logic
function initCountdown() {
    const { countdown } = SiteConfig;
    if (!countdown || !countdown.enabled) {
        renderHeroContent(false);
        if (elements.countdownOverlay) elements.countdownOverlay.style.display = 'none';
        return;
    }

    // Function to parse time with AM/PM
    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${String(hours).padStart(2, '0')}:${minutes}:00`;
    };

    const time24 = parseTime(countdown.releaseTime);
    const releaseDateTimeString = `${countdown.releaseDate}T${time24}`;

    // Create a date object in the specified timezone
    const releaseDateInTimezone = new Date(new Date(releaseDateTimeString).toLocaleString('en-US', { timeZone: countdown.timezone }));
    const localDate = new Date(releaseDateTimeString);
    const timezoneOffset = localDate.getTime() - releaseDateInTimezone.getTime();
    const releaseDate = localDate.getTime() + timezoneOffset;

    if (isNaN(releaseDate)) {
        console.error("Invalid countdown date/time format in config.js. Please use YYYY-MM-DD and HH:MM AM/PM.");
        renderHeroContent(false);
        if (elements.countdownOverlay) elements.countdownOverlay.style.display = 'none';
        return;
    }
    if (elements.countdownVersionOverlay) {
        elements.countdownVersionOverlay.innerHTML = `<span class="countdown-version-highlight">${countdown.version}</span>`;
    }

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = releaseDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            renderHeroContent(false); // Countdown finished, show normal content
            if (elements.countdownOverlay) elements.countdownOverlay.style.display = 'none';
            return;
        }

        renderHeroContent(true); // Countdown is active
        updateTimerDisplays(distance);
    }, 1000);

    if (elements.countdownOverlay) elements.countdownOverlay.style.display = 'flex';
    if (elements.continueBtn) {
        elements.continueBtn.addEventListener('click', () => {
            if (elements.countdownOverlay) {
                elements.countdownOverlay.classList.add('fade-out');
                setTimeout(() => { elements.countdownOverlay.style.display = 'none'; }, 500);
            }
        });
    }
}

function updateTimerDisplays(distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Overlay timers
    if (elements.daysOverlay) elements.daysOverlay.textContent = String(days).padStart(2, '0');
    if (elements.hoursOverlay) elements.hoursOverlay.textContent = String(hours).padStart(2, '0');
    if (elements.minutesOverlay) elements.minutesOverlay.textContent = String(minutes).padStart(2, '0');
    if (elements.secondsOverlay) elements.secondsOverlay.textContent = String(seconds).padStart(2, '0');

    // Hero section inline timers
    const daysHero = document.getElementById('daysHero');
    const hoursHero = document.getElementById('hoursHero');
    const minutesHero = document.getElementById('minutesHero');
    const secondsHero = document.getElementById('secondsHero');

    if (daysHero) daysHero.textContent = String(days).padStart(2, '0');
    if (hoursHero) hoursHero.textContent = String(hours).padStart(2, '0');
    if (minutesHero) minutesHero.textContent = String(minutes).padStart(2, '0');
    if (secondsHero) secondsHero.textContent = String(seconds).padStart(2, '0');
}

// Dynamic Hero Content Renderer
function renderHeroContent(isCountdownActive) {
    if (!elements.heroDynamicContent) return;

    if (isCountdownActive) {
        const { countdown } = SiteConfig;
        elements.heroDynamicContent.innerHTML = `
            <div class="countdown-container-hero">
                <div class="countdown-title">Version <span class="countdown-version-highlight">${countdown.version}</span> Releasing In</div>
                <div class="countdown-timer-hero">
                    <span id="daysHero">00</span> : <span id="hoursHero">00</span> : <span id="minutesHero">00</span> : <span id="secondsHero">00</span>
                </div>
            </div>
        `;
    } else {
        elements.heroDynamicContent.innerHTML = `
            <div class="download-info">
                <div class="version-text">Version <span class="version-number">${SiteConfig.version}</span></div>
                <div class="download-label">Download For</div>
            </div>
            <div class="hero-buttons">
                <a href="${SiteConfig.downloads.javaEdition}" class="btn btn-java" id="downloadJava">
                    <i class="fab fa-java"></i> 
                    <span>JAVA EDITION</span>
                </a>
                <a href="${SiteConfig.downloads.bedrockEdition}" class="btn btn-bedrock" id="downloadBedrock">
                    <i class="fas fa-cube"></i> 
                    <span>BEDROCK/PE</span>
                </a>
            </div>
            <div class="hero-buttons-extra">
                 <a href="${SiteConfig.rankPrefixesLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary rank-prefixes-btn">
                    <span>Get Rank Prefixes</span>
                </a>
            </div>
        `;
    }
    // Ensure the button is sized correctly after render
    if (!isCountdownActive) {
        setTimeout(resizeRankPrefixesButton, 0);
    }
}

// Function to dynamically size the rank prefixes button
function resizeRankPrefixesButton() {
    const heroButtons = document.querySelector('.hero-buttons');
    const rankPrefixesBtn = document.querySelector('.rank-prefixes-btn');

    if (heroButtons && rankPrefixesBtn && window.innerWidth >= 560) {
        const downloadButtons = heroButtons.querySelectorAll('.btn');
        if (downloadButtons.length === 2) {
            const width1 = downloadButtons[0].offsetWidth;
            const width2 = downloadButtons[1].offsetWidth;
            const gapStyle = window.getComputedStyle(heroButtons).gap;
            const gap = parseFloat(gapStyle) || 20;
            const totalWidth = width1 + width2 + gap;
            rankPrefixesBtn.style.width = `${totalWidth}px`;
        }
    } else if (rankPrefixesBtn) {
        rankPrefixesBtn.style.width = '100%';
    }
}

// Features Carousel
function initFeaturesCarousel() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;

    const featureCards = Array.from(featuresGrid.children);
    const totalCards = featureCards.length;
    if (totalCards === 0) return;

    // Clone cards for a seamless loop
    featureCards.forEach(card => {
        const clone = card.cloneNode(true);
        featuresGrid.appendChild(clone);
    });

    let animationPaused = false;

    featuresGrid.addEventListener('mouseenter', () => {
        animationPaused = true;
        featuresGrid.style.animationPlayState = 'paused';
    });

    featuresGrid.addEventListener('mouseleave', () => {
        animationPaused = false;
        featuresGrid.style.animationPlayState = 'running';
    });
}

// Rank Image Cycler
function initRankImageCycler() {
    if (!elements.rankImageCycler || window.innerWidth < 992) return;

    const images = SiteConfig.gallery.map(item => item.image);
    if (images.length === 0) return;

    elements.rankImageCycler.innerHTML = images.map((src, index) => 
        `<img src="${src}" alt="Rank Image ${index + 1}" class="rank-image ${index === 0 ? 'active' : ''}" style="animation-delay: ${index * 5}s">`
    ).join('');

    let currentIndex = 0;
    setInterval(() => {
        const currentImage = elements.rankImageCycler.children[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = elements.rankImageCycler.children[currentIndex];

        currentImage.classList.remove('active');
        nextImage.classList.add('active');
    }, 5000);
}

// Preload ad images to ensure they load properly
function preloadAdImages() {
    if (SiteConfig.ads.enabled) {
        const adConfigs = [SiteConfig.ads.slot1, SiteConfig.ads.slot2, SiteConfig.ads.slot3];
        adConfigs.forEach(adConfig => {
            if (adConfig && adConfig.image) {
                const img = new Image();
                img.src = adConfig.image;
                img.onload = function() {
                    console.log('Ad image loaded:', adConfig.image);
                };
                img.onerror = function() {
                    console.log('Failed to load ad image:', adConfig.image);
                };
            }
        });
    }
    
    // Preload default ad image
    const defaultImg = new Image();
    defaultImg.src = SiteConfig.ads.defaultSlot.image;
    defaultImg.onload = function() {
        console.log('Default ad image loaded');
    };
    defaultImg.onerror = function() {
        console.log('Failed to load default ad image');
    };
}

// Call preload function after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    preloadAdImages();
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    applyConfig();
    initLoader();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScrolling();
    initScrollToTop();
    initScrollAnimations();
    initAmbientCanvas();
    initParticles();
    initFeaturesCarousel();
    initRankImageCycler();
    initInteractiveEffects();

    // Add resize listener for the rank prefixes button
    window.addEventListener('resize', resizeRankPrefixesButton);
});

