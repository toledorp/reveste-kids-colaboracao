# Reveste Kids - Plataforma de Troca de Roupas

Aplicação fullstack desenvolvida com Node.js, Express, MongoDB Atlas, React e Cloudinary, permitindo a troca de roupas entre usuários através de uma experiência moderna inspirada em redes sociais como TikTok e Instagram.

---

# Sobre o projeto

O Reveste Kids é uma plataforma onde usuários podem:

* Cadastrar roupas
* Curtir peças de outros usuários
* Criar matches automáticos
* Explorar closets públicos
* Receber notificações em tempo real
* Conversar e negociar trocas

Tudo isso com uma interface moderna, fluida e responsiva.

---

# Objetivo

Projeto desenvolvido para a disciplina Desenvolvimento Web III, com foco em:

* Construção de aplicação fullstack real
* Integração com serviços externos
* Arquitetura moderna
* Responsividade
* Experiência mobile-first
* Boas práticas de desenvolvimento
* Versionamento com Git e GitHub

---

# Tecnologias utilizadas

## Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT
* Dotenv
* Swagger UI
* Nodemailer
* Socket.IO
* Multer
* Cloudinary SDK

---

## Frontend

* React
* Vite
* React Router DOM
* CSS moderno
* Fetch API
* LocalStorage

---

## Upload de mídia

* Cloudinary

---

## Ferramentas

* Git
* GitHub
* Swagger
* Insomnia
* Vercel
* Render

---

# Funcionalidades

## Autenticação

* Cadastro de usuários
* Login com JWT
* Persistência de sessão
* Proteção de rotas
* Logout seguro

---

## Gestão de roupas

* Cadastro de peças
* Upload de múltiplas imagens
* Upload de vídeos
* Edição completa
* Exclusão de peças
* Organização por closet

---

## Feed estilo TikTok

* Scroll vertical fluido
* Reprodução automática de vídeos
* Suporte a imagens e vídeos
* Carousel de mídia
* Layout responsivo
* Navegação mobile-first
* Interações rápidas

---

## Likes

* Curtir peças
* Remover curtidas
* Bloqueio de auto-like
* Persistência de curtidas

---

## Matches

* Match automático por interesse mútuo
* Interface de conversa
* Visualização das peças envolvidas
* Histórico de interações

---

## Central de notificações

* Notificações internas em tempo real
* Atualização automática via WebSocket
* Contador de notificações
* Alertas visuais
* Alerta sonoro para novas notificações

---

## Notificações por e-mail

* Integração com Nodemailer
* Aviso automático de curtidas
* Comunicação entre usuários
* Templates personalizados

---

## Busca de closets públicos

* Exploração de closets de outros usuários
* Visualização de peças públicas
* Curtidas diretamente pela busca
* Filtros de pesquisa
* Navegação responsiva

---

## Meu Closet

* Visualização das próprias peças
* Edição via modal
* Upload e remoção de mídias
* Exclusão de itens

---

## Cadastro de peças

* Interface moderna
* Upload separado de imagens e vídeos
* Preview em tempo real
* Integração com Cloudinary

---

## Tema claro e escuro

* Alternância dinâmica de tema
* Persistência da preferência do usuário
* Ajuste automático de ícones
* Padronização visual entre páginas

---

# Upload com Cloudinary

* Upload direto pelo frontend
* Suporte a imagens e vídeos
* CDN global
* Otimização automática
* Preview em tempo real

## Estrutura de mídia

```json
{
  "media": [
    {
      "type": "image",
      "url": "https://..."
    },
    {
      "type": "video",
      "url": "https://..."
    }
  ]
}
```

---

# Estrutura do projeto

```bash
reveste_kids/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── FeedTikTok.jsx
│   │   │   ├── MyCloset.jsx
│   │   │   ├── AddClothing.jsx
│   │   │   ├── Matches.jsx
│   │   │   ├── SearchClosets.jsx
│   │   │   └── NotificationCenter.jsx
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

# Como executar

## 1. Clonar o projeto

```bash
git clone https://github.com/toledorp/reveste_kids.git
```

---

## 2. Acessar a pasta do projeto

```bash
cd reveste_kids
```

---

## 3. Instalar dependências

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

# Configuração de ambiente

Crie `backend/.env` a partir do arquivo `backend/env-exemplo` e preencha os valores
com as credenciais do seu ambiente. O arquivo `.env` real não deve ser enviado ao Git.

```env
PORT=4000

MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/reveste_kids?retryWrites=true&w=majority

JWTSECRET=sua_chave_jwt

CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_de_aplicativo
EMAIL_FROM=Reveste Kids <seu_email>
```

---

# Executando o projeto

Na raiz do projeto:

```bash
npm run dev
```

Ou separadamente:

## Backend

```bash
cd backend
npm run dev
```

## Frontend

```bash
cd frontend
npm run dev
```

---

# Acessos locais

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:4000
```

Swagger:

```bash
http://localhost:4000/api-docs
```

---

# Deploy

## Frontend

Hospedado na Vercel.

Exemplo:

```bash
https://reveste-kids-sepia.vercel.app
```

---

## Backend

Hospedado na Render.

---

# Autenticação

* JWT
* Login e cadastro
* Proteção de rotas
* Persistência de sessão

---

# API - Principais rotas

## Auth

```bash
POST /user
POST /auth
```

---

## Roupas

```bash
GET /clothes
POST /clothes
PUT /clothes/:id
DELETE /clothes/:id
GET /clothes/user
```

---

## Likes

```bash
POST /like/:id
DELETE /like/:id
```

---

## Matches

```bash
GET /matches
```

---

## Notificações

```bash
GET /notifications
POST /notifications
```

---

# Swagger

Documentação disponível em:

```bash
http://localhost:4000/api-docs
```

---

# Diferenciais

* Interface inspirada no TikTok
* Upload de imagens e vídeos
* Match automático entre usuários
* Sistema de notificações em tempo real
* Busca de closets públicos
* Tema claro/escuro
* UX moderna e responsiva
* Arquitetura fullstack completa
* Integração com Cloudinary
* Estrutura pronta para deploy
* Projeto escalável

---

# Testes

* Insomnia
* Swagger
* Testes manuais
* Testes de integração
* Validação responsiva

---

# Banco de dados

* MongoDB Atlas

---

# Integrações implementadas

* Cloudinary
* MongoDB Atlas
* Nodemailer
* Socket.IO
* Vercel
* Render

---

# Organização das branches

Exemplos de branches utilizadas durante o desenvolvimento:

```bash
main
feat/theme-toggle-camila
feat/search-closets-felipe
feat/notification-center
fix/closet-layout
release/v1.0.0
```

---

# Melhorias futuras

* Sistema completo de trocas
* Chat em tempo real
* Sistema de avaliações
* Geolocalização
* Aplicativo mobile
* Recomendação inteligente de peças
* Integração com IA

---

# Responsividade

Projeto desenvolvido para:

* Desktop
* Tablets
* Smartphones

---

# Segurança

* JWT Authentication
* Hash de senhas com Bcrypt
* Proteção de rotas
* Controle de autenticação
* Validação básica de dados

---

# Autores

* Camila Machado de Souza
* Felipe Guedes
* Kaio Sumikawa
* Ricardo Sugano
* Rogerio Pupo Toledo

---

# Licença

Projeto acadêmico sem fins comerciais.
