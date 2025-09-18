const API_KEY = 'empanada-secret';

export const apikeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] ?? req.query.api_key;

  if (apiKey !== API_KEY) {
    res.json({
      status: 403,
      OK: false,
      message: 'No tienes permisos para acceder a este recurso',
    });
    return;
  }

  next();
  return;
};
