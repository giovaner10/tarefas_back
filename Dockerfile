# Usa a imagem do Node.js baseada no Alpine para a construção da aplicação e nomeia este estágio como 'builder'
FROM node:18-alpine AS builder  
# Define o diretório de trabalho dentro do contêiner como /app
WORKDIR /app  
# Copia os arquivos package.json e package-lock.json para o diretório de trabalho do contêiner
COPY package*.json ./  
# Instala as dependências do projeto, incluindo as dependências de desenvolvimento, usando 'npm ci' (instalação limpa)
RUN npm ci --include=dev  
# Copia todos os arquivos do diretório local (onde o Dockerfile está) para o diretório /app no contêiner
COPY . .  

# Usa a imagem Node.js baseada no Alpine para a execução da aplicação em produção e nomeia este estágio como 'production'
FROM node:18-alpine AS production  
# Define novamente o diretório de trabalho como /app no estágio de produção
WORKDIR /app  
# Define a variável de ambiente NODE_ENV como 'production', indicando que a aplicação está em ambiente de produção
ENV NODE_ENV=production  
# Define a URL de conexão com o MongoDB para o ambiente de produção
ENV MONGODB_URI="mongodb://root:example@mongo:27017"  
# Define a variável de ambiente PORTA com o valor 3000, que será a porta da aplicação
ENV PORTA=3000  
# Copia os arquivos do estágio 'builder' para o estágio de produção, incluindo o código e as dependências
COPY --from=builder /app .  
# Remove as dependências de desenvolvimento para otimizar o tamanho da imagem para produção
RUN npm prune --production  
# Exponha a porta definida pela variável de ambiente PORTA (3000)
EXPOSE ${PORT}  
# Comando para rodar a aplicação quando o contêiner for iniciado, executando o arquivo 'main.js'
CMD ["node", "main.js"]
