const PORTA = process.env.PORTA;
const URL_BANCO_DE_DADOS = process.env.MONGODB_URI;

// Importando bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Criando o servidor web
const app = express();

// Configurando o servidor web (middleware)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conecto os controllers
app.use('/tarefas', require('./controllers/tarefa_controller'));

// Conectando ao banco de dados
console.log('Conectando ao banco de dados...');
mongoose.connect(URL_BANCO_DE_DADOS).then(() => {
  console.log('Conectado ao banco de dados com sucesso!');

  // Inicializar dados no banco de dados
  inicializarDados();

  // Iniciando o servidor web
  console.log('Iniciando o servidor web...');
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
});

// Função para inicializar dados no banco de dados
const Tarefa = require('./models/tarefa');

// Função para verificar e inserir dados iniciais
async function inicializarDados() {
  try {
    const count = await Tarefa.countDocuments(); // Usando countDocuments() com await

    if (count == 0) {
      // Se não houver tarefas no banco, insira dados iniciais
      const tarefasIniciais = [
        { titulo: 'Tarefa 1' },
        { titulo: 'Tarefa 2' },
        { titulo: 'Tarefa 3' },
      ];

      await Tarefa.insertMany(tarefasIniciais); // Usando insertMany() com await
      console.log('Tarefas iniciais inseridas com sucesso!');
    }
  } catch (err) {
    console.error('Erro ao verificar/inserir tarefas iniciais:', err);
  }
}

