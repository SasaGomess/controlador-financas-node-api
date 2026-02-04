/*
  Warnings:

  - The values [RENT] on the enum `ExpenseCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseCategory_new" AS ENUM ('HOUSING', 'TRANSPORT', 'BILLS', 'SHOPPING', 'ENTERTAINMENT', 'TAXES', 'DEBTS', 'GIFTS', 'VEHICLE', 'CREDIT_CARD', 'FOOD', 'HEALTH', 'EDUCATION', 'LAISURE', 'OTHERS');
ALTER TABLE "transactions" ALTER COLUMN "expense_category" TYPE "ExpenseCategory_new" USING ("expense_category"::text::"ExpenseCategory_new");
ALTER TYPE "ExpenseCategory" RENAME TO "ExpenseCategory_old";
ALTER TYPE "ExpenseCategory_new" RENAME TO "ExpenseCategory";
DROP TYPE "public"."ExpenseCategory_old";
COMMIT;
