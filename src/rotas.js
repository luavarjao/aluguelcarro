const express = require ('express');

const rotas = express();

const { consultarCarros, adicionarCarro, alugarCarro, devolucaoCarro } = require ('./controladores/aluguelcarros')

rotas.get ('carros/consulta', consultarCarros),

rotas.post ('carros/adicionarCarro', adicionarCarro);

rotas.post ('carros/alugarCarro', alugarCarro);

rotas.post ('carros/devolucao/:id', devolucaoCarro);

module.exports = rotas; 

