const transactionService = require("../scr/services/transactionService");


async function findTransactions(req,  res){
    try{
        const transactions = await transactionService.findAll();
        res.status(200).json(transactions);
    } catch {
        res.status(500).json({error: "Erro ao encontrar as transações"})
    }
}

async function createTransaction(req, res){
    try{  
       const data = req.body;

       const transactionCreated = await transactionService.create(data);

       res.status(201).json(transactionCreated);
    } catch {
       res.status(500).json({error: "Erro ao criar uma transação"});
    }
}

async function updateTransaction(req, res){
    try{  
        const id = req.params.id;
        const data = req.body;

        const transaction = await transactionService.find(id);
        
        if(!transactionService){
            res.status(404).json({error: "Transação não encontrada"});
        }

        
        const transactionUpdated = transactionService.update(transaction.id, data);

        if(!transactionUpdated){
            res.status(404).json({error: "Transação não encontrada!"})
        }

        res.status(200).json(transactionUpdated);
    } catch {
        res.status(500).json({error: "Erro ao atualizar a transação"});
    }
}

async function findATransaction(req, res){
    try{
        const id = req.params.id;

        const transaction = transactionService.find(id);

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
        const id = req.params.id;

        const transaction = await transactionService.find(id);

        if(!transaction){
            res.status(404).json({error: "Transação não encontrada"});
        }

        transactionService.deleteTransaction(transaction);

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
