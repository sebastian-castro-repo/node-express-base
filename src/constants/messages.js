export const ERROR_MESSAGES = {
    AUTH: {
        EMAIL_ALREADY_EXISTS: "El email ya está registrado",
        INVALID_CREDENTIALS: "Credenciales inválidas",
        TOKEN_REQUIRED: "Token requerido",
        TOKEN_INVALID: "Token no válido o expirado"
    },
    USER: {
        NOT_FOUND: "Usuario no encontrado",
        CREATION_FAILED: "No se pudo crear el usuario",
        UPDATE_FAILED: "No se pudo actualizar el usuario",
        DELETE_FAILED: "No se pudo eliminar el usuario"
    },
    SERVER: {
        INTERNAL_ERROR: "Error interno del servidor"
    }
};

export const SUCCESS_MESSAGES = {
    AUTH: {
        REGISTER: "Usuario creado correctamente",
        LOGIN: "Login exitoso"
    },
    USER: {
        CREATED: "Usuario creado",
        UPDATED: "Usuario actualizado",
        DELETED: "Usuario eliminado"
    }
};
