const validadeUser = require("../services/loginService");
const generateToken = require("../utils/generateToken");

async function login(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password ){
            return res.status(400).json({error: "E-mail e senha são obrigatórios"});
        }

        const user = await validadeUser({email, password});

       if(!user) {
           return res.status(401).json({error: "Usuário ou senha inválidos"})
       }
        
       const token = generateToken({id: user.id});

       return res.json({token});
    }catch {
        res.status(500).json({error: "Erro ao realizar login"})
    }
}

module.exports = {
    login,
}