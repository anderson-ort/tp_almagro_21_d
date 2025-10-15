import { supabase } from "../databases/supabase.cnx.js"

export const SupabaseRepository = {

    getAll: async () => {

        let { data: book, error } = await supabase
            .from('book')
            .select('*')


        if (error) {
            return error.code
        }


        return { data: book }
    },

    createOne: async (book) => {

        const { data, error } = await supabase
            .from('book')
            .insert([book])
            .select()

        if (error) {
            return error.code
        }
        console.log(data);

        return { data }

    }

}