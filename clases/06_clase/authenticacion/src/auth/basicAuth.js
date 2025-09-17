import basicAuth from 'basic-auth';

const VALID_USER = process.env.BASIC_USER || 'admin';
const VALID_PASS = process.env.BASIC_PASS || 'admin123';

export const authMiddleware=(req, res, next) =>{
    const user = basicAuth(req);
    
    console.log(user);
    
    const validUser = user
        && user.name === VALID_USER
        && user.pass === VALID_PASS;

    if (!validUser) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }

    console.log("pasamos bien :D")
    next();
}




