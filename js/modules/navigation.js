// ===== MÓDULO DE NAVEGACIÓN =====
export class Navigation {
    constructor() {
        this.currentSection = 'overview';
        this.sections = ['overview', 'architecture', 'implementation', 'usage'];
        this.init();
    }

    init() {
        this.bindNavEvents();
        this.handleInitialRoute();
    }

    bindNavEvents() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.switchSection(targetId);
            });
        });
    }

    switchSection(sectionId) {
        if (!this.sections.includes(sectionId)) {
            console.warn(`Sección ${sectionId} no encontrada`);
            return;
        }

        // Actualizar navegación
        this.updateNavLinks(sectionId);
        
        // Mostrar sección
        this.showSection(sectionId);
        
        // Actualizar estado
        this.currentSection = sectionId;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
        
        // Actualizar URL
        this.updateURL(sectionId);
    }

    updateNavLinks(activeSectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    }

    updateURL(sectionId) {
        const newURL = `${window.location.pathname}#${sectionId}`;
        window.history.pushState({ section: sectionId }, '', newURL);
    }

    handleInitialRoute() {
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.includes(hash)) {
            this.switchSection(hash);
        } else {
            this.switchSection(this.currentSection);
        }
    }

    // Método público para cambiar sección desde otros módulos
    navigateTo(sectionId) {
        this.switchSection(sectionId);
    }

    // Getter para obtener la sección actual
    getCurrentSection() {
        return this.currentSection;
    }
} 