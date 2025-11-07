export const generateToken = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.session) {
            return { token: null, user: null, error: error || new Error('Error al generar token') };
        }

        return {
            token: data.session.access_token,
            user: data.user,
            error: null
        };
    } catch (error) {
        return { token: null, user: null, error };
    }
};