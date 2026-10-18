import express from "express";

//importando o mongoose
import mongoose from "mongoose";

//importando o model de usuario
import User from "./models/Users.js";

//Importando o cors
import cors from "cors";

//Importando as ROtas de Usuarios
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Configurações do express
app.use(express.json()); // permite o uso de json na aplicão

//Configurando o CORS
app.use(cors());

//Ativando a utilização das rotas
app.use("/", userRoutes);

// Rodando a api na port 4000
const port = 4000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
  }
});
