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
    socialLinks: null
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

    // Setup Rank Prefixes button
    setupRankPrefixesButton();
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

// Setup Rank Prefixes button
function setupRankPrefixesButton() {
    const rankPrefixesBtn = document.querySelector('.rank-prefixes-btn');
    if (rankPrefixesBtn && SiteConfig.rankPrefixesLink) {
        rankPrefixesBtn.href = SiteConfig.rankPrefixesLink;
        rankPrefixesBtn.target = "_blank";
        rankPrefixesBtn.rel = "noopener noreferrer";
    }
}

// Setup tutorial video
function setupTutorialVideo() {
    const videoBox = document.getElementById('tutorialVideoBox');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoTitle = document.getElementById('videoTitle');
    
    if (videoBox && SiteConfig.tutorialVideo) {
        // Set video thumbnail
        if (videoThumbnail) {
            videoThumbnail.style.backgroundImage = `url('${SiteConfig.tutorialVideo.thumbnailUrl}')`;
        }
        
        // Set video title
        if (videoTitle) {
            videoTitle.textContent = SiteConfig.tutorialVideo.title;
        }
        
        // Add click event to open YouTube video
        videoBox.addEventListener('click', () => {
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

// Interactive hover effects - Fixed button ripple to not affect size
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
    
    // Button ripple effect - REMOVED to prevent size changes
    // The ripple effect was causing the button size "pop" issue
    // Buttons now rely solely on CSS hover/active states for visual feedback
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
    initInteractiveEffects();
});

