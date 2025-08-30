export const RegisterRequest = {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
        name: { type: "string"},
        email: { type: "string"},
        password: { type: "string"}
    }
};

export const RegisterResponse = {
    type: "object",
    properties: {
        message: {type: "string"},
        user: {
            type: "object",
            properties: {
                id: {type: "integer"},
                name: {type: "string"},
                email: {type: "string"}
            }
        }
    }
};

export const LoginRequest = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" }
    }
};

export const LoginResponse = {
    type: "object",
    properties: {
        message: { type: "string" },
        token: { type: "string", description: "JWT de sesión" },
        user: {
            type: "object",
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" }
            }
        }
    }
};

