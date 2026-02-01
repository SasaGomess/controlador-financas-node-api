const prisma = require("../utils/adapter");

async function getMontlySummary(userId) {
    const startDate = new Date(2026, 2 - 1, 1);
    const endDate = new Date(2026, 2, 0, 23, 59, 59);


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