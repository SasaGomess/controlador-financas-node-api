const prisma = require("../utils/adapter");
const redis = require("../lib/cache");

async function getMonthlySummary(userId, month, year) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const cacheKey = `${process.env.CACHE_SUMMARY}:${userId}:${year}-${month}`;

  const cachedSummary = await redis.get(cacheKey);

  if(cachedSummary){
    return JSON.parse(cachedSummary);
  }

  const incomes = await prisma.transaction.findMany({
    where: { userId, date: { gte: startDate, lte: endDate }, type: "INCOME" },
  });

  const expenses = await prisma.transaction.findMany({
    where: { userId, date: { gte: startDate, lte: endDate }, type: "EXPENSE" },
  });

  const {
    totalExpense: totalMonthlyExpense,
    totalIncome: totalMonthlyIncome,
    balance,
  } = getTotal(incomes, expenses);

  const data = {
    totalMonthlyIncome,
    totalMonthlyExpense,
    balance,
    incomes,
    expenses,
  };

  await redis.set(cacheKey, JSON.stringify(data));

  return data;
}

async function getDetailedDashBoard(userId) {
  try {
    const cacheKey = `${process.env.CACHE_DASHBOARD}:${userId}`;

    const cachedDashboard = await redis.get(cacheKey); 

    if(cachedDashboard) {
      return JSON.parse(cachedDashboard);
    }

    incomes = await prisma.transaction.findMany({
      where: { userId, type: "INCOME" },
    });

    expenses = await prisma.transaction.findMany({
      where: { userId, type: "EXPENSE" },
    });

    const { totalExpense, totalIncome, balance } = getTotal(incomes, expenses);

    const expensesByCategory = await prisma.transaction.groupBy({
      by: ["expenseCategory"],
      where: { userId, type: "EXPENSE" },
      _sum: { amount: true },
    });

    const biggestExpensePerCategory = await prisma.transaction.findFirst({
      where: { userId, type: "EXPENSE" },
      select: {
        expenseCategory: true,
      },
      orderBy: { amount: "desc" },
    });

    const expensesVsIncomesPercent = parseInt(
      (totalExpense / totalIncome) * 100,
    );

    const data = {
      balance,
      expensesByCategory,
      expensesVsIncomesPercent,
      biggestExpensePerCategory,
    };

    await redis.set(cacheKey, JSON.stringify(data));

    return data;
  } catch (e) {
    console.log(e);
  }
}

function getTotal(incomes, expenses) {
  const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0)

  const balance = (totalIncome - totalExpense).toFixed(2);

  return {
    totalIncome,
    totalExpense,
    balance,
  };
}

module.exports = { getMonthlySummary, getDetailedDashBoard };
