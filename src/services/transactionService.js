const prisma = require("../utils/adapter");

async function create(data){
   try{
       const transactionCreated = await prisma.transaction.create({data: {
       data: {
           description: data.description,
           type: data.type,
           date: data.date, 
           amount: data.amount,
           userId: userId
        }
    }})
       return transactionCreated;
    } catch (error) {
        console.log("Erro ao criar uma transação: " + error)
    }
}

async function find(id){
    try{
        const transaction = await prisma.transaction.findUnique({where: {id}});
        
        if(!transaction){
            return null
        }
        return transaction;
    }catch (error){
      console.log("Erro ao encontrar uma transação" + error);
    }
}

async function findAll(){
    try{
       const transactions = await prisma.transaction.findMany();

       return transactions;
    } catch (error) {
        console.log("Erro ao encontrar transações: " + error);
    }
}

async function deleteTransaction(transaction){
    try{
       await prisma.transaction.delete({where: {id: transaction.id}});
    } catch (error){
        console.log("Erro ao deletar o usuário: " + error);
    }
}

async function update(id, transaction){
    try{
    
       const transactionUpdated = prisma.transaction.upadate({where: {id},
          data: {
            amount: transaction.amount,
            date: transaction.date,
            type: transaction.type,
            description: transaction.description,
            userId: transaction.userId
        }

        
    });
     return transactionUpdated;
    } catch (error) {
        console.log("Error ao atualizar uma transação")
    }
}


module.exports = {
    find,
    create,
    findAll,
    deleteTransaction,
    update
}