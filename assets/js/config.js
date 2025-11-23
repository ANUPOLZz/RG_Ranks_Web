// Configuration file for RG RANKS website
// Update these values to change content across the site

const SiteConfig = {
    // Site Information
    siteName: "RG RANKS",
    siteTagline: "Custom Minecraft Server Rank Textures",
    copyrightYear: new Date().getFullYear(),
    
    // Texture Pack Version - Update this when releasing new versions
    version: "1.1",
    
    // Social Media Links - Only Discord and YouTube
    social: {
        discord: "https://discord.gg/ACxPgfd25N",
        youtube: "https://www.youtube.com/@realgamerzyt"
    },
    
    // Download Links - Direct file paths to zip files
    downloads: {
        javaEdition: "https://linkvertise.com/1337427/rgranksv1-121-java?o=sharing", // Java
        bedrockEdition: "https://linkvertise.com/1337427/rgranksv1-121-bedrock?o=sharing" // Bedrock
    },
    
    // Installation Tutorial Video
    tutorialVideo: {
        youtubeUrl: "https://youtu.be/TgkcCMOSUN0?si=i0A7CEDkLWnxmo3a", // Replace with your YouTube video URL
        thumbnailUrl: "https://i.ytimg.com/vi/TgkcCMOSUN0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCeoN-h76DA3GfpcDrlY1H7f7uUcg", // Replace with video Thumbnail
        title: " "
    },
    
    // Resources Links - Configurable from here
    resources: {
        documentation: "https://github.com/RealGamerzYT7/RG-RANKS",
        tutorials: "https://youtu.be/TgkcCMOSUN0?si=i0A7CEDkLWnxmo3a",
        support: "https://discord.gg/ACxPgfd25N"
        // Community removed as requested
    },

    // Gallery Items - Updated with proper relative paths
    gallery: [
        {
            title: "Owner Rank",
            description: "Premium owner tag design with icon only for the server owner",
            image: "./assets/images/owner-rank.png",
            placeholder: "Owner Rank Preview"
        },
        {
            title: "Admin Rank",
            description: "Vibrant admin tag design with glowing effects for server administrators",
            image: "./assets/images/admin-rank.png",
            placeholder: "Admin Rank Preview"
        },
        {
            title: "Moderator Rank",
            description: "Distinctive moderator tag for server staff members",
            image: "./assets/images/mod-rank.png",
            placeholder: "Moderator Rank Preview"
        },
        {
            title: "VIP Rank",
            description: "Elegant VIP tag design for premium server members",
            image: "./assets/images/vip-rank.png",
            placeholder: "VIP Rank Preview"
        },
        {
            title: "YouTuber Rank",
            description: "Special content creator tag for server promoters",
            image: "./assets/images/youtuber-rank.png",
            placeholder: "YouTuber Rank Preview"
        },
        {
            title: "Member Rank",
            description: "Clean member tag style for regular server players",
            image: "./assets/images/member-rank.png",
            placeholder: "Member Rank Preview"
        }
    ],
    
    // FAQ Items
    faq: [
        {
            question: "Which Minecraft versions and editions are supported?",
            answer: "RG RANKS supports Minecraft Java Edition 1.16+ and Bedrock Edition (including Pocket Edition) 1.16+. The pack is optimized for both single servers and server networks across all platforms."
        },
        {
            question: "Can I customize the rank designs for my server?",
            answer: "Custom ranks are available for purchase, but you can also earn them for free by being active in our Discord or through our RG GAMES Discord Bot."
        },
        {
            question: "Which rank/permission plugins are compatible?",
            answer: "RG RANKS works with all major permission plugins including LuckPerms, PermissionsEx, GroupManager, and UltraPermissions for Java servers, and standard permission systems for Bedrock servers. The textures integrate seamlessly with your existing rank setup."
        },
        {
            question: "Will this affect server performance?",
            answer: "No, RG RANKS is highly optimized and has zero impact on server performance. The pack only contains texture files that are loaded client-side, meaning your server's TPS and performance remain unaffected."
        }
    ],
    
    // Animation Settings
    animations: {
        particleCount: 15,
        particleMinSize: 4,
        particleMaxSize: 12,
        particleMinDuration: 10,
        particleMaxDuration: 20,
        ambientWaveSpeed: 0.002,
        cubeRotationSpeed: 0.5
    },
    
    // Theme Colors (can be extended for theme switching)
    theme: {
        darkBg: "#0a0a12",
        darkerBg: "#050508",
        cardBg: "#121220",
        accentCyan: "#00f0ff",
        accentMagenta: "#ff00ff",
        accentPurple: "#8a2be2",
        textPrimary: "#ffffff",
        textSecondary: "#b0b0c0"
    }
};

// Freeze config to prevent accidental modifications
Object.freeze(SiteConfig);
