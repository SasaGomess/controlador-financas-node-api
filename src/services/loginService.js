const prisma = require("../utils/adapter");
const bcrypt = require("bcrypt");

async function validadeUser({email, password}) {
    try{
        const user = await prisma.user.findUnique({where: {email}});
        
        if(!user || !await bcrypt.compare(password, user.password)){
            console.log("E-mail ou senha inválidos")
            return null;
        }
        
        return {
            id: user.id,
            email: user.email
        };    
    }catch (error){
        console.log("Erro ao verificar o usuário " + error);
        return null;
    }
}

module.exports = validadeUser;