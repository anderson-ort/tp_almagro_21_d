import { getToken } from "../auth/getToken.js";
import { validateToken } from "../auth/validateToken.js";

export const authenticateToken = async (request, response, next) => {
    try {
        // Leer el token del header Authorization
        const token = getToken(request)

        if (!token) {
            return response.status(401).json({ message: "Token missing" });
        }

        const { isValid } = await validateToken(token);

        if (!isValid) {
            return response.status(403).json({ message: "Invalid or expired token" });
        }

        next();
        
    } catch (err) {
        console.error("Auth-Middleware error:", err);
        return response.status(500).json({ message: "Internal server error" });
    }
};
