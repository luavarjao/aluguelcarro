# aluguelcarro
Programa da aluguel de carro indicado para locadoras de veículos.

# Instruções

Uma locadora de carro utiliza o programa para facilitar o controle do alugel dos carros.
O programa funciona com um banco de dados onde informa os grupos, os valores, detalhes dos veículos e quantidade disponível.
Segue abaixo instruções como funciona o programa:

## Consultar carros disponíveis

### `GET` `carros/consulta`

Esse end-point lista todos os grupos com os detalhes de disponibilidade dos carros.

## Adicionar carro

### `POST` `carros/adicionarCarro`

Esse end-point adiciona um novo grupo de carros.
É obrigatório que todos os campos sejam informados.
Exemplo de como deve estar o objeto:
   
   {   
    Carros: "Fiat Mobi 1.0, Renault Kwid 1.0 ou similar",
    Diaria: 78.95,
    Cambio: "Manual",
    Disponiveis: 3
    }

Os dados informados deverão obrigatoriamente:
- Carros: Informar os carros disponíveis no novo grupo;
- Diaria: Informar o valor da diária;
- Cambio: Informar se é manual ou automatico;
- Disponiveis: Informar a quantidade de carros disponiveis para aluguel.

## Alugar carro

### `POST` `carros/alugarCarro`

Esse end-point é utilizado para quando há aluguel de carro.
É obrigatório que todos os campos sejam informados.
Com a finalização da função, um carro será subtraido nos Disponíveis do grupo informado
Caso não tenha carros disponíveis no grupo solicitado, será informado pelo sistema.
Exemplo de como deve estar o objeto:
{
	"identificaro": 1,
	"forma_pagamento": "PIX",
	"diaria": 2
}
Os dados informados deverão obrigatoriamente:
- Identificador: Informar o grupo de carros que será utilizado;
- Forma de pagamento: Informar forma de pagamento - Cartão ou PIx (Esse útilmo contem 10% de desconto)
- Diárias: Informar a quantidade de diárias que utilizará o carro.

## Devolução caro

### `POST` `carros/devolucao/:id`

Esse end-point é utilizado para devolução de um carro alugado.
É obrigatório informar qual grupo pertence o carro que será devolvido.
Com a finalização da função, um carro será adicionado nos Disponíveis do grupo informado.
