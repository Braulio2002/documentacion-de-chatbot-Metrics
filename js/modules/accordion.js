// ===== MÓDULO DE ACORDEONES =====
export class Accordion {
    constructor(containerId, data = []) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.items = [];
        this.init();
    }

    init() {
        if (!this.container) {
            console.warn(`Contenedor ${containerId} no encontrado`);
            return;
        }

        this.renderItems();
        this.bindEvents();
    }

    renderItems() {
        this.container.innerHTML = '';
        this.items = [];

        this.data.forEach((item, index) => {
            const accordionItem = this.createItem(item, index);
            this.container.appendChild(accordionItem);
            this.items.push(accordionItem);
        });
    }

    createItem(item, index) {
        const div = document.createElement('div');
        div.className = 'accordion-item';
        div.innerHTML = `
            <button class="accordion-toggle" data-index="${index}">
                <span class="font-semibold">${item.title}</span>
                <span class="accordion-arrow">▼</span>
            </button>
            <div class="accordion-content">
                <p>${item.content}</p>
            </div>
        `;
        return div;
    }

    bindEvents() {
        const toggles = this.container.querySelectorAll('.accordion-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.toggleItem(toggle);
            });
        });
    }

    toggleItem(toggle) {
        const content = toggle.nextElementSibling;
        const arrow = toggle.querySelector('.accordion-arrow');
        
        if (content.classList.contains('active')) {
            this.closeItem(content, arrow);
        } else {
            // Cerrar otros items
            this.closeAllItems();
            
            // Abrir el item actual
            this.openItem(content, arrow);
        }
    }

    openItem(content, arrow) {
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = 'rotate(180deg)';
    }

    closeItem(content, arrow) {
        content.classList.remove('active');
        content.style.maxHeight = null;
        arrow.style.transform = 'rotate(0deg)';
    }

    closeAllItems() {
        document.querySelectorAll('.accordion-content').forEach(content => {
            content.classList.remove('active');
            content.style.maxHeight = null;
        });
        document.querySelectorAll('.accordion-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }

    // Método para agregar un nuevo item
    addItem(item) {
        this.data.push(item);
        const newItem = this.createItem(item, this.data.length - 1);
        this.container.appendChild(newItem);
        this.items.push(newItem);
        
        // Rebind events para el nuevo item
        const toggle = newItem.querySelector('.accordion-toggle');
        toggle.addEventListener('click', () => {
            this.toggleItem(toggle);
        });
    }

    // Método para remover un item
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.data.splice(index, 1);
            this.items[index].remove();
            this.items.splice(index, 1);
            
            // Reindexar los items restantes
            this.items.forEach((item, newIndex) => {
                const toggle = item.querySelector('.accordion-toggle');
                toggle.dataset.index = newIndex;
            });
        }
    }

    // Método para actualizar un item
    updateItem(index, newData) {
        if (index >= 0 && index < this.items.length) {
            this.data[index] = newData;
            const newItem = this.createItem(newData, index);
            
            // Reemplazar el item existente
            this.items[index].replaceWith(newItem);
            this.items[index] = newItem;
            
            // Rebind events
            const toggle = newItem.querySelector('.accordion-toggle');
            toggle.addEventListener('click', () => {
                this.toggleItem(toggle);
            });
        }
    }

    // Método para obtener todos los items abiertos
    getOpenItems() {
        const openItems = [];
        this.items.forEach((item, index) => {
            const content = item.querySelector('.accordion-content');
            if (content.classList.contains('active')) {
                openItems.push(index);
            }
        });
        return openItems;
    }

    // Método para abrir un item específico
    openItemByIndex(index) {
        if (index >= 0 && index < this.items.length) {
            const item = this.items[index];
            const toggle = item.querySelector('.accordion-toggle');
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('.accordion-arrow');
            
            this.closeAllItems();
            this.openItem(content, arrow);
        }
    }
} 