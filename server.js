//import express from "express";
//import app from "./index.js";

//const app = express();

const PORT = Number(process.env.PORT) || 3000;
//const app = express();
app.set("appName", "Node Course Desarrollo Util");
app.set("port", PORT);

app.listen(PORT, () =>
  console.log(`Server ${app.get("appName")} on port ${app.get("port")}`)
);
