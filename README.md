# API de Receitas

## 📋 Índice
- [Visão Geral](#-visão-geral)
- [Documentação Interativa](#-documentação-interativa)
- [Endpoints](#-endpoints)
- [Modelos de Dados](#-modelos-de-dados)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Rate Limiting](#-rate-limiting)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Contribuição](#-contribuição)
- [Suporte](#-suporte)

---

## 🎯 Visão Geral
API RESTful para gerenciamento de receitas culinárias, com sistema de usuários, comentários e curtidas. Desenvolvida em Node.js com Express, TypeScript e MongoDB.

**URL Base:** `http://localhost:3000/api/v1`

---

## 📄 Documentação Interativa
A documentação interativa da API está disponível no SwaggerHub:  
🔗 [https://app.swaggerhub.com/apis-docs/estudos-0a4/myRecipesAPI/1.0.0](https://app.swaggerhub.com/apis-docs/estudos-0a4/myRecipesAPI/1.0.0)

---

## 🔐 Autenticação
A API utiliza autenticação JWT (Bearer Token). Inclua o token no header das requisições:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## 📚 Endpoints

### Autenticação
**Registrar Usuário**  
`POST /auth/register`  
**Body:**
```json
{
  "name": "usuario",
  "email": "usuario@email.com",
  "password": "senha123",
  "profilePicture": "url_da_imagem"
}
```

**Login**  
`POST /auth/login`  
**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Receitas
**Listar Receitas**  
`GET /recipes?page=1&limit=12`

**Buscar Receitas**  
`GET /recipes/search?query=bolo&category=sobremesa&page=1&limit=12`

**Receitas em Destaque**  
`GET /recipes/featured`

**Obter Receita Específica**  
`GET /recipes/{recipeID}`

**Criar Receita**  
`POST /recipes`  
**Body:** (ver modelo Recipe completo)
```json
{
  "title": "Bolo de Chocolate",
  "description": "Um delicioso bolo de chocolate",
  "category": "sobremesa",
  "difficulty": "facil",
  "cookingTime": 45,
  "portions": 8,
  "ingredients": [
    { "name": "Farinha", "quantity": "2 xícaras" },
    { "name": "Açúcar", "quantity": "1 xícara" }
  ],
  "instructions": [
    { "step": 1, "description": "Misture os ingredientes secos" },
    { "step": 2, "description": "Adicione os ovos e misture" }
  ]
}
```

**Editar Receita**  
`PATCH /recipes/{recipeID}`

**Excluir Receita**  
`DELETE /recipes/{recipeID}`

### Comentários
**Listar Comentários**  
`GET /recipes/{recipeID}/comments?page=1&limit=6`

**Criar Comentário**  
`POST /recipes/{recipeID}/comments`  
**Body:**
```json
{
  "text": "Comentário sobre a receita"
}
```

**Editar Comentário**  
`PATCH /recipes/{recipeID}/comments/{commentID}`

**Excluir Comentário**  
`DELETE /recipes/{recipeID}/comments/{commentID}`

### Curtidas
**Verificar Curtida**  
`GET /recipes/{recipeID}/like`

**Curtir/Descurtir**  
`POST /recipes/{recipeID}/like`

**Contagem de Curtidas**  
`GET /recipes/{recipeID}/like/count`

### Usuários
**Informações do Usuário Logado**  
`GET /user/me`

**Informações de Usuário Específico**  
`GET /user/{userID}`

**Atualizar Usuário**  
`PATCH /user/{userID}`

**Receitas Criadas pelo Usuário**  
`GET /user/{userID}/created?page=1&limit=8`

**Receitas Curtidas pelo Usuário**  
`GET /user/{userID}/liked?page=1&limit=8`

---

## 🗃️ Modelos de Dados

**User**
```typescript
{
  _id: string;
  profilePicture: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  socialLinks: {
    discord?: string;
    instagram?: string;
    facebook?: string;
  };
}
```

**Recipe**
```typescript
{
  _id: string;
  createdBy: User;
  image: string;
  title: string;
  description: string;
  category: 'cafe da manha' | 'almoço' | 'jantar' | 'entrada' | 'sobremesa' | 'bebida' | 'lanche' | 'outro';
  difficulty: 'facil' | 'medio' | 'dificil';
  visibility: 'public' | 'private';
  cookingTime: number;
  portions: number;
  videoUrl: string;
  ingredients: Array<{ name: string; quantity: string }>;
  instructions: Array<{ step: number; description: string }>;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Comment**
```typescript
{
  _id: string;
  recipeID: string;
  createdBy: User;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Like**
```typescript
{
  _id: string;
  likedBy: string;
  recipeID: string;
  createdAt: Date;
}
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16+
- MongoDB 5+
- npm ou yarn

### Instalação
Clone o repositório
```bash
git clone https://github.com/seu-usuario/recipes-api.git
cd recipes-api
```

Instale as dependências
```bash
npm install
```

Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo .env com suas configurações
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/recipesdb
JWT_SECRET=seu_jwt_secret_super_seguro
NODE_ENV=development
```

Execute em desenvolvimento
```bash
npm run dev
```

Execute em produção
```bash
npm start
```

---

## 💡 Exemplos de Uso

**Exemplo 1: Criar e Autenticar Usuário**
```javascript
// Registrar usuário
const response = await fetch('/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'chef123',
    email: 'chef@email.com',
    password: 'senhasegura123'
  })
});

// Fazer login
const login = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'chef@email.com',
    password: 'senhasegura123'
  })
});

const { token } = await login.json();
```

**Exemplo 2: Criar Receita**
```
const recipeData = {
  title: "Bolo de Chocolate",
  description: "Um delicioso bolo de chocolate",
  category: "sobremesa",
  difficulty: "facil",
  cookingTime: 45,
  portions: 8,
  ingredients: [
    { name: "Farinha", quantity: "2 xícaras" },
    { name: "Açúcar", quantity: "1 xícara" }
  ],
  instructions: [
    { step: 1, description: "Misture os ingredientes secos" },
    { step: 2, description: "Adicione os ovos e misture" }
  ]
};

const response = await fetch('/api/v1/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(recipeData)
});
```

---

## ⚠️ Tratamento de Erros
A API retorna respostas padronizadas:

**Sucesso**
```
{
  "success": true,
  "data": {...}
}
```

**Erro**
```
{
  "msg": "Mensagem de erro descritiva",
  "statusCode": 400
}
```

**Códigos de Status Comuns**
- 200 - Sucesso
- 201 - Criado com sucesso
- 400 - Bad Request (dados inválidos)
- 401 - Não autorizado
- 403 - Proibido (não é dono do recurso)
- 404 - Não encontrado
- 500 - Erro interno do servidor

---

## 🔒 Rate Limiting
A API implementa rate limiting com limite de 1000 requisições por 15 minutos por IP.

---

## 🛠️ Tecnologias Utilizadas
- Node.js - Runtime JavaScript
- Express.js - Framework web
- TypeScript - Superset JavaScript tipado
- MongoDB - Banco de dados NoSQL
- Mongoose - ODM para MongoDB
- JWT - Autenticação por tokens
- Joi - Validação de dados
- Helmet - Segurança de headers HTTP
- CORS - Cross-Origin Resource Sharing

---

## 🤝 Contribuição
- Faça o fork do projeto
- Crie uma branch para sua featur
- Commit suas mudanças
- Push para a branch
- Abra um Pull Request

---

## 📞 Suporte
Para dúvidas e sugestões, entre em contato.
