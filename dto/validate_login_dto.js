import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import Ajv from "ajv";

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El kind del email debe ser un string",
        format: "El email debe contener un correo válido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El kind del password debe ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  //isDTOValid es un boolean

  if (!isDTOValid)
    res.status(400).send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateLoginDTO;
