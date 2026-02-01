const prisma = require("../utils/adapter");
const bcrypt = require("bcrypt");

async function registerUser({email, password, name}) {
    try{
        const existingUser = await prisma.user.findUnique({where: {email}});

        if(existingUser){
            return console.log("O usuário já está cadastrado")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({data: 
            {email,
            password: hashedPassword,
            name}
        })
        
        return user;
    }catch {
        console.log("Erro ao cadastrar o usuário");
    }
}

module.exports = registerUser;