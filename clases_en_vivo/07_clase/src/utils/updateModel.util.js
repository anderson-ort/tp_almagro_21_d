export const updateModel = (model, data) => {
    const updatedModel = { ...model };

    for (const key in data) {
        // Verificamos que el campo exista en el modelo
        if (Object.hasOwn(updatedModel, key)) {
            const value = data[key];

            // Solo actualizamos si el valor no es null, undefined ni ""
            if (value !== null && value !== undefined && value !== "") {
                updatedModel[key] = value;
            }
        }
    }

    return updatedModel;
};
