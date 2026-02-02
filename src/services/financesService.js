const prisma = require("../utils/adapter");

async function getMontlySummary(userId, month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);


    const incomes = await prisma.transaction.findMany({
        where: { userId,
            date: {gte: startDate, lte: endDate},
            type: "INCOME"
        }
    });

    const expenses = await prisma.transaction.findMany({
        where: {userId,
            date: {gte: startDate, lte: endDate},
            type: "EXPENSE"
        }
    });

    const totalMontlyIncome = incomes.reduce((acc, i ) => acc + i.amount, 0);
    const totalMontlyExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

    const balance = totalMontlyIncome - totalMontlyExpense;

    return {
        totalMontlyIncome,
        totalMontlyExpense,
        balance,
        incomes,
        expenses
    }
}

module.exports = { getMontlySummary };