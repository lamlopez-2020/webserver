console.clear();
import { createServer } from "http";

const httpServer = createServer();

httpServer.on("request", (req, res) => {
  //Nos falta el verbo/método para indicar que quiere hacer el cliente
  //console.log("PETICIÒN RECIBIDA");
  //console.log(req.method);
  //NOs falta eñ path/ruta para identificar el recurso
  //console.log(req.url);
  //Nos faltan las cabecera
  //console.log(req.headers);

  //NOs falta el body/payload
  let data = "";
  let chunkIndex = 0;
  req.on("data", (chunk) => {
    data += chunk;
    chunkIndex++;
    console.log(chunkIndex);
  });
  req.on("end", () => {
    //console.log(data);
    res.end("RECIBIDO COLEGA");
  });
  // app.post("/cuenta", (req, res) => {
  //   console.log(req.body);
  //   res.send();
  // });
  // app.listen(PORT, () => {
  //   console.log(`Servidor levantado en el puerto ${PORT}`);
  // });
});

httpServer.listen(3000);
