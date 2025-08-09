// ===== MÓDULO DE DIAGRAMA INTERACTIVO =====
export class Diagram {
    constructor() {
        this.nodes = [];
        this.infoElement = null;
        this.init();
    }

    init() {
        this.infoElement = document.getElementById('diagram-info');
        this.nodes = document.querySelectorAll('.diagram-node');
        this.bindEvents();
    }

    bindEvents() {
        this.nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                this.showNodeInfo(node);
                this.highlightNode(node);
            });

            node.addEventListener('mouseleave', () => {
                this.hideNodeInfo();
                this.removeHighlight(node);
            });

            // Opcional: Click para mantener el highlight
            node.addEventListener('click', () => {
                this.toggleNodeHighlight(node);
            });
        });
    }

    showNodeInfo(node) {
        if (!this.infoElement) return;
        
        const info = node.dataset.info || 'Información no disponible';
        this.infoElement.textContent = info;
        this.infoElement.style.opacity = '1';
    }

    hideNodeInfo() {
        if (!this.infoElement) return;
        
        this.infoElement.textContent = 'Pase el cursor sobre un nodo para ver su descripción.';
        this.infoElement.style.opacity = '0.7';
    }

    highlightNode(node) {
        node.classList.add('highlight');
        // Agregar efecto de sombra
        node.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.4)';
        node.style.borderColor = '#0ea5e9';
    }

    removeHighlight(node) {
        node.classList.remove('highlight');
        // Remover efecto de sombra
        node.style.boxShadow = '';
        node.style.borderColor = '';
    }

    toggleNodeHighlight(node) {
        const isHighlighted = node.classList.contains('highlight');
        
        // Remover highlight de todos los nodos
        this.nodes.forEach(n => this.removeHighlight(n));
        
        if (!isHighlighted) {
            this.highlightNode(node);
            this.showNodeInfo(node);
        }
    }

    // Método para agregar un nuevo nodo dinámicamente
    addNode(nodeData) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'diagram-node';
        nodeElement.dataset.info = nodeData.info;
        nodeElement.textContent = nodeData.text;
        
        // Agregar al contenedor
        const container = document.querySelector('.diagram-grid');
        if (container) {
            container.appendChild(nodeElement);
            this.nodes.push(nodeElement);
            this.bindNodeEvents(nodeElement);
        }
    }

    bindNodeEvents(nodeElement) {
        nodeElement.addEventListener('mouseenter', () => {
            this.showNodeInfo(nodeElement);
            this.highlightNode(nodeElement);
        });

        nodeElement.addEventListener('mouseleave', () => {
            this.hideNodeInfo();
            this.removeHighlight(nodeElement);
        });
    }

    // Método para obtener información de un nodo
    getNodeInfo(nodeId) {
        const node = Array.from(this.nodes).find(n => n.id === nodeId);
        return node ? node.dataset.info : null;
    }

    // Método para actualizar información de un nodo
    updateNodeInfo(nodeId, newInfo) {
        const node = Array.from(this.nodes).find(n => n.id === nodeId);
        if (node) {
            node.dataset.info = newInfo;
        }
    }
} 