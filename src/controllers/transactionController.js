const transactionService = require("../services/transactionService");

async function findTransactions(req,  res){
    try{
        const userId = parseInt(req.userId);
        const transactions = await transactionService.findAll(userId);
        res.status(200).json(transactions);
    } catch {
        res.status(500).json({error: "Erro ao encontrar as transações"})
    }
}

async function createTransaction(req, res){
    try{  
       const data = req.body;
       const userId = parseInt(req.userId);
       
       if(!data.amount || !data.description || !data.type || !data.date){
            res.status(400).json({error: "Descrição, tipo, data e valor são obrigatórios"});
        }

       const transactionCreated = await transactionService.create(data, userId);

       if(!transactionCreated){
        res.status(500).json({error: "Erro ao criar uma transação"})
       }

       res.status(201).json(transactionCreated);
    } catch {
       res.status(500).json({error: "Erro ao criar uma transação"});
    }
}

async function updateTransaction(req, res){
    try{  
        const id = parseInt(req.params.id);
        const userId = parseInt(req.userId);
        const data = req.body;

        if(!data.amount || !data.description || !data.type || !data.date){
            res.status(400).json({error: "Descrição, tipo, data e valor são obrigatórios"});
        }
        
        const transaction = await transactionService.find(id, userId);
        
        if(!transaction){
            res.status(404).json({error: "Transação não encontrada"});
        }
        
        const transactionUpdated = await transactionService.update(transaction.id, data);

        if(!transactionUpdated){
            res.status(500).json({error: "Erro ao atualizar uma transação"})
        }


        res.status(200).json(transactionUpdated);
    } catch {
        res.status(500).json({error: "Erro ao atualizar a transação"});
    }
}

async function findATransaction(req, res){
    try{
        const id = parseInt(req.params.id);
        const userId = parseInt(req.userId);
        
        const transaction = await transactionService.find(id, userId);

        if(!transaction){
            res.status(404).json({error: "Transação não encontrada"});
        }
        
        res.status(200).json(transaction);
    } catch {
        res.status(500).json({error: "Erro ao encontrar uma trasação"});
    }
}

async function deleteTransaction(req, res){
    try {
        const id = parseInt(req.params.id);
        const userId = parseInt(req.userId);
        
        const transaction = await transactionService.find(id, userId);

        if(!transaction){
            res.status(404).json({error: "Transação não encontrada"});
        }

        await transactionService.deleteTransaction(transaction);

        res.status(204).send();
    } catch {
        res.status(500).json({error: "Erro ao deletar uma transação"})
    }
}

module.exports = {
    deleteTransaction,
    findATransaction,
    findTransactions,
    updateTransaction,
    createTransaction
}
