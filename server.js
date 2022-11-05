console.clear();
import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

//Setting
app.set("appName", "Node Course Desarrollo Util");
app.set("port", PORT);

const server = app.listen(app.get("port"), () =>
  console.log(`Server ${app.get("appName")} on port ${app.get("port")}`)
);
