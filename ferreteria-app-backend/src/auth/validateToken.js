export const validateToken = async (token) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return { user: null, error: error || new Error('Usuario no encontrado') };
        }

        return { user, error: null };
    } catch (error) {
        return { user: null, error };
    }
};