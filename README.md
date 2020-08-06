# node-store

## Introdução

```
Esse projeto faz parte de um desafio de uma aplicação de microsservicos para fazer um CRUD de uma loja genérica. Algumas das regras são sua construção em nodejs, CRUD, persistência em banco nosql - com busca paginada, autenticação e boas práticas de código
```

## Tecnologias

-   Node v12.18.3 com typescript
-   Mongodb
-   Express
-   Testes unitários e integrados com jest, jest-mock-extended e supertest
-   Mongoose para conexão com banco mongo
-   Autenticação JWT utilizando middlewares do express e o jsonwebtoken
-   Docker e Docker-compose

# Setup

Requer uma versão do node instalado, preferencialmente node v12+

Instalar as dependencias, subir o ambiente e testar.

### Instalar dependências

```bash
$ npm install
```

### Subir o docker-compose com mongo

```bash
$ docker-compose up
```

### Rodar testes e/ou com cobertura

```bash
$ npm run test
$ npm run test:coverage
```

### Compilar e rodar local no modo de produção

```bash
$ npm run build | npm run start:prod
```

### Gerar imagem e rodar no ambiente integrado

`Observação: renomear o nome da imagem no docker-compose-prod.yml e a versão no .env`

```bash
$ docker build -t rpolnx/nome_da_imagem:versao .
$ docker-compose -f docker-compose-prod.yml up
```

# Estrutura de pastas e Arquitetura

## Nível principal:

-   `src` - contendo arquivos referentes ao projeto
-   `test` - contendo arquivos do escopo de teste
-   `dist` - pasta de output de compilação

## Estrutura interna:

`common` - contendo classes utilizadas por toda aplicação como exceções e interfaces genéricas

`config` - arquivos de configurações gerais da aplicação

`products` - módulo de produtos

`routes` - todas as rotas da aplicação

---- `app.ts` - configurações de middlewares e coisas do express

---- `index.ts` - boostrap da aplicação

## Boas práticas na arquitetura

```
Entre as camadas foi aplicado o princípio de inversão de dependência, podendo receber por injeção quem fizer a implementação das interfaces. Esse modelo fui muito útil principalmente para realizar testes unitários mockando camadas inferiores.
```

## Camadas da aplicação

-   `routes` - recebe a requisição e envia para o controller
-   `controller` - processa lógicas de validações mais simples
-   `service` - realiza as principais regras de negócio da aplicação
-   `repository` - adapta a estrutura de comunicação com o banco de dados

# Rotas

## Autenticação

-   `POST /authenticate`

```json
{
    "user": "user-to-access",
    "password": "pass"
}
```

`Configurar no .env da aplicação para retornar o token de acesso às rotas`

## CRUD de produtos requerendo autenticação

-   `GET /products?page=0`
    -   Retorna todos os produtos por página
    -   query_parameter: page (default página 0 e 20 items por página)
-   `GET /products/{id}`
    -   Retorna um produto por {id}
-   `POST /products`
    -   Cria um produto
-   `PUT /products/{id}`
    -   Altera um produto por {id}
-   `DELETE /products/{id}`
    -   Deleta um produto por {id}

## Collection

-   Coleção de rotas do insomnia rest client na pasta `collections`

# Infraestrutura rodando

-   Através de docker-compose e variaveis de ambiente .env
-   Rodando na url:
