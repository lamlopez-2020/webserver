console.clear();
import dotenv from "dotenv";
import app from "./index.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

//Setting
app.set("appName", "Node Course Desarrollo Util");
app.set("port", PORT);

const server = app.listen(app.get("port"), () =>
  console.log(`Server ${app.get("appName")} on port ${app.get("port")}`)
);
