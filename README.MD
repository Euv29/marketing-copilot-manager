<p align="center">
     <img src="/frontend/public/marco.ai.png" alt="Marco AI Logo" width="200"/>
</p>

# Gerenciador de Marketing Copilot (Marco.AI)

## Descrição

O Gerenciador de Marketing Copilot é uma ferramenta baseada em IA para gerenciar marketing digital e mídias sociais. A ferramenta visa ajudar micro e pequenas empresas a criar e gerenciar suas contas, analisar engajamento e fornecer conselhos para melhorar páginas e conteúdos, tanto orgânicos quanto pagos, minimizando custos com consultorias de marketing.

## Funcionalidades

- Recebimento e análise de dados de mídias sociais
- Monitoramento e automação de respostas aos clientes
- Criação e publicação de conteúdo
- Painel principal para visualização de métricas
- Página de conteúdo publicado
- Registro e login de usuários
- Autenticação e autorização com JWT
- Rotas protegidas para diferentes níveis de acesso (usuário e administrador)

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
marketing-copilot-manager/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── build/
│   ├── public/
│   │   ├── marco.ai.png
│   │   └── index.html
│   ├── src/
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginPage.js
│   │   │   │   └── RegisterPage.js
│   │   │   ├── admin/
│   │   │   │   └── AdminDashboard.js
│   │   │   ├── user/
│   │   │   │   └── UserDashboard.js
│   │   │   └── NotFoundPage.js
│   │   ├── components/
│   │   │   └── PrivateRoute.js
│   │   └── styles/
│   │       └── App.css
│   ├── package.json
│   └── .env
├── .gitignore
├── Procfile
├── README.md
└── package.json
```

## Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT, Passport.js
- **Integrações**: Facebook, Instagram, TikTok
- **Containerização**: Docker, Docker Compose

## Pré-requisitos

- Docker
- Docker Compose

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/marketing-copilot-manager.git
    cd marketing-copilot-manager
    ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    DATABASE_URL=postgresql://mc_user:password@db:5432/marketing_copilot
    REACT_APP_API_URL=http://localhost:5000
    FACEBOOK_APP_ID=seu_facebook_app_id
    FACEBOOK_APP_SECRET=seu_facebook_app_secret
    TIKTOK_CLIENT_KEY=seu_tiktok_client_key
    TIKTOK_CLIENT_SECRET=seu_tiktok_client_secret
    TIKTOK_ACCESS_TOKEN=seu_tiktok_access_token
    JWT_SECRET=seu_jwt_secret
    ```

3. Construa e inicie os containers Docker:

    ```sh
    sudo docker-compose up --build
    ```

## Uso

### Registro de Usuário

Acesse o formulário de registro em `http://localhost:3000/register` e preencha os campos `name`, `email`, `password` e `role`.

### Login de Usuário

Acesse o formulário de login em `http://localhost:3000/login` e preencha os campos `email` e `password`.

### Acessando Rotas Protegidas

Use o token JWT recebido para acessar rotas protegidas.

### Painel do Usuário

Acesse a rota do painel do usuário em `http://localhost:5000/api/user-dashboard` com o token JWT no cabeçalho da requisição.

```http
Authorization: Bearer <seu_jwt_token>
```

### Logout

Acesse a rota de logout em `http://localhost:5000/api/logout` para efetuar o logout.

```sh
curl -X POST http://localhost:5000/api/logout
```

## Rodando o Projeto Localmente

### Rodando com Docker

1. Certifique-se de que o arquivo `.env` está configurado corretamente com as variáveis de ambiente necessárias.
2. Execute os seguintes comandos para iniciar os contêineres Docker:

    ```sh
    sudo docker-compose down
    sudo docker-compose up --build
    ```

3. Acesse o frontend em `http://localhost:3000` e faça login para ver as alterações.

### Rodando o Backend

1. Navegue até o diretório `backend`:

    ```sh
    cd backend
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Inicie o servidor:

    ```sh
    npm start
    ```

### Rodando o Frontend

1. Navegue até o diretório `frontend`:

    ```sh
    cd frontend
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Definir a Variável de Ambiente no Terminal:

    ```sh
    export NODE_OPTIONS=--openssl-legacy-provider
    ```

4. Inicie o servidor:

    ```sh
    npm start
    ```

Acesse o frontend em `http://localhost:3000` e o backend em `http://localhost:5000`.

## Deploy no Heroku

1. Faça login no Heroku:

    ```sh
    heroku login
    ```

2. Crie um novo aplicativo no Heroku:

    ```sh
    heroku create nome-do-seu-app
    ```

3. Adicione o repositório remoto do Heroku:

    ```sh
    git remote add heroku https://git.heroku.com/nome-do-seu-app.git
    ```

4. Faça o push do código para o Heroku:

    ```sh
    git push heroku main
    ```

5. Configure as variáveis de ambiente no Heroku:

    ```sh
    heroku config:set DATABASE_URL=postgresql://mc_user:password@db:5432/marketing_copilot
    heroku config:set REACT_APP_API_URL=https://nome-do-seu-app.herokuapp.com
    heroku config:set FACEBOOK_APP_ID=seu_facebook_app_id
    heroku config:set FACEBOOK_APP_SECRET=seu_facebook_app_secret
    heroku config:set TIKTOK_CLIENT_KEY=seu_tiktok_client_key
    heroku config:set TIKTOK_CLIENT_SECRET=seu_tiktok_client_secret
    heroku config:set TIKTOK_ACCESS_TOKEN=seu_tiktok_access_token
    heroku config:set JWT_SECRET=seu_jwt_secret
    ```

6. Acesse o aplicativo no Heroku em `https://nome-do-seu-app.herokuapp.com`.

## Problemas por Resolver

- Melhorar a performance do carregamento de dados no painel principal.
- Corrigir bugs na integração com o TikTok.
- Implementar testes automatizados para todas as funcionalidades.

## Funções a Adicionar

- Integração com mais plataformas de mídia social.
- Funcionalidade de agendamento de postagens.
- Análise de sentimentos dos comentários dos usuários.

## Aspectos a Melhorar

- Interface do usuário para torná-la mais intuitiva.
- Documentação do código para facilitar a contribuição de novos desenvolvedores.
- Segurança das rotas protegidas.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
