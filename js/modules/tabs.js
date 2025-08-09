// ===== MÓDULO DE PESTAÑAS =====
export class Tabs {
    constructor(tabsContainerId, contentContainerId, data = {}) {
        this.tabsContainer = document.getElementById(tabsContainerId);
        this.contentContainer = document.getElementById(contentContainerId);
        this.data = data;
        this.tabs = [];
        this.currentTab = null;
        this.init();
    }

    init() {
        if (!this.tabsContainer || !this.contentContainer) {
            console.warn('Contenedores de pestañas no encontrados');
            return;
        }

        this.renderTabs();
        this.bindEvents();
        
        // Mostrar la primera pestaña por defecto
        const firstTabKey = Object.keys(this.data)[0];
        if (firstTabKey) {
            this.switchTab(firstTabKey);
        }
    }

    renderTabs() {
        this.tabsContainer.innerHTML = '';
        this.tabs = [];

        Object.keys(this.data).forEach((key, index) => {
            const button = this.createTabButton(key, index === 0);
            this.tabsContainer.appendChild(button);
            this.tabs.push(button);
        });
    }

    createTabButton(key, isActive = false) {
        const button = document.createElement('a');
        button.href = '#';
        button.textContent = key;
        button.className = `tab-button ${isActive ? 'active' : ''}`;
        button.dataset.tabKey = key;
        
        return button;
    }

    bindEvents() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabKey = tab.dataset.tabKey;
                this.switchTab(tabKey);
            });
        });
    }

    switchTab(tabKey) {
        if (!this.data[tabKey]) {
            console.warn(`Pestaña ${tabKey} no encontrada`);
            return;
        }

        // Actualizar pestañas
        this.updateTabButtons(tabKey);
        
        // Actualizar contenido
        this.renderContent(tabKey);
        
        // Actualizar estado
        this.currentTab = tabKey;
        
        // Disparar evento personalizado
        this.dispatchTabChangeEvent(tabKey);
    }

    updateTabButtons(activeTabKey) {
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tabKey === activeTabKey) {
                tab.classList.add('active');
            }
        });
    }

    renderContent(tabKey) {
        const data = this.data[tabKey];
        if (!data || !Array.isArray(data)) {
            this.contentContainer.innerHTML = '<p>No hay datos disponibles</p>';
            return;
        }

        let tableHtml = `
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Columna</th>
                            <th scope="col">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.forEach(row => {
            tableHtml += `
                <tr>
                    <td class="font-medium">${row.col}</td>
                    <td>${row.desc}</td>
                </tr>
            `;
        });

        tableHtml += '</tbody></table></div>';
        this.contentContainer.innerHTML = tableHtml;
    }

    dispatchTabChangeEvent(tabKey) {
        const event = new CustomEvent('tabChange', {
            detail: {
                tabKey: tabKey,
                data: this.data[tabKey]
            }
        });
        document.dispatchEvent(event);
    }

    // Método para agregar una nueva pestaña
    addTab(key, data) {
        this.data[key] = data;
        const button = this.createTabButton(key, false);
        this.tabsContainer.appendChild(button);
        this.tabs.push(button);
        
        // Rebind events para la nueva pestaña
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab(key);
        });
    }

    // Método para remover una pestaña
    removeTab(key) {
        if (this.data[key]) {
            delete this.data[key];
            
            // Remover el botón de la pestaña
            const tabButton = this.tabs.find(tab => tab.dataset.tabKey === key);
            if (tabButton) {
                tabButton.remove();
                this.tabs = this.tabs.filter(tab => tab.dataset.tabKey !== key);
            }
            
            // Si era la pestaña actual, cambiar a la primera disponible
            if (this.currentTab === key) {
                const firstTabKey = Object.keys(this.data)[0];
                if (firstTabKey) {
                    this.switchTab(firstTabKey);
                } else {
                    this.contentContainer.innerHTML = '<p>No hay pestañas disponibles</p>';
                    this.currentTab = null;
                }
            }
        }
    }

    // Método para actualizar datos de una pestaña
    updateTabData(key, newData) {
        if (this.data[key]) {
            this.data[key] = newData;
            
            // Si es la pestaña actual, re-renderizar contenido
            if (this.currentTab === key) {
                this.renderContent(key);
            }
        }
    }

    // Método para obtener la pestaña actual
    getCurrentTab() {
        return this.currentTab;
    }

    // Método para obtener datos de una pestaña específica
    getTabData(key) {
        return this.data[key] || null;
    }

    // Método para obtener todas las claves de pestañas
    getTabKeys() {
        return Object.keys(this.data);
    }

    // Método para cambiar a una pestaña específica
    goToTab(key) {
        this.switchTab(key);
    }

    // Método para obtener el número total de pestañas
    getTabCount() {
        return Object.keys(this.data).length;
    }
} 