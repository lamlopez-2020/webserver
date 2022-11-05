import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRouter = Router();
//Endpoints public (No autenticado y no autorizado)
authRouter.get("/public", (req, res) => {
  res.send("Public Endpoint");
});

//Endpoints autenticado para todo usuario registrado
authRouter.post("/authentication", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    return res.send(`User ${user.name} authenticated`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Endpoints autorizado para administrador
authRouter.post("/authorization", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    if (user.role !== "admin") return res.sendStatus(403);

    return res.send(`Administrator ${user.name}`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authRouter;
