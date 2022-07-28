const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db/database");
require('dotenv').config();

// settings

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.set("port", process.env.PORT || 4001);

// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, "./clubwerchow.com.key")),

//   cert: fs.readFileSync(path.resolve(__dirname, "./clubwerchow.com.crt")),
// };

//middlewares
app.use(bodyparser.json());
app.use("*", cors());

//Routes


//OPERADORES
app.use("/api/auth/operador", require("./routes/auth/operador"));
app.use("/api/auth/auth", require("./routes/auth/auth"));

// CLIENTES
app.use("/api/clientes", require("./routes/sistema/clientes"));

// ZONAS
app.use("/api/zonas", require("./routes/sistema/zonas"));

// HISTORIAL
app.use("/api/historialcliente", require("./routes/historial/historial_clientes"));

// CREDITOS
app.use("/api/creditos", require("./routes/sistema/creditos"));

// COBRANZA
app.use("/api/cobranza", require("./routes/sistema/cobranza"));

// NOTICIAS
app.use("/api/noticias", require("./routes/sistema/noticias"));


// UPLOADS
// app.use(
//   "/api/archivos/legajovirtual",
//   require("./routes/archivos/LegajoVirtual")
// );


//Conecting DB

db.financieraSequelize
  .authenticate()
  .then(() => console.log("Database FINANCIERA conected..."))
  .catch((err) => console.log("error" + err));



// server escuchando

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

//https.createServer(options, app).listen("4001");
