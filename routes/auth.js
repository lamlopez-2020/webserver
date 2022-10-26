import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";

const authRouter = Router();
//Endpoints public (No autenticado y no autorizado)
authRouter.get("/public", (req, res) => {
  res.send("Public Endpoint");
});

//Endpoints autenticado para todo usuario registrado
authRouter.post("/authentication", (res, req) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send();

  const user = USERS_BBDD.find((user) => user.email === email);
  if (!user) return res.status(401).send();

  if (user.password !== password) return res.status(401).send();

  res.send(`User ${user.name} authenticated`);
});

//Endpoints autorizado para administrador
authRouter.post("/authorization", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send();

  const user = USERS_BBDD.find((user) => user.email === email);
  if (!user) return res.status(401).send();

  if (user.password !== password) return res.status(401).send();

  if (user.role !== "admin") return res.status(403).send();

  res.send(`Administrator ${user.name}`);
});

export default authRouter;