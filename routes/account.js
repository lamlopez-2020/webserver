import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";

const accountRouter = Router();
//Middleware que logue la ip
accountRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
});

//Obtener los detalles de una cuenta 
accountRouter.get("/:guid", (req, res) => {
  const { guid } = req.params;
  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (!user) return res.status(404).send();

  return res.send(user);
});

//Crear una nueva cuenta a partir de un id y name
accountRouter.post("/", (req, res) => {
  const { guid, last_name } = req.body;
  if (!guid || !last_name) return res.status(400).send();

  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (user) return res.status(409).send();

  USERS_BBDD.push({
    guid,
    last_name,
  });

  return res.send();
});

//Actualizar el name de una cuenta
accountRouter.patch("/:guid", (req, res) => {
  const { guid } = req.params;
  const { last_name } = req.body;
  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (!last_name) return res.state(400).send();

  user.last_name = last_name;

  return res.send();
});

//Eliminar una cuenta
accountRouter.delete("/:guid", (req, res) => {
  const { guid } = req.params;
  const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);

  if (userIndex === -1) return res.statusCode(404).send();

  USERS_BBDD.splice(userIndex, 1);

  return res.send();
});

export default accountRouter;
