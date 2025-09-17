import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || 'claveSuperSecreta';

const LOCAL_USER = {
    name: "Bruce",
    apellido: "Willis",
    password: "clave-segura",
    rol: "actor",
    curso: "NodeJS Backend",
    preferencias: ["oscuro", "UTM-3"]
}

const userToken = (data, key, options) => jwt.sign(data, key, options);

export const generateToken = (req, res) => {
    
    const { usuario, clave } = req.body;
    
    console.log();

    const { name: USER, password: PWD } = LOCAL_USER

    if (usuario === USER && clave === PWD) {
        const token = userToken(
            { rol: LOCAL_USER.rol, curso: LOCAL_USER.curso, preferencias: LOCAL_USER.preferencias },
            SECRET_KEY,
            { expiresIn: 1 * 60 }
        );
        return res.json({ token });
    }

    res.status(401).json({ error: 'Credenciales inválidas' });
}



export const validateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // guarda el payload del token para usar después
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}
