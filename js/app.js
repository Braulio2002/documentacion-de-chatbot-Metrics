// ===== IMPORTS DE MÓDULOS =====
import { Navigation } from './modules/navigation.js';
import { Diagram } from './modules/diagram.js';
import { Accordion } from './modules/accordion.js';
import { Tabs } from './modules/tabs.js';
import { Charts } from './modules/charts.js';
import { PATTERNS_DATA } from './data/patterns.js';
import { DB_SCHEMA_DATA } from './data/database.js';
import { CONFIG, EVENTS } from './config/constants.js';

// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class ChatbotDocumentation {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        this.initModules();
        this.bindGlobalEvents();
        this.initThreeJSBackground();
        console.log('✅ Documentación del Chatbot IA inicializada correctamente');
    }

    initModules() {
        // Inicializar módulo de navegación
        this.modules.navigation = new Navigation();
        
        // Inicializar módulo de diagrama
        this.modules.diagram = new Diagram();
        
        // Inicializar módulo de acordeones
        this.modules.accordion = new Accordion('patterns-accordion', PATTERNS_DATA);
        
        // Inicializar módulo de pestañas
        this.modules.tabs = new Tabs('db-tabs', 'db-content', DB_SCHEMA_DATA);
        
        // Inicializar módulo de gráficos
        this.modules.charts = new Charts();
    }

    initThreeJSBackground() {
        // Inicializar el fondo 3D con Three.js
        if (typeof THREE !== 'undefined') {
            try {
                // Importar dinámicamente el módulo Three.js
                import('./threejs-background.js').then(() => {
                    console.log('🎨 Fondo 3D Three.js inicializado');
                }).catch(error => {
                    console.warn('⚠️ No se pudo cargar el fondo 3D:', error);
                });
            } catch (error) {
                console.warn('⚠️ Three.js no está disponible:', error);
            }
        } else {
            console.warn('⚠️ Three.js no está cargado');
        }
    }

    bindGlobalEvents() {
        // Escuchar cambios en el hash de la URL
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (CONFIG.sections.includes(hash)) {
                this.modules.navigation.navigateTo(hash);
            }
        });

        // Escuchar teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                this.handleKeyboardShortcuts(e);
            }
        });

        // Escuchar eventos personalizados
        document.addEventListener(EVENTS.TAB_CHANGE, (e) => {
            console.log('Tab cambiada:', e.detail.tabKey);
        });
    }

    handleKeyboardShortcuts(e) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                this.modules.navigation.navigateTo('overview');
                break;
            case '2':
                e.preventDefault();
                this.modules.navigation.navigateTo('architecture');
                break;
            case '3':
                e.preventDefault();
                this.modules.navigation.navigateTo('implementation');
                break;
            case '4':
                e.preventDefault();
                this.modules.navigation.navigateTo('usage');
                break;
        }
    }

    // Métodos públicos para acceder a los módulos
    getNavigation() {
        return this.modules.navigation;
    }

    getDiagram() {
        return this.modules.diagram;
    }

    getAccordion() {
        return this.modules.accordion;
    }

    getTabs() {
        return this.modules.tabs;
    }

    getCharts() {
        return this.modules.charts;
    }
}

// ===== INICIALIZACIÓN GLOBAL =====
let app;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si Chart.js está disponible
    if (typeof Chart === 'undefined') {
        console.warn('⚠️ Chart.js no está cargado. Los gráficos no se mostrarán.');
    }
    
    // Inicializar la aplicación
    app = new ChatbotDocumentation();
});

// ===== EXPOSICIÓN GLOBAL (opcional, para debugging) =====
if (typeof window !== 'undefined') {
    window.ChatbotDocumentation = ChatbotDocumentation;
    window.app = app;
} 