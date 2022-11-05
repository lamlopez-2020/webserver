import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../../bbdd.js";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

//Array donde se guarda de temporalmente el sessionID
const sessions = [];
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
  //Para enviar el json del body al server
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    //Traer el guid del user
    const { guid } = authByEmailPwd(email, password);

    //Generador aleatorio de la ID de la session
    const sessionId = nanoid();

    //Se guarda el objeto de la sessionID con su guid asociado de forma temporal en un array
    sessions.push({ sessionId, guid });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
    });

    return res.send(`User ${user.name} authenticated`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

//SOlicitud autenticada con sesion para obtener el perfil del usuario
authSessionRouter.get("/profile", (req, res) => {
  //Validaciòn de la cookie, se requiere el middleware cookie-parse para que express lo pueda leer
  const { cookies } = req;

  if (!cookies.sessionId) return res.sendStatus(401);

  //Determinar si la sessionID existe en BBDD del servidor
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );

  //Validar el userSession, puede ser que no exista
  if (!userSession) res.sendStatus(401);

  //Una vez verificado que existe la cookie tanto en el cliente como en el server, se busca los datos del user

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.sendStatus(401);

  //Borrar del objeto user el password
  delete user.password;
  return res.send(user);
});

export default authSessionRouter;
