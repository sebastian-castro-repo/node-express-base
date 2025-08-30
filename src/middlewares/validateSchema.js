import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export function validateSchema(schema) {
    const validate = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validate(req.body);
        if (!valid) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: validate.errors.map(err => ({
                    field: err.instancePath || err.params.missingProperty,
                    message: err.message
                }))
            });
        }
        next();
    };
}
