const validadeUser = require("../services/loginService");
const registerUser = require("../services/registerService");
const generateToken = require("../utils/generateToken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    const user = await validadeUser({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const token = generateToken(user);

    return res.json({token});
  } catch {
    res.status(500).json({ error: "Erro ao realizar login"});
  }
}

async function register(req, res) {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "E-mail, senha e nome são obrigatórios" });
    }

    const user = await registerUser({ email, name, password });

    if (!user) {
        return res.status(400).json({ error: "Erro ao cadastrar usuário." });
    }

    return res.status(201).json(user);
  } catch {
    return res.status(500).json({error: "Erro ao cadastrar usuário"});
  }

}

module.exports = {
  login,
  register
};
