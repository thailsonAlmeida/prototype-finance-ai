# Prototype Finance AI

Sistema Full‑Stack para gestão financeira pessoal com diagnóstico mensal e insights gerados por IA.

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

# Motivação / Problema que resolve

Muitas pessoas têm dificuldade em transformar transações e gastos em decisões claras. Prototype Finance AI facilita a gestão financeira ao:

- Organizar receitas, despesas e categorias.
- Gerar um relatório diagnóstico mensal com insights acionáveis (alertas, recomendações e resumo).
- Fornecer um dashboard visual e intuitivo que ajuda no acompanhamento e tomada de decisão.

Este projeto é também uma peça de portfólio pensada para desenvolver e praticar competências reais de engenharia de software: arquitetura full‑stack, integrações (auth/pagamentos), deploy e práticas de qualidade.

# Destaques

- Projeto full‑stack com deploy público (Vercel).
- Integrações reais: Clerk (autenticação) e Stripe (pagamentos).
- Persistência com Prisma + PostgreSQL.
- Geração de diagnósticos por IA.
- Qualidade de código: ESLint, Prettier, Husky, lint-staged e git-commit-msg-linter.

# Principais funcionalidades

- Autenticação de usuários com Clerk.
- Cadastro de receitas, despesas e categorias.
- Dashboard com gráficos mensais (Recharts).
- Relatório diagnóstico mensal gerado por IA.
- Integração com Stripe para assinaturas/pagamentos.
- Validação de formulários com Zod e React Hook Form.
- Migrations e modelagem com Prisma.
- Pipeline de CI/CD (GitHub Actions) e deploy em Vercel.
- Ferramentas de qualidade (lint, format, hooks Git).

# Tech Stack

## Frontend

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radix-ui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-20A3E3?logo=recharts&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)

## Backend

![Next.js API Routes](https://img.shields.io/badge/Next.js%20API%20Routes-000000?logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?logo=zod&logoColor=white)

## Autenticação & Pagamentos

![Clerk](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?logo=stripe&logoColor=white)

## DB & Infra

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2671E5?logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## Dev Tools

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-000000?logo=husky&logoColor=white)
![lint-staged](https://img.shields.io/badge/lint--staged-000000?logo=lint-staged&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![Prisma Migrate](https://img.shields.io/badge/Prisma%20Migrate-2D3748?logo=prisma&logoColor=white)

## Dependências notáveis

```typescript
@clerk/nextjs, @prisma/client, react-hook-form, zod, recharts, tailwindcss, lucide-react, date-fns, class-variance-authority, clsx
```

## Arquitetura (visão geral)

- Monorepo/Monolito Next.js com separação clara entre frontend e API routes.
- Prisma centraliza modelo de dados e migrações → PostgreSQL.
- Serviços externos: Clerk (auth), Stripe (pagamentos), serviço de IA (OpenAI ou similar) para análise/insights.
- CI: pipeline que roda lint → testes → build → deploy para branch main.
- Fluxo simplificado: Browser ↔ Next.js (UI + API) ↔ Prisma ↔ PostgreSQL Serviços externos: Clerk (autenticação) e Stripe (pagamentos) integrados via APIs.

# Rodando localmente (Quick Start)

## Clone

```bash
git clone https://github.com/thailsonAlmeida/prototype-finance-ai.git
cd prototype-finance-ai
```

## Copie variáveis de ambiente

```bash
cp .env.example .env
```

## Instale dependências

```bash
npm install

```

## Banco e migrations (Prisma)

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

## Rodar em dev

```bash
npm run dev
```

## Scripts úteis

- dev: next dev
- build: next build
- start: next start
- lint: eslint .
- format: prettier --write .
- prisma:migrate: prisma migrate dev
- prisma:seed: prisma db seed
