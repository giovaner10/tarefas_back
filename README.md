# API de Tarefas (Node.js)

## Pré-requisitos
- Docker
- Node.js 18+

# EXECUTE APOS O FRONT E O MONGO, RESPECTIVAMENTE


## Execução com Docker

1. Construa a imagem:

```
docker build -t tarefas-back .
```


2. Inicie, detalhes: o banco mongo ja deve estar ativo e ja deve existir a network (executar front primeiro)

```
docker run -d --name tarefas-back --network mynetwork -p 3000:3000 tarefas-back
```


3. vars .env

 Define a URL de conexão com o MongoDB para o ambiente de produção
ENV MONGODB_URI="mongodb://root:example@mongo:27017"  
Define a variável de ambiente PORTA com o valor 3000, que será a porta da aplicação
ENV PORTA=3000  

4. img no docker hub

https://hub.docker.com/r/giovanerr10/tarefas-back

para usar:
```
docker pull giovanerr10/tarefas-back:v1

```
