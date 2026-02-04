-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('HOUSING', 'TRANSPORT', 'BILLS', 'SHOPPING', 'ENTERTAINMENT', 'TAXES', 'DEBTS', 'GIFTS', 'VEHICLE', 'RENT', 'CREDIT_CARD', 'FOOD', 'HEALTH', 'EDUCATION', 'LAISURE', 'OTHERS');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('INVESTMENTS', 'SALARY', 'FREELANCE', 'EXTRA_INCOME', 'OTHERS');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "expense_category" "ExpenseCategory",
ADD COLUMN     "income_category" "IncomeCategory";
