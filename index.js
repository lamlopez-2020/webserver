import express from "express";

import cookieParser from "cookie-parser";
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import authSessionRouter from "./routes/auth_session.js";
import authTokenRouter from "./routes/auth_token.js";

const app = express();

//Middleware: función que se ejecuta para uno o  múltiples endpoints
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use("/account", accountRouter);

app.use("/auth", authRouter);

app.use("/auth-session", authSessionRouter);

app.use("/auth-token", authTokenRouter);

export default app;
