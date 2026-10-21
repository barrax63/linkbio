// ============================================
// CONFIGURATION
// ============================================
const CONFIG_PATH = 'config.json';

const FALLBACK_DATA = {
    site: {
        titleTemplate: '{name} | LinkBio',
        description: '',
        ogTitle: '',
        ogDescription: '',
        footerHtml: 'Powered by <a href="#">LinkBio</a> • Self-Hosted'
    },
    profile: {
        name: 'LinkBio',
        handle: '',
        bio: '',
        location: '',
        avatar: ''
    },
    socials: [],
    links: []
};

let CONFIG_DATA = null;
let configLoadFailed = false;

// ============================================
// LANGUAGE
// ============================================
const SUPPORTED_LANGUAGES = ['en', 'de'];
const DEFAULT_LANGUAGE = 'en';

// Shown on links whose page is only available in one language,
// keyed by visitor language, then page language
const LANGUAGE_NOTES = {
    en: { en: 'English only', de: 'German only' },
    de: { en: 'Nur auf Englisch', de: 'Nur auf Deutsch' }
};

function detectLanguage() {
    const preferred = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ''];
    for (const tag of preferred) {
        const base = tag.toLowerCase().split('-')[0];
        if (SUPPORTED_LANGUAGES.includes(base)) return base;
    }
    return DEFAULT_LANGUAGE;
}

const LANGUAGE = detectLanguage();

// Accepts a plain string or an object like { "en": "...", "de": "..." }
function localize(value) {
    if (!value || typeof value === 'string') return value;
    return value[LANGUAGE] || value[DEFAULT_LANGUAGE] || Object.values(value)[0] || '';
}

// ============================================
// SVG Icons for Social Platforms
// ============================================
const SOCIAL_ICONS = {
    twitter: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    xing: '<svg viewBox="0 0 24 24"><path d="M6.08 4.5c-.25 0-.41.18-.29.43l1.77 3.07c.05.1.05.23 0 .33L4.78 13.1c-.12.25.04.43.29.43h2.62c.39 0 .58-.25.7-.47l2.78-4.79c.06-.1.06-.24 0-.35L9.45 5.02c-.12-.22-.33-.52-.7-.52H6.08zm9.45-4.5c-.39 0-.59.25-.71.47l-5.53 9.6c-.06.1-.06.24 0 .35l3.52 6.1c.12.22.32.48.71.48h2.63c.25 0 .41-.18.29-.43l-3.52-6.13c-.06-.1-.06-.24 0-.35l5.53-9.6c.12-.25-.04-.43-.29-.43h-2.63z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24"><path d="M12.001 1.5c-2.39 0-4.334 1.944-4.334 4.334v1.284c0 .816-.664 1.48-1.48 1.48-.875 0-1.52.551-1.52 1.285 0 .719.614 1.07 1.056 1.263.483.21 1.103.382 1.419.859.305.456.092 1.096-.33 1.391-.638.444-1.401.685-2.16.799-.54.08-.97.48-.97 1.029 0 .642.511 1.037 1.12 1.095 1.195.114 2.35.45 3.369 1.097.675.43 1.034 1.117 1.199 1.889.068.319.35.554.676.554h3.935c.326 0 .608-.235.676-.554.165-.772.524-1.459 1.199-1.889 1.019-.647 2.174-.983 3.369-1.097.609-.058 1.12-.453 1.12-1.095 0-.549-.43-.949-.97-1.029-.759-.114-1.522-.355-2.16-.799-.422-.295-.635-.935-.33-1.391.316-.477.936-.649 1.419-.859.442-.193 1.056-.544 1.056-1.263 0-.734-.645-1.285-1.52-1.285-.816 0-1.48-.664-1.48-1.48V5.834C16.335 3.444 14.391 1.5 12.001 1.5z"/></svg>',
    reddit: '<svg viewBox="0 0 24 24"><path d="M24 12.002c0-1.602-1.298-2.9-2.9-2.9-.78 0-1.49.307-2.02.804-1.66-1.11-3.78-1.81-6.1-1.87l1.25-3.93 3.41.8a2.2 2.2 0 10.23-1.06l-3.94-.93a.8.8 0 00-.96.54l-1.51 4.76c-2.38.04-4.55.74-6.26 1.86a2.88 2.88 0 00-2.01-.81C1.3 9.222 0 10.52 0 12.122c0 1.14.66 2.13 1.62 2.6-.05.27-.08.55-.08.83 0 3.01 3.66 5.45 8.17 5.45 4.51 0 8.17-2.44 8.17-5.45 0-.28-.03-.56-.08-.83A2.89 2.89 0 0024 12.002zM7.5 13.8a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm9 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm-9 2.7c1.04 1 2.7 1.5 4.5 1.5s3.46-.5 4.5-1.5a.6.6 0 10-.84-.86c-.78.75-2.08 1.16-3.66 1.16s-2.88-.41-3.66-1.16a.6.6 0 10-.84.86z"/></svg>',
    discord: '<svg viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>',
    twitch: '<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.82 11.82 0 0012.01 0C5.38 0 0 5.38 0 12c0 2.12.56 4.19 1.63 6.01L0 24l6.18-1.62A11.94 11.94 0 0012.01 24C18.63 24 24 18.62 24 12a11.82 11.82 0 00-3.49-8.52zM12.01 21.6c-1.83 0-3.62-.49-5.19-1.42l-.37-.22-3.67.96.98-3.57-.24-.38A9.56 9.56 0 012.4 12c0-5.3 4.31-9.6 9.61-9.6 2.56 0 4.97 1 6.78 2.81A9.54 9.54 0 0121.6 12c0 5.29-4.3 9.6-9.59 9.6zm5.27-7.2c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.44 1.06 2.84 1.2 3.03.14.19 2.08 3.18 5.03 4.46.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24"><path d="M21.95 2.05a1.2 1.2 0 00-1.25-.22L1.7 9.18a1.2 1.2 0 00.09 2.26l4.9 1.55 1.87 5.93a1.2 1.2 0 001.95.52l3.06-2.74 5.55 4.08a1.2 1.2 0 001.9-.71l2.84-16.7a1.2 1.2 0 00-.91-1.32zM9.1 13.7l-.73 3.17-1.02-3.22 9.73-8.9-7.98 9.95z"/></svg>',
    website: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/></svg>'
};

// ============================================
// DATA MANAGEMENT
// ============================================
function normalizeData(data) {
    const normalized = JSON.parse(JSON.stringify(data || {}));
    if (!normalized.site) normalized.site = {};
    if (!normalized.profile) normalized.profile = {};
    if (!Array.isArray(normalized.socials)) normalized.socials = [];
    if (!Array.isArray(normalized.links)) normalized.links = [];
    return normalized;
}

function getData() {
    return JSON.parse(JSON.stringify(CONFIG_DATA || FALLBACK_DATA));
}

async function loadConfig() {
    try {
        const response = await fetch(CONFIG_PATH, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load config.json');
        return normalizeData(await response.json());
    } catch (err) {
        configLoadFailed = true;
        console.warn('Using fallback config:', err);
        return normalizeData(FALLBACK_DATA);
    }
}

// ============================================
// RENDERING
// ============================================
function applySiteMeta(data) {
    const site = data.site;
    if (site.titleTemplate) {
        document.title = site.titleTemplate.replace(/\{name\}/g, data.profile.name || '');
    }
    setMetaContent('meta[name="description"]', site.description);
    setMetaContent('meta[property="og:title"]', site.ogTitle);
    setMetaContent('meta[property="og:description"]', site.ogDescription);
}

function setMetaContent(selector, value) {
    if (!value) return;
    const meta = document.querySelector(selector);
    if (meta) meta.setAttribute('content', value);
}

function render() {
    const data = getData();
    applySiteMeta(data);
    const container = document.getElementById('mainContainer');
    // Group links by category
    const activeLinks = data.links.filter(l => l.active);
    const categories = {};
    const uncategorized = [];

    activeLinks.forEach(link => {
        if (link.category && link.category.trim()) {
            if (!categories[link.category]) categories[link.category] = [];
            categories[link.category].push(link);
        } else {
            uncategorized.push(link);
        }
    });

    let html = `
        <div class="profile fade-in">
            <div class="avatar-wrapper">
                ${data.profile.avatar
                    ? `<img src="${escapeHtml(data.profile.avatar)}" alt="${escapeHtml(data.profile.name)}" class="avatar" data-avatar="true"><div class="avatar-placeholder is-hidden">${getInitial(data.profile.name)}</div>`
                    : `<div class="avatar-placeholder">${getInitial(data.profile.name)}</div>`
                }
                <div class="status-dot"></div>
            </div>
            <h1 class="profile-name">${escapeHtml(data.profile.name)}</h1>
            ${data.profile.handle ? `<p class="profile-handle">${escapeHtml(data.profile.handle)}</p>` : ''}
            ${data.profile.bio ? `<p class="profile-bio">${escapeHtml(data.profile.bio)}</p>` : ''}
            ${data.profile.location ? `<span class="profile-location">📍 ${escapeHtml(data.profile.location)}</span>` : ''}
        </div>
    `;

    // Social icons
    if (data.socials && data.socials.length > 0) {
        html += '<div class="social-icons fade-in">';
        data.socials.forEach(social => {
            const icon = SOCIAL_ICONS[social.platform] || SOCIAL_ICONS.website;
            html += `<a href="${escapeHtml(social.url)}" class="social-icon" target="_blank" rel="noopener noreferrer" title="${escapeHtml(social.platform)}">${icon}</a>`;
        });
        html += '</div>';
    }

    // Links
    html += '<div class="links-section">';

    // Render categorized links
    const categoryNames = Object.keys(categories);
    categoryNames.forEach(cat => {
        html += `<div class="category-label">${escapeHtml(cat)}</div>`;
        categories[cat].forEach(link => {
            html += renderLinkCard(link);
        });
    });

    // Render uncategorized
    if (uncategorized.length > 0 && categoryNames.length > 0) {
        html += '<div class="category-label">Other</div>';
    }
    uncategorized.forEach(link => {
        html += renderLinkCard(link);
    });

    html += '</div>';

    // Footer
    const footerHtml = data.site && data.site.footerHtml ? data.site.footerHtml : '';
    if (footerHtml) {
        html += `
            <div class="footer fade-in">
                <p class="footer-text">${footerHtml}</p>
            </div>
        `;
    }

    container.innerHTML = html;
    wireAvatarFallbacks(container);
}

function renderLinkCard(link) {
    const description = localize(link.description);
    const languageNote = link.language && link.language !== LANGUAGE
        ? LANGUAGE_NOTES[LANGUAGE][link.language]
        : '';
    return `
        <a href="${escapeHtml(link.url)}" class="link-card fade-in" target="_blank" rel="noopener noreferrer">
            <div class="link-icon">${link.icon || '🔗'}</div>
            <div class="link-content">
                <div class="link-title">${escapeHtml(link.title)}</div>
                ${description ? `<div class="link-description">${escapeHtml(description)}</div>` : ''}
                ${languageNote ? `<span class="link-language">${escapeHtml(languageNote)}</span>` : ''}
            </div>
            <span class="link-arrow">→</span>
        </a>
    `;
}

function wireAvatarFallbacks(container) {
    const avatars = container.querySelectorAll('img.avatar[data-avatar="true"]');
    avatars.forEach((img) => {
        img.addEventListener('error', () => {
            img.classList.add('is-hidden');
            const fallback = img.parentElement ? img.parentElement.querySelector('.avatar-placeholder') : null;
            if (fallback) fallback.classList.remove('is-hidden');
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getInitial(name) {
    return name ? name.charAt(0).toUpperCase() : '?';
}

function showConfigWarning() {
    if (!configLoadFailed) return;
    if (document.querySelector('.config-warning')) return;
    const warning = document.createElement('div');
    warning.className = 'config-warning';
    warning.textContent = 'Config file failed to load. Using defaults. Serve this page from a local web server if you opened it directly.';
    const container = document.getElementById('mainContainer');
    if (container && container.parentNode) {
        container.parentNode.insertBefore(warning, container);
    } else {
        document.body.prepend(warning);
    }
}

// ============================================
// INITIALIZE
// ============================================
async function init() {
    CONFIG_DATA = await loadConfig();
    render();
    showConfigWarning();
}

init();

// Service Worker registration for PWA-like behavior (optional)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    // You can add a service worker for offline support
}
