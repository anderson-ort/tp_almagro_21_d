import DatabaseFactory from "../databases/DatabaseFactory.js";

const AppStatus = {

    welcome:
        async (req, res) => {
            res.json({
                service: "Ferreteria-App  API",
                version: "1.0.0",
                status: "operational",
                description: "Sistema de gestión inteligente de productos",
                capabilities: {
                    database: "Multi-database architecture (Supabase + MongoDB)",
                    documentation: "Interactive API documentation"
                },
                links: {
                    docs: `${req.protocol}://${req.get('host')}/api-docs`,
                    health: `${req.protocol}://${req.get('host')}/health`,
                    repository: "https://github.com/tu-usuario/tu-repo" // despues veremos donde lo guardamos
                },
                timestamp: new Date().toISOString()
            });

        },
    healtCheck:
        async (req, res) => {

            const mongoose = DatabaseFactory.getConnection()

            const isMongoConnected = await mongoose?.readyState === 1;

            res.status(isMongoConnected ? 200 : 503).json({
                status: isMongoConnected ? 'healthy' : 'degraded',
                databases: {
                    mongodb: isMongoConnected ? 'connected' : 'disconnected',
                    supabase: 'ok'
                }
            });

        }
}

export default AppStatus