// ===== MÓDULO DE GRÁFICOS =====
export class Charts {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    init() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no está cargado. Los gráficos no se mostrarán.');
            return;
        }

        this.initKpiChart();
    }

    initKpiChart() {
        const canvas = document.getElementById('kpiChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tiempo de Respuesta (ms)', 'Precisión de Respuestas (%)', 'Tasa de Aciertos de Caché (%)'],
                datasets: [{
                    label: 'Valor Actual',
                    data: [1800, 96.5, 75],
                    backgroundColor: ['#38bdf8', '#38bdf8', '#38bdf8'],
                    borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9'],
                    borderWidth: 1
                }, {
                    label: 'Objetivo',
                    data: [2000, 95, 70],
                    backgroundColor: ['#e2e8f0', '#e2e8f0', '#e2e8f0'],
                    borderColor: ['#94a3b8', '#94a3b8', '#94a3b8'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'KPIs del Sistema vs. Objetivos'
                    }
                }
            }
        });

        this.charts.set('kpiChart', chart);
    }

    // Método para crear un gráfico personalizado
    createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas con ID ${canvasId} no encontrado`);
            return null;
        }

        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        
        return chart;
    }

    // Método para actualizar datos de un gráfico
    updateChartData(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.data = newData;
            chart.update();
        } else {
            console.warn(`Gráfico con ID ${chartId} no encontrado`);
        }
    }

    // Método para actualizar solo los datos de un gráfico
    updateChartDataset(chartId, datasetIndex, newData) {
        const chart = this.charts.get(chartId);
        const dataset = chart?.data?.datasets?.[datasetIndex];
        if (dataset) {
            dataset.data = newData;
            chart.update();
        } else {
            console.warn(`Gráfico o dataset no encontrado`);
        }
    }

    // Método para cambiar el tipo de gráfico
    changeChartType(chartId, newType) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.config.type = newType;
            chart.update();
        } else {
            console.warn(`Gráfico con ID ${chartId} no encontrado`);
        }
    }

    // Método para destruir un gráfico
    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.destroy();
            this.charts.delete(chartId);
        }
    }

    // Método para obtener un gráfico específico
    getChart(chartId) {
        return this.charts.get(chartId);
    }

    // Método para obtener todos los gráficos
    getAllCharts() {
        return Array.from(this.charts.values());
    }

    // Método para redimensionar todos los gráficos
    resizeAllCharts() {
        this.charts.forEach(chart => {
            chart.resize();
        });
    }

    // Método para crear un gráfico de línea
    createLineChart(canvasId, labels, datasets, options = {}) {
        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: { ...defaultOptions, ...options }
        };

        return this.createChart(canvasId, config);
    }

    // Método para crear un gráfico de pastel
    createPieChart(canvasId, labels, data, options = {}) {
        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        };

        const config = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#38bdf8',
                        '#0ea5e9',
                        '#0284c7',
                        '#0369a1',
                        '#075985'
                    ]
                }]
            },
            options: { ...defaultOptions, ...options }
        };

        return this.createChart(canvasId, config);
    }

    // Método para crear un gráfico de barras
    createBarChart(canvasId, labels, datasets, options = {}) {
        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: { ...defaultOptions, ...options }
        };

        return this.createChart(canvasId, config);
    }
} 