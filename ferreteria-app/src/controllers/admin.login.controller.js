import jwt from 'jsonwebtoken';

import { CONFIG} from '../config/configuration.js';

const { DUMMY_USER_ADMIN, SECRECT_KEY } = CONFIG;
const userForToken = (data, key, options) => jwt.sign(data, key, options);

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username !== DUMMY_USER_ADMIN.username || password !== DUMMY_USER_ADMIN.password) {
    res.json({
      status: 401,
      OK: false,
      message: 'Credenciales invalidas',
    });
    return;
  }

  const token = userForToken(
    {
      username: DUMMY_USER_ADMIN.username,
      role: 'admin',
    },
    SECRECT_KEY,
    {
      expiresIn: '1d',
    },
  );

  res.json({
    status: 200,
    OK: true,
    token,
    message: 'Login exitoso',
  });
};
