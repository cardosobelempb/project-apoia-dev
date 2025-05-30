# 🧩 Fullstack App – Next.js + Prisma + PostgreSQL

Aplicação fullstack construída com **Next.js** (API + Frontend), utilizando **Prisma ORM** e **PostgreSQL** como banco de dados. Projeto moderno, modular e pronto para desenvolvimento local com **Docker** e variáveis de ambiente via **Dotenv**.

---

## 🧰 Tecnologias Utilizadas

- **Node.js** – Runtime JavaScript
- **TypeScript** – Tipagem estática
- **Next.js** – Fullstack framework (Frontend + API)
- **Prisma ORM** – ORM moderno para banco de dados
- **PostgreSQL** – Banco de dados relacional
- **Auth.js (NextAuth.js)** – Autenticação com provedores sociais e credenciais
- **Zod** – Validação de dados
- **Dotenv** – Variáveis de ambiente
- **Docker** – Containerização

## Add .vscode settings.json

```
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "code-runner.executorMap": {
    "typescript": "npx tsx",
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## 🚀 Como Rodar o Projeto

### 🔧 Pré-requisitos

- Node.js >= 18
- Docker e Docker Compose
- Yarn ou NPM

---

### ⚙️ Configuração
#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```
#### 2. Crie o arquivo .env

```bash
# .env
# .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app
NEXTAUTH_SECRET=uma_chave_segura
NEXTAUTH_URL=http://localhost:3000

# (opcional) Configuração de provedores OAuth
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

#### 3. Suba o PostgreSQL com Docker

```bash
docker-compose up -d
```
### ▶️ Executando o Projeto

```bash
# Suba o banco de dados
docker-compose up -d

# Instale as dependências
npm install

# Gere o cliente do Prisma
npx prisma generate

# Execute as migrations
npx prisma migrate dev --name init

# (opcional) Popule o banco com dados fake
npx ts-node prisma/seed.ts

# Rode o app em modo desenvolvimento
npm run dev

# ou
yarn
```
- Acesse a aplicação em: http://localhost:3000

### 🔐 Autenticação com Auth.js
#### O projeto utiliza Auth.js (NextAuth) com suporte a:

- Provedores OAuth (GitHub, Google, etc.)
- Login com email/senha (via Credentials Provider)
- Sessões protegidas com JWT ou banco de dados (adaptável via config)
- Exemplo de configuração no arquivo pages/api/auth/[...nextauth].ts:

```bash
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        )

        return isValid ? user : null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
}
export default NextAuth(authOptions)

```

### 🐳 docker-compose.yml (exemplo)

```bash
version: '3.8'
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:

```
### 📁 Estrutura de Pastas Sugerida

```bash
.
├── pages/
│   ├── api/
│   │   ├── auth/               # NextAuth.js
│   │   │   └── [...nextauth].ts
│   └── index.tsx              # Página inicial
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── lib/
│   └── prisma.ts
├── .env
├── docker-compose.yml
├── package.json
└── README.md

```
### 📚 Scripts Úteis

| Comando                      | Descrição                      |
| ---------------------------- | ------------------------------ |
| `npm run dev`                | Inicia o Next.js em modo dev   |
| `npx prisma studio`          | Abre interface visual do banco |
| `npx prisma migrate dev`     | Executa as migrações           |
| `npx ts-node prisma/seed.ts` | Executa o seed                 |
| `docker-compose up -d`       | Inicia o banco em container    |


### ✅ Requisitos

- Node.js ≥ 18
- PostgreSQL ≥ 12
- Docker (opcional, mas recomendado)
```bash

```
### 📄 Licença
- Distribuído sob a licença MIT. Veja LICENSE para mais detalhes.

### 🤝 Contribuindo
- Pull Requests são bem-vindos!
- Issues e sugestões também são encorajadas.
