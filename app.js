const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 1234;

app.disable("x-powered-by");

app.use((req, res, next) => {
  console.log("Aquí iría el middleware"); // middleware que se aplica a todas las rutas
  // revisar cookies
  next();
});

app.use("/pokemon", (req, res, next) => {
  console.log("Aquí iría el middleware"); // middleware limitado a la ruta pokemon
  // revisar cookies
  next(); // es imprescindible utilizar el next al final
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Mi página</h1>");
});

app.use((req, res) => {
  res.status(201).send("<h1>404 not found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
