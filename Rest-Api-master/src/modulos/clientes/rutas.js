const express = require('express');

const respuestas = require('../../red/respuestas')
const controlador = require('../clientes/controlador.js');

const router = express.Router();

router.get('/', function(req,res){
    const todos = controlador.todos();
    respuestas.sucesss(req,res, todos, 200);
})

module.exports = router;