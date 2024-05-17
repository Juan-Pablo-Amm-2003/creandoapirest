const express = require('express');
const config = require("./config");

const clientes = require('../src/modulos/clientes/rutas.js');
const app = express();

//configuracion
app.set('port', config.app.port);

//rutas
app.use("/api/clientes", clientes)


module.exports = app;
