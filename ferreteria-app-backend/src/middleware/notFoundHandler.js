const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `El endpoint ${req.method} ${req.url} no existe`,
        timestamp: new Date().toISOString()
    });
};

export default notFoundHandler