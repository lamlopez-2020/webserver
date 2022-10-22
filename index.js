console.clear();
import dotenv from "dotenv";
import express from "express";
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

//Middleware: función que se ejecuta para uno o  múltiples endpoints
app.use(express.json());
app.use(express.text());
app.use("/account", accountRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
