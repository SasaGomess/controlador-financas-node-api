require("dotenv").config();
const express = require("express");
const authRoutes = require("../src/routes/authRoutes");

const server = express();

server.use(express.json());

server.use("/auth", authRoutes);

server.use("/", (req, res) => {
    res.send("Conexão estabelecida com sucesso!");
})

server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escutando na porta ${process.env.PORT}`)
})