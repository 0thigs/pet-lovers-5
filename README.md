<h1 align="center">Pet Lovers 🐶</h1>

## 🖥️ Sobre o projeto

Este é um app multi-modal de gerenciamento de clientes, produtos e serviços para uma empresa fictícia chamada Pet lovers. O desenvolvimento do projeto foi dividido em 5 **repositórios**, cada um contendo uma aplicação diferente, que são:
- **pet-lovers-1**: Aplicação CLI.
- **pet-lovers-2**: Aplicação React utilizando class components. 
- **pet-lovers-3**: Aplicação React utilizando functional components. 
- **pet-lovers-4**: Aplicação React com backend em Java.
- **pet-lovers-5**: Aplicação React com backend em NodeJs.

---

## 📖 Guia de instalação do Aplicação React com backend em NodeJs (pet-lovers-5)

### Pré-requisitos

- [Git](https://git-scm.com/)
- [NodeJs](https://www.python.org/) pelo menos igual ou acima da versão 20.

### Clone o repositório

```bash
git clone https://github.com/0thigs/pet-lovers-5.git
```

### Instale as dependências na raíz do projeto

```bash
npm install
```

### Acesse a pasta da aplicação backend

```bash
cd apps/backend
```

### Gere os dados no banco de dados

```bash
npm run db:generate
```

### Execute a aplicação backend

```bash
npm run dev
```

> A aplicação backend estará rodando no endereço http://localhost:3333

### Abra outro terminal e acesse a pasta da aplicação frontend

```bash
cd apps/frontend
```

### Execute a aplicação frontend

```bash
npm run dev
```

> A aplicação frontend estará rodando no endereço http://localhost:5173

---
