const prisma = require("../utils/adapter");
const bcrypt = require("bcrypt");

async function registerUser({email, password, name}) {
    try{
        const existingUser = await prisma.user.findUnique({where: {email}});

        if(existingUser){
            console.log("O usuário já está cadastrado");
            return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({data: {
            email,
            password: hashedPassword,
            name
            }
        })
        
        return {
            email: user.email,
            name: user.name
        };
    }catch (error){
        console.log("Erro ao cadastrar o usuário " + error);
        return null;
    }
}

module.exports = registerUser;