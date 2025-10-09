require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

const dbUser= process.env.DB_USER;
const dbPassword= process.env.DB_PASSWORD;
const mongoURI=`mongodb+srv://´${dbUser}´:${dbPassword}@organization-flow-clust.bva4fna.mongodb.net/?retryWrites=true&w=majority&appName=Organization-Flow-Cluster`

//Conexão com o BD
mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado do mongoDB"))
  .catch((err) => console.error("Erro ao se conectar ao MongoDB", err));

//Rotas da API

const PORT = process.nextTick.PORT || 500;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
