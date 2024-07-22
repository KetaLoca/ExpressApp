const express = require("express");
const ditto = require("./pokemon/ditto.json");
const path = require("path");
const app = express();

const PORT = process.env.PORT ?? 1234;

app.disable("x-powered-by");

// middleware que se aplica a todas las rutas
app.use((req, res, next) => {
  if (req.method != "POST") return next();
  if (req.headers["content-type"] != "application/json") return next();

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    //mutar la request para meter la información en el body
    req.body = data;
    next();
  });
});

// middleware limitado a la ruta pokemon
app.use("/pokemon", (req, res, next) => {
  console.log("Aquí iría el middleware en la ruta /pokemon");
  // revisar cookies
  next(); // es imprescindible utilizar el next al final
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Mi página</h1>");
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  // req.body deberíamos guardar en bbdd
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(201).send("<h1>404 not found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
