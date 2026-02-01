const express = require("express");
const financeService = require("./services/financeService");
require("dotenv").config();

const server = express();

server.use(express.json());


financeService.getMontlySummary();

server.use("/", (req, res) => {
    res.send("Conexão estabelecida com sucesso!");
})

server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escutando na porta ${process.env.PORT}`)
})