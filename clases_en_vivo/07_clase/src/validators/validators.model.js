const validateEmail = (email, blockedDomains = ["yahoo", "netscape", "river"]) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // guard clauses

    if (!emailRegex.test(email)) {
        return { valid: false, message: "Formato de email inválido." };
    }

    const domain = email.split("@")[1].toLowerCase();

    const isBlocked = blockedDomains.some((blocked) =>
        domain.includes(blocked)
    );

    if (isBlocked) {
        return { valid: false, message: `No se permiten cuentas de ${domain}.` };
    }

    return { valid: true, message: "Email válido." };
};



export const validateName = (name) => {
    if (!name || name.trim() === "") {
        return { valid: false, message: "El nombre no puede estar vacía." };
    }
    return { valid: true, message: "Nombre válido." };
}

export const validateCategory = (category, blockedCategories = ["adultos", "japones", "griego"]) => {
    if (!category || category.trim() === "") {
        return { valid: false, message: "La categoría no puede estar vacía." };
    }

    const normalized = category
        .toLowerCase()
        .normalize("NFD") // separa acentos
        .replace(/[\u0300-\u036f]/g, ""); // elimina acentos


    const isBlocked = blockedCategories.some((blocked) =>
        normalized.includes(blocked)
    );

    if (isBlocked) {
        return { valid: false, message: `La categoría "${category}" no está permitida.` };
    }

    return { valid: true, message: "Categoría válida." };
};
