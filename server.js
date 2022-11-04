//import express from "express";
import app from "./index.js";

//const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(app.get("port"), () =>
  console.log(`Server ${app.get("appName")} on port ${app.get("port")}`)
);
