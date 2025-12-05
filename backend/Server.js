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

// Endereço do seu cluster (a parte depois do @ na string do Atlas)
const dbClusterAddress = 'cluster0.eyqcipk.mongodb.net'; 

// Nome do banco de dados que você quer usar/criar.
// É UMA BOA PRÁTICA DEFINIR UM NOME AQUI.
const dbName = 'Cluster0'; 

// --- CONSTRUÇÃO MANUAL DA URI ---
// Este é o formato que o Mongoose entende perfeitamente.
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterAddress}/${dbName}?retryWrites=true&w=majority`;


// --- DEPURAÇÃO FINAL ---
// Vamos imprimir a string final para ter 100% de certeza do que está sendo usado.
console.log("--- TENTANDO CONECTAR COM A SEGUINTE URI ---");
console.log(mongoURI);
console.log("-------------------------------------------");


// Tenta se conectar ao MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("SUCESSO: Conectado ao MongoDB!"))
  .catch((err) => console.error("FALHA: Erro ao se conectar ao MongoDB.", err));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/cards", require("./routes/cards"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
