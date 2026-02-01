const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb(
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    connectionLimit: 5
  }
)
const prisma = new PrismaClient({ adapter });

module.exports = prisma;