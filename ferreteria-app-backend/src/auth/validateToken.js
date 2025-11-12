import DatabaseFactory from "../databases/DatabaseFactory.js";
import SupaBaseConnection from "../databases/supabase.cnx.js";


const supabase = SupaBaseConnection.connect()


export const validateToken = async (token) => {
    try {
        
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return { user: null, error: error || new Error('Usuario no encontrado'), isValid: false };
        }


        return { user, error: null, isValid: true };
    
    } catch (error) {
        return { user: null, error, isValid: false };
    }
};