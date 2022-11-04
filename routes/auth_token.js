import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import validateLoginDTO from "../dto/validate_login_DTO.js";

const authTokenRouter = Router();

authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPwd(email, password);

    //SE INTRODUCE EL PAYLOAD {guid}
    const jwtConstructor = new SignJWT({ guid });

    const encoder = new TextEncoder();

    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Solicitud autenticidad del token para obtener el perfil del usuario
authTokenRouter.get("/profile", async (req, res) => {
  //Obtener cabecera del token
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    const user = USERS_BBDD.find((user) => user.guid === payload.guid);

    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authTokenRouter;
