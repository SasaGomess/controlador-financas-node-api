require("dotenv").config();
const express = require("express");
const authRoutes = require("../src/routes/authRoutes");
const transactionRoutes = require("../src/routes/transactionRoutes");
const financesRoutes = require("../src/routes/financesRoutes");

const server = express();

server.use(express.json());

server.use("/auth", authRoutes);
server.use("/transactions", transactionRoutes);
server.use("/finances", financesRoutes)

server.use("/", (req, res) => {
    res.send("Conexão estabelecida com sucesso!");
})

server.listen(process.env.LOCAL_PORT || 3000, () => {
    console.log(`Servidor escutando na porta ${process.env.LOCAL_PORT}`)
})