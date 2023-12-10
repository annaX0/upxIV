const express = require("express");
const cors = require("cors");
const register = require("./routes");
const home = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", register);

app.listen(3001, (err) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:", err);
  } else {
    console.log("Servidor ouvindo na porta 3001");
  }
});
