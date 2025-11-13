import DatabaseFactory from "../databases/DatabaseFactory.js";
import SupaBaseConnection from "../databases/supabase.cnx.js";

const supabase = SupaBaseConnection.connect()


export const ApiUserController = {
    signup: async (request, response) => {

        const { email, password } = request.body;

        if (!email || !password)
            return response.status(400).json({ message: "Email and password required" });

        try {

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return response.status(400).json({ message: error.message });
            }

            // + session (with JWT if auto-confirmed)
            const token = data.session?.access_token;

            return response.status(201).json({
                message: `El usuario ${data.user.email} se ha dado de alta en: Ferreteria-App`,
                user: data.user.email,
                token,
            });

        } catch (err) {
            console.error("Signup error:", err);
            return response.status(500).json({ message: "Internal server error" });
        }
    },

    login: async (request, response) => {

        const { email, password } = request.body;

        if (!email || !password)
            return response.status(400).json({ message: "Email and password required" });

        try {
            // sign in with Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return request.status(401).json({ message: error.message });
            }

            const token = data.session?.access_token;

            return response.status(200).json({
                message: `Bienvenido ${data.user.email}`,
                user: data.user.email,
                role: data.user.role,
                token
            });
        } catch (err) {
            console.error("Login error:", err);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

}