

export default AppStatus = {

    welcome:
        (req, res) => {
            res.json({
                service: "Ferretería Smart API",
                version: "1.0.0",
                status: "operational",
                description: "Sistema de gestión inteligente de productos de ferretería con capacidades de búsqueda semántica",
                capabilities: {
                    database: "Multi-database architecture (Supabase + MongoDB)",
                    search: "Context-based similarity search",
                    automation: "Automatic embedding generation",
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
        (req, res) => {
            const isMongoConnected = mongoose.connection.readyState === 1;

            res.status(isMongoConnected ? 200 : 503).json({
                status: isMongoConnected ? 'healthy' : 'degraded',
                databases: {
                    mongodb: isMongoConnected ? 'connected' : 'disconnected',
                    supabase: 'ok'
                }
            });

        }
    }