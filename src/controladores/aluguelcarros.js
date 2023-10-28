const dados = require ('../bancodedados');

let identificador = dados[dados.length-1].identificador+1;

const consultarCarros = (req, resp) => {
    console.log(dados)
    return resp.json(dados)
}

const adicionarCarro = (req, resp) =>{ 
    const {Carros, Diaria, Cambio, Disponiveis } = req.body;

    if (!Carros || !Diaria || !Cambio || !Disponiveis) {
        return resp.status(400).json({mensagem: "Dados incompletos"})
    }

    if (isNaN(Diaria)) {
        return resp.status(400).json({mensagem: "Valor da diária inválido"})
    }

    if (isNaN(Disponiveis)){
        return resp.status(400).json({mensagem: "Verificar quantidade de carros disponíveis"})
    }

    if (Cambio != "Manual" && Cambio != "Automatico"){
        return resp.status(400).json({mensagem: "Verificar cambio do carro"})
    }

    const novoCarro = {
        identificador,
        Carros,
        Diaria,
        Cambio,
        Disponiveis
    }

    identificador++;

    return resp.status(201).json({mensagem: "Carro adicionado!", novoCarro})
    


}

const alugarCarro = (req, resp) => {
    const {identificador, forma_pagamento, diarias} = req.body;

    if(!identificador || !forma_pagamento || !diarias){
        return resp.status(400).json({mensagem: "Dados incompletos"})
    }

    if(isNaN(identificador)){
        return resp.status(400).json({mensagem: "Identificador inválido"})
    }

    if(forma_pagamento != "Cartao" || forma_pagamento != "PIX"){
        return resp.status(400).json({mensagem: "Forma de pagamento inválida"})
    }

    if (isNaN(diarias)){
        return resp.status(400).json({mensagem: "Verificar diarias"})
    }

    const carro = dados.findIndex ( (dado) => {
        return dado.identificador === identificador;
    })

    if(carro < 1) {
        return resp.status(400).json({mensagem: "Grupo não encontrado"})
    }

    let valorFinal = 0;

    if (forma_pagamento === "PIX"){
        valorFinal = dados[carro].Diaria * 0.90 * diarias;
    } else {
        valorFinal = dados[carro].Diaria * diarias;
    }

    if(dados[carro].Disponiveis >0){
        dados[carro].Disponiveis -1;
    } else {
        return resp.status(400).json({mensagem: "Não há carros disponiveis nesta categoria"})
    }

    const Carros = dados[carro].Carros;

    const aluguel = {
        identificador,
        Carros,
        Diarias: diarias,
        Pagamento: forma_pagamento,
        Valor: valorFinal
    }

    return resp.status(200).json(aluguel)

}

const devolucaoCarro = (req, resp) => {
    const { identificador } = req.params.id;
    if(isNaN(identificador) || !identificador){
        return resp,status(400).json({mensagem: "Verificar id do carro"})
    }

    const carro = dados.findIndex ( (dado) => {
        return dado.identificador === identificador;
    })

    if(carros <0) {
        return resp.status(400).json({mensagem: "Carro não identificado"})
    }

    dados[carro].Disponiveis++;

    return resp.status(200)
}

module.exports = {
    consultarCarros, 
    adicionarCarro, 
    alugarCarro, 
    devolucaoCarro
}