const prisma = require("../utils/adapter");

async function create(data, userId) {
  try {
    const transactionCreated = await prisma.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        date: data.date,
        expenseCategory: data.expenseCategory,
        incomeCategory: data.incomeCategory,
        amount: parseFloat(data.amount),
        userId: userId,
      },
    });

    return {
      description: transactionCreated.description,
      type: transactionCreated.type,
      expenseCategory: transactionCreated.expenseCategory,
      incomeCategory: transactionCreated.incomeCategory,
      amount: transactionCreated.amount,
    };
  } catch (error) {
    console.log("Erro ao criar uma transação: " + error);
    return null;
  }
}

async function find(id, userId) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id, userId },
    });

    if (!transaction) {
      return null;
    }

    return transaction;
  } catch (error) {
    console.log("Erro ao encontrar uma transação" + error);
  }
}

async function findAll(userId) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });

    return transactions;
  } catch (error) {
    console.log("Erro ao encontrar transações: " + error);
  }
}

async function deleteTransaction(transaction) {
  try {
    await prisma.transaction.delete({ where: { id: transaction.id } });
  } catch (error) {
    console.log("Erro ao deletar o usuário: " + error);
  }
}

async function update(id, transaction) {
  try {
    const transactionUpdated = prisma.transaction.update({
      where: { id },
      data: {
        amount: parseFloat(transaction.amount),
        date: transaction.date,
        description: transaction.description,
      },
    });
    return{
      description: transactionUpdated.description,
      type: transactionUpdated.type,
      expenseCategory: transactionUpdated.expenseCategory,
      incomeCategory: transactionUpdated.incomeCategory,
      amount: transactionUpdated.amount
    };
  } catch (error) {
    console.log("Error ao atualizar uma transação");
  }
}

module.exports = {
  find,
  create,
  findAll,
  deleteTransaction,
  update,
};
