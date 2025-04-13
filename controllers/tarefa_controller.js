const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa');

// GET / => retornar todos os registros
router.get('/', async (req, res) => {
  res.json(await Tarefa.find());
});

// GET /:id => retornar todos UM registro com o id informado
router.get('/:id', async (req, res) => {
  res.json(await Tarefa.findById(req.params.id));
});

// POST / => adicionar um novo registro
router.post('/', async (req, res) => {
  res.json(await new Tarefa(req.body).save());
});

// PUT /:id => alterar UM registro com o id informado
router.put('/:id', async (req, res) => {
  res.json(await Tarefa.findByIdAndUpdate(req.params.id, req.body));
});

// DELETE /:id => remover UM registro com o id informado
router.delete('/:id', async (req, res) => {
  res.json(await Tarefa.findByIdAndRemove(req.params.id));
});

module.exports = router;
