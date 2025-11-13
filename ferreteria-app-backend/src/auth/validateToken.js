import DatabaseFactory from "../databases/DatabaseFactory.js";
import SupaBaseConnection from "../databases/supabase.cnx.js";


const supabase = SupaBaseConnection.connect()


export const validateToken = async (token) => {
    try {

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return { isValid: false };
        }


        return { isValid: true };

    } catch (error) {
        return { isValid: false };
    }
};