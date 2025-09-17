const API_KEY = process.env.API_KEY || 'KEY-UNIVERSIDAD-2024';

export const apiKeyMiddleware = (req, res, next) => {
    const key = req.headers['x-api-key'] || req.query.api_key;

    if (key !== API_KEY) {
        return res.status(403).json({
            error: 'Acceso denegado',
            solucion: `Enviar API Key válida en header 'x-api-key'`
        });
    }
    next();
};
