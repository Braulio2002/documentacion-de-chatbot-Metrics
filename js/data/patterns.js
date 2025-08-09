// ===== DATOS DE PATRONES DE DISEÑO =====
export const PATTERNS_DATA = [
    {
        title: 'Singleton Pattern',
        content: 'Asegura que una clase solo tenga una instancia y proporciona un punto de acceso global a ella. Usado en `ConfigurationService.gs` para gestionar la configuración de forma centralizada.'
    },
    {
        title: 'Repository Pattern',
        content: 'Abstrae la capa de acceso a datos, desacoplando la lógica de negocio de la implementación del almacenamiento. Usado en `SheetsRepository.gs` para centralizar el acceso a los datos de Google Sheets.'
    },
    {
        title: 'Strategy Pattern',
        content: 'Define una familia de algoritmos, encapsula cada uno y los hace intercambiables. Usado en `AnalyticsService.gs` para permitir diferentes tipos de análisis (CPA, Tendencias, etc.) de forma flexible.'
    },
    {
        title: 'Facade Pattern',
        content: 'Proporciona una interfaz unificada y simplificada a un conjunto de interfaces en un subsistema. Usado en `Code.gs` para ofrecer funciones simples que orquestan operaciones complejas.'
    },
    {
        title: 'SOLID: Single Responsibility',
        content: 'Cada archivo/módulo tiene una única responsabilidad. Por ejemplo, `GeminiService.gs` solo se comunica con la API de Gemini.'
    },
    {
        title: 'SOLID: Open/Closed',
        content: 'El sistema está abierto a extensiones pero cerrado a modificaciones. Se pueden registrar nuevos analizadores sin cambiar el código del `AnalyzerRegistry`.'
    }
]; 