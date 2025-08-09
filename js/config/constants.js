// ===== CONFIGURACIÓN Y CONSTANTES =====
export const CONFIG = {
    sections: ['overview', 'architecture', 'implementation', 'usage'],
    defaultSection: 'overview',
    theme: {
        primaryColor: '#0ea5e9',
        primaryLight: '#38bdf8',
        primaryDark: '#0284c7',
        slate50: '#f8fafc',
        slate100: '#f1f5f9',
        slate200: '#e2e8f0',
        slate300: '#cbd5e1',
        slate400: '#94a3b8',
        slate500: '#64748b',
        slate600: '#475569',
        slate700: '#334155',
        slate800: '#1e293b',
        slate900: '#0f172a',
        white: '#ffffff'
    },
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
    },
    animations: {
        duration: 0.3,
        easing: 'ease-in-out'
    }
};

export const EVENTS = {
    TAB_CHANGE: 'tabChange',
    SECTION_CHANGE: 'sectionChange',
    CHART_UPDATE: 'chartUpdate'
};

export const SELECTORS = {
    NAV_LINKS: '.nav-link',
    CONTENT_SECTIONS: '.content-section',
    DIAGRAM_NODES: '.diagram-node',
    ACCORDION_TOGGLES: '.accordion-toggle',
    TAB_BUTTONS: '.tab-button'
}; 