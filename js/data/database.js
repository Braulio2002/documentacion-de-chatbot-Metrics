// ===== ESQUEMAS DE BASE DE DATOS =====
export const DB_SCHEMA_DATA = {
    _ChatHistory: [
        { col: 'ID', desc: 'UUID único de la conversación.' },
        { col: 'Timestamp', desc: 'Fecha y hora del mensaje.' },
        { col: 'UserEmail', desc: 'Email del usuario que realiza la consulta.' },
        { col: 'UserMessage', desc: 'El mensaje exacto del usuario.' },
        { col: 'BotResponse', desc: 'La respuesta generada por el bot.' },
        { col: 'TokensUsed', desc: 'Cantidad de tokens de Gemini consumidos.' }
    ],
    _Sessions: [
        { col: 'SessionID', desc: 'UUID único de la sesión de usuario.' },
        { col: 'UserID', desc: 'Identificador del usuario.' },
        { col: 'StartTime', desc: 'Fecha y hora de inicio de la sesión.' },
        { col: 'EndTime', desc: 'Fecha y hora de fin de la sesión.' },
        { col: 'MessagesCount', desc: 'Número de mensajes en la sesión.' }
    ],
    _Analytics: [
        { col: 'Date', desc: 'Fecha del registro de la métrica.' },
        { col: 'TotalQueries', desc: 'Número total de consultas en esa fecha.' },
        { col: 'AvgResponseTime', desc: 'Tiempo de respuesta promedio en milisegundos.' },
        { col: 'ErrorRate', desc: 'Porcentaje de consultas que resultaron en error.' }
    ],
    _KnowledgeBase: [
        { col: 'ID', desc: 'Identificador único de la entrada.' },
        { col: 'Pattern', desc: 'Patrón de pregunta o intención.' },
        { col: 'Response', desc: 'Respuesta predefinida o sugerida.' },
        { col: 'Frequency', desc: 'Frecuencia con la que se ha usado esta entrada.' },
        { col: 'Effectiveness', desc: 'Puntuación de efectividad basada en el feedback.' }
    ]
}; 