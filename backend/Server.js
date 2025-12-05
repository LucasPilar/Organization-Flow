const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
} ));


app.use(express.json());


// Pega as credenciais do arquivo .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


const dbClusterAddress = 'cluster0.eyqcipk.mongodb.net'; 


const dbName = 'Cluster0'; 


const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterAddress}/${dbName}?retryWrites=true&w=majority`;


// console.log("--- TENTANDO CONECTAR COM A SEGUINTE URI ---");
// console.log(mongoURI);
// console.log("-------------------------------------------");



mongoose
  .connect(mongoURI)
  .then(() => console.log("SUCESSO: Conectado ao MongoDB!"))
  .catch((err) => console.error("FALHA: Erro ao se conectar ao MongoDB.", err));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/cards", require("./routes/cards"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
