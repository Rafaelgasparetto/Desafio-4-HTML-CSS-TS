"use strict";
// // Bloco de cadastrar Pacote
// let pacoteNome = document.querySelector('#inp_nomeCompleto');
// let pacoteAtivo = document.querySelector('#ativo');
// let pacoteInativo = document.querySelector('#inativo');
// let dataViagem = document.querySelector('#data');
// let descricao_viagem = document.querySelector('#inp_descricao');
// let botao_cadastrar = document.querySelector('#cadastro_btn');
// // let teste = document.querySelector('#teste');
// // Bloco 01 dos Cards de Viagens
// let pacote01 = document.querySelector('#pacote01');
// let descricao01 = document.querySelector('.p_text01');
// let card_data01 = document.querySelector('.p_data01');
// let btn_editar01 = document.querySelector('.btn_editar01');
// let btn_escluir01 = document.querySelector('.btn_excluir01');
let inputNome = document.querySelector("#inp_nomeCompleto");
let inputStatus = document.getElementsByName("result");
let inputData = document.querySelector("#data");
let inputDescricaoTextArea = document.querySelector("#inp_descricao");
let botao_cadastrar = document.querySelector('#cadastro_btn');
//novo cartão para armazenamento dos input
let novosCards = [];
class Card {
    constructor(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
    get Nome() {
        return this.nome;
    }
    set Nome(value) {
        this.nome = value;
    }
    get Descricao() {
        return this.descricao;
    }
    set Descricao(value) {
        this.descricao = value;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Status() {
        return this.status;
    }
    set Status(value) {
        this.status = value;
    }
    get Id() {
        return this.id;
    }
    set Id(value) {
        this.id = value;
    }
}
function obterCardsApi() {
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
        .then(resposta => resposta.json())
        .then((dados) => {
        return dados.map(dadosCard => {
            return new Card(dadosCard.nome, dadosCard.descricao, dadosCard.data, dadosCard.status, dadosCard.id);
        });
    })
        .then(dadosNovosCards => {
        InjetarDados(dadosNovosCards);
        novosCards = dadosNovosCards;
        console.log(novosCards);
        // chamar funçoes apartir daqui
    });
    // só pode chamar funçoes apartir daqui (innerHTML)
}
function criarCards() {
    criarId();
    inputNome.value;
    ValidarInputStatus(inputStatus);
    inputData.value;
    inputDescricaoTextArea.value;
    // console.log("lembrar de corrigir o ID");
    let novoCard = new Card(inputNome.value, inputDescricaoTextArea.value, inputData.value, ValidarInputStatus(inputStatus), criarId());
    novosCards.push(novoCard);
    console.log(novosCards);
    InjetarDados(novosCards);
    LimparFormulario();
}
function criarId() {
    let maiorId = 0;
    novosCards.map((dadoId, index) => {
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id);
        }
    });
    maiorId++;
    return maiorId.toString();
}
botao_cadastrar.addEventListener('click', criarCards);
function ValidarInputStatus(status) {
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
        if (status[i].checked) {
            if (status[i].value == 'true') {
                status = true;
            }
            else {
                status = false;
            }
        }
    }
    return status;
}
// novosCards[1].Status = true;
// console.log(ValidarInputStatus(novosCards[1]));
function dataTexto(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getDate()).toString() + "/"
        + (newDate.getMonth() + 1).toString() + "/"
        + newDate.getFullYear().toString());
    return dataString;
}
// novosdados.push para adicionar o "card"
function InjetarDados(arrayNovosCards) {
    // let converterData = formatarData (data)
    let cardNovo = document.querySelector('#contain2');
    cardNovo.innerHTML = '';
    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div id="contain2">
        <div class="card">
            <h3 id="pacote01">${arrayNovosCards[i].Nome}</h3>
            <p class="p_text01">
              ${arrayNovosCards[i].Descricao}  
            </p>
            <p class="p_data01"> Data da Viagem: ${dataTexto(arrayNovosCards[i].data)}</p>
            <div class="btn_localizacao">
                <button class="btn_editar01" id= "editar" onclick = "editar(${arrayNovosCards[i].id})" >Editar</button>
                <button class="btn_excluir01" id= "excluir" onclick = "excluir(${arrayNovosCards[i].id})" >Excluir</button>
            </div>
        </div>
    </div>`;
    }
    // console.log(dataTexto(arrayNovosCards[1].data));
}
function editar(id) {
    // EDITAR pacote
    let indice;
    indice = SelecionarCardId(id);
    inputNome.value = novosCards[indice].Nome;
    inputData.value = inversaoData(novosCards[indice].Data);
    inputStatus.value = novosCards[indice].Status;
    inputDescricaoTextArea.value = novosCards[indice].Descricao;
    excluir(id);
    InjetarDados(novosCards);
}
function LimparFormulario() {
    inputNome.value = '';
    inputData.value = '';
    inputStatus.value = '';
    inputDescricaoTextArea.value = '';
}
function inversaoData(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getFullYear()).toString() + "-"
        + (newDate.getMonth() + 1).toString() + "-"
        + newDate.getDate().toString());
    return dataString;
}
function excluir(id) {
    // EXCLUIR PACOTE
    let indice;
    indice = SelecionarCardId(id);
    novosCards.splice(indice, 1);
    InjetarDados(novosCards);
}
function SelecionarCardId(id) {
    let indice = 0;
    for (let i = 0; i < novosCards.length; i++) {
        if (novosCards[i].Id == id) {
            indice = i;
        }
    }
    console.log(indice);
    return indice;
}
window.onload = () => {
    obterCardsApi();
};
// arrayNovosCards.map((x: any)=>console.log(x))
