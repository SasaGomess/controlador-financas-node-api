# 💰🔒💵 Controlador de Finanças 🌟

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-f00?style=for-the-badge&logo=redis&logoColor=white)

## 

O **Controlador de Finanças** nasceu de uma necessidade pessoal de ajudar meus familiares a organizarem suas finanças com tranquilidade. Percebi que muitas pessoas do meu cotidiano (principalmente mais velhas), tinham dificuldades em usar planilhas do Excel ou simplesmente não se sentiam confortáveis com ferramentas complexas para controlar seu dinheiro. 

E foi com o intuito de reforçar a **educação e o controle financeiro** na vida dessas pessoas, que criei o Controlador de Finanças, um sistema que vai servir de **back-end** para o front-end do projeto. Aplico a ideia de criar algo objetivo e intuitivo, que descomplica a organização financeira e pode ser inserido na rotina do usuário.

Ele é uma **API REST** desenvolvida em **Node.js** que permite aos usuários gerenciar suas finanças pessoais de forma simples e segura. O projeto foi construído seguindo as melhores práticas de desenvolvimento, incluindo:

- ✅ Arquitetura em camadas (Routes → Controllers → Services → Models)
- ✅ Autenticação segura com JWT (JSON Web Tokens)
- ✅ Criptografia de senhas com Bcrypt
- ✅ Validação de dados em todas as requisições
- ✅ Utilização de Middleware para validação de Token e proteção de rotas
- ✅ Armazenamento em Cache de resumos financeiros com Redis 

O sistema permite que os **usuários registrem suas transações financeiras, categorizem receitas e despesas, e obtenham resumos mensais detalhados de sua situação financeira.**

## 

## 🚀 Funcionalidades

### 🔐 Autenticação
- **Registro de Usuários**: Criação de conta com e-mail, nome e senha criptografada
- **Login Seguro**: Processo de autenticação com geração de token JWT
- **Proteção de Rotas**: Middleware de autenticação para rotas privadas
- **Usuário com Acesso Apenas as suas Finanças**: Utilização do ``userId`` para garantir que um usuário tem apenas acesso as suas informações financeiras

### 💸 Gestão de Transações
- **Listar Transações**: Visualiza todas as transações financeiras de um usuário
- **Buscar Transação**: Consulta uma transação específica por ID
- **Criar Transação**: Registra novas receitas ou despesas
- **Atualizar Transação**: Edita informações de transações existentes
- **Deletar Transação**: Remove transações do histórico

### 📊 Relatórios Financeiros
- **Resumo Mensal**:
  - Total de receitas do mês
  - Total de despesas do mês
  - Saldo final do mês
  - Lista detalhada de receitas e despesas

## 

## 🔌 Endpoints da API

### Autenticação

```http
POST /auth/register
```
```http
POST /auth/login
```

**Body do Cadastro:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```
**Body do Login:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```
**Response do Login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
## 

### Transações (Requer Autenticação)

```http
GET /transactions
```
```http
GET /transactions/:id
```
```http
POST /transactions
```
```http
PUT /transactions/:id
```
```http
DELETE /transactions/:id
```

**Body do Cria uma Transação:**
```json
{
  "description": "Salário",
  "type": "INCOME",
  "amount": 5000.00,
  "date": "2025-02-01T00:00:00.000Z"
}
```
## 

**Body do Atualiza uma Transação:**
```json
{
  "description": "Salário Atualizado",
  "amount": 5500.00
  "date": "2025-02-05T00:00:00.000Z"
}
```
## 

### Finanças (Requer Autenticação)

```http
GET /finances/summary?month=2&year=2025
```
Retorna o resumo financeiro do mês especificado.

**Query Params:**
Em sua ferramenta de teste de Endpoints insira query params para filtrar informações e gerar o relatório
- `month`: Mês (1-12)
- `year`: Ano (ex: 2025)

**Response:**
```json
{
  "totalMontlyIncome": 5000.00,
  "totalMontlyExpense": 3000.00,
  "balance": 2000.00,
  "incomes": [...],
  "expenses": [...]
}
```

## 

| 🛠️ Tecnologias Utilizadas |
|------------|
| **Node.js** | 
| **Express** | 
| **PostgreSQL** | 
| **Prisma** | 
| **Docker** | 
| **JWT** |
| **Bcrypt** | 
| **Nodemon** | 

## 

## 🔒 Segurança
- **Senhas Criptografadas**: Todas as senhas são hasheadas usando Bcrypt antes de serem armazenadas
- **Autenticação JWT**: Tokens seguros para autenticação de usuários
- **Validação de Dados**: Todas as entradas são validadas antes do processamento
- **Middleware de Autenticação**: Proteção de rotas sensíveis

## 

## 📁 Estrutura de Pastas

```
controlador-financas/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── financeController.js
│   │   └── transactionController.js
│   │
│   ├── services/
│   │   ├── loginService.js
│   │   ├── registerService.js
│   │   ├── financesService.js
│   │   └── transactionService.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── financesRoutes.js
│   │   └── transactionRoutes.js
│   │
│   └── utils/
│       ├── adapter.js
│       └── generateToken.js
│
├── prisma/
│   └── schema.prisma
│
├── migrations/
│
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## 

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/controlador-financas.git
cd controlador-financas
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
POSTGRES_USER=usuario
POSTGRES_PASSWORD=senha
POSTGRES_DB=financas_db
DB_PORT=5433

DATABASE_URL="postgresql://usuario:senha@localhost:5433/financas_db?schema=public"

PORT=3000

JWT_SECRET_KEY="sua-chave-secreta-super-segura-aqui"
```

4. **Suba o banco de dados com Docker**

```bash
docker-compose up 
```

5. **Execute as migrations do Prisma**

```bash
npx prisma migrate dev
```

6. **Inicie o servidor**

```bash
npm run start:dev
```
O servidor estará rodando em `http://localhost:3000 :)`
---

## 🧪 Testando a API

Você pode testar os endpoints usando o [Postman](https://www.postman.com/) por exemplo.
