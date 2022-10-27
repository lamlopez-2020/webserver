import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authTokenRouter = Router();

authTokenRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);
});

try {
  const user = authByEmailPwd(email, password);

  return res.send(`User ${user.name} authenticated`);
} catch (error) {
  return res.sendStatus(401);
}

export default authTokenRouter;
