export const testMiddleware = (req, res, next) => {
  console.log('request body', req.body);

  if (req.body.validacion == 'empanada') {
    console.log('Santuisena correcta');
    next();
    return;
  }

  res.json({
    status: 400,
    OK: false,
    message: 'Falta la validacion de empanada',
  });
};
