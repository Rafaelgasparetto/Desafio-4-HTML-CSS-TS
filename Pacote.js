"use strict";
//                          Criated by Rafael Gasparetto :)
let inputNome = document.querySelector("#inp_nomeCompleto");
let inputStatus = document.getElementsByName("result");
let inputData = document.querySelector("#data");
let DataCadastro = document.querySelector(".data_cadastro");
let inputDescricaoTextArea = document.querySelector("#inp_descricao");
let botao_cadastrar = document.querySelector('#cadastro_btn');
let resp_cadastro = document.querySelector("#resposta_cadastro");
let resp_data = document.querySelector("#resposta_data");
// variaveis para validação
let condicao_nome;
let condicao_data;
let condicao_descricao;
let condicao;
let dataMaior;
// let botaoCondicao:boolean
//novo cartão para armazenamento dos input
let novosCards = [];
// Classe Abstrata Card com SET / GET / CONSTRUTOR
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
    set Nome(_nome) {
        this.nome = _nome;
    }
    get Descricao() {
        return this.descricao;
    }
    set Descricao(_descricao) {
        this.descricao = _descricao;
    }
    get Data() {
        return this.data;
    }
    set Data(_data) {
        this.data = _data;
    }
    get Status() {
        return this.status;
    }
    set Status(_status) {
        this.status = _status;
    }
    get Id() {
        return this.id;
    }
    set Id(_id) {
        this.id = _id;
    }
}
// Fetch / API do projeto
function ObterCardsApi() {
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
        .then(resposta => resposta.json()) // diz que a resposta é uma resposta.json
        .then((dados) => {
        return dados.map(dadosCard => {
            return new Card(dadosCard.nome, dadosCard.descricao, dadosCard.data, dadosCard.status, dadosCard.id);
        });
    })
        .then(dadosNovosCards => {
        InjetarDados(dadosNovosCards);
        novosCards = dadosNovosCards; // Cria um Array para guardar novos objetos dentro do array 
        console.log(novosCards); // para visualização do array
    });
}
/*----------------------------------------------------AQUI COMEÇA AS FUNCOES--------------------------------------------------*/
/*                  Função para validar o inputs antes de criar Card / ID / Nome / Data / Descricao                          */
function VerificarInputVazio() {
    ValidarNome(condicao_nome); // Chamando a função para validar Nome;
    ValidarInputData(condicao_data); // Chamando a função para validar Data
    ValidarDescricao(condicao_descricao); // Chamando a função para validar Descrição
    ValidarDataViagem(dataMaior); //valida a data do input e a data de Hoje
    if (ValidarNome(condicao_nome) == false ||
        ValidarInputData(condicao_data) == false || //If para saber se tem algum valor passando false para nao deixar cadastrar no array/objeto
        ValidarDescricao(condicao_descricao) == false ||
        ValidarDataViagem(dataMaior) == false) {
        condicao = false;
    }
    else { // if para atribuir false / true para o switch fazer a comparação logo abaixo
        condicao = true;
    }
    switch (condicao) {
        case false:
            resp_cadastro.innerHTML = 'Digite todos os Campos corretamente';
            break;
        //               Switch para fazer a comparação e atribuir na pagina uma mensagem para o usuario se deu certo ou não o cadastro
        default:
            CriarCards();
            resp_cadastro.innerHTML = "Cadastro concluido com sucesso!";
            LimparFormulario();
            break;
    }
}
/*---------------------------------Função para criar um Card com ID------------------------------------------------------------*/
function CriarCards() {
    CriarId(); // cria um ID para o card
    inputNome.value;
    ValidarInputStatus(inputStatus); //                  valida o input Status
    inputData.value;
    inputDescricaoTextArea.value;
    //                                  Embaixo cria um novo objeto Card e coloca o ID criado
    let novoCard = new Card(inputNome.value, inputDescricaoTextArea.value, inputData.value, ValidarInputStatus(inputStatus), CriarId());
    novosCards.push(novoCard); // da um push no array para o novo objeto ir para a ultima posição
    console.log(novosCards); // facil visualização o novo Array com o novo Objeto
    InjetarDados(novosCards); // Coloca o novo Objeto Card na Pagina
}
/*---------------------------------------Função CriarID----------------------------------------------------------------------*/
function CriarId() {
    let maiorId = 0;
    novosCards.map((dadoId, index) => {
        if (Number(dadoId.Id) > maiorId) { // Map no Array para percorrer o ID e colocar ele na ultima posição do Array
            maiorId = Number(dadoId.Id);
        }
    });
    maiorId++;
    return maiorId.toString(); // Converte o ID como String
}
/*-------------Botao Cadastrar faz a comparação dos inputs para depois chamar a função criar se caso estiver tudo okay!------*/
botao_cadastrar.addEventListener('click', VerificarInputVazio);
/*----------------------------------------------FUNÇOES DE VALIDAÇÔES--------------------------------------------------------*/
/*                                 Se qualquer uma der False não vai deixar alocar/criar dentro do Objeto                    */
function ValidarNome(condicao_nome) {
    if (inputNome.value == "") {
        condicao_nome = false;
    }
    else { // ATRIBUI TRUE / FALSE PARA A CONDIÇÃO INPUTNOME
        condicao_nome = true;
    }
    // console.log(condicao_nome);
    return condicao_nome;
}
/*----------------------------------------------~~~~~~~~~~~~~~~~~~~~~~~~-----------------------------------------------------*/
function ValidarInputData(condicao_data) {
    if (inputData.value == "") {
        condicao_data = false;
    }
    else { // ATRIBUI TRUE / FALSE PARA A CONDIÇÃO INPUTDATA
        condicao_data = true;
    }
    return condicao_data;
}
/*----------------------------------------------~~~~~~~~~~~~~~~~~~~~~~~~-----------------------------------------------------*/
function ValidarInputStatus(status) {
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
        if (status[i].checked) {
            if (status[i].value == 'true') {
                status = true;
            }
            else { // ATRIBUI TRUE / FALSE PARA A CONDIÇÃO STATUS
                status = false;
            }
        }
    }
    return status;
}
/*----------------------------------------------~~~~~~~~~~~~~~~~~~~~~~~~-----------------------------------------------------*/
function ValidarDescricao(condicao_descricao) {
    if (inputDescricaoTextArea.value == "") {
        condicao_descricao = false;
    }
    else { // ATRIBUI TRUE / FALSE PARA A CONDIÇÃO STATUS
        condicao_descricao = true;
    }
    return condicao_descricao;
}
/*----------------------------------------------~~~~~~~~~~~~~~~~~~~~~~-------------------------------------------------------*/
function ValidarDataViagem(dataMaior) {
    //----------------Data De Hoje
    let nowDate = new Date();
    let diaHoje = (nowDate.getDate());
    let mesHoje = (nowDate.getMonth() + 1);
    let anoHoje = (nowDate.getFullYear());
    //----------------data do Input
    let newDate = new Date(DataCadastro.value);
    let diaInput = (newDate.getDate() + 1);
    let mesInput = (newDate.getMonth() + 1);
    let anoInput = (newDate.getFullYear());
    if (nowDate > newDate) {
        dataMaior = false;
    }
    else { // ATRIBUI TRUE / FALSE PARA SABER SE É UMA DATA VALIDA
        dataMaior = true;
    }
    switch (dataMaior) {
        case false:
            resp_data.innerHTML = 'Coloque uma data Valida!';
            break;
        //                       AQUI ATRIBUI UMA MSG PARA O USUARIO QUE A DATA ESTA INVALIDA
        default:
            resp_data.innerHTML = '';
            break;
    }
    return dataMaior;
}
/*----------------------------------------------FIM DAS FUNÇOES DE VALIDAÇÃO-----------------------------------------------*/
/*-----------------------------------------Função para limpar os Inputs quando o cadastro for concluido--------------------*/
function LimparFormulario() {
    inputNome.value = '';
    inputData.value = ''; // LIMPA O FORMULARIO PARA NÃO FICAR CONFUSO/ NÃO DUPLICAR O CADASTRO
    inputStatus.value = '';
    inputDescricaoTextArea.value = '';
}
/*-------------------------------------------Função para colocar no formato exato da data---------------------------------*/
function TransformarDataTexto(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getDate() + 1).toString().padStart(2, "0") + "/" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") + "/" +
        newDate.getFullYear().toString()); //PadStart(numero de digitos obrigatorio (2), adiciona um 0 se não tiver dois digitos (0) ) 
    return dataString;
}
/*------------------------------------Função para colocar os Cards no HTML automaticamente--------------------------------*/
function InjetarDados(arrayNovosCards) {
    resp_cadastro.innerHTML = ''; // limpar a resposta do cadastro do usuario
    let cardNovo = document.querySelector('#contain2');
    cardNovo.innerHTML = ''; // limpar o card para não duplicar os cards no HTML
    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div id="contain2">
        <div class="card">
            <h3 id="pacote01">${arrayNovosCards[i].Nome}</h3>
            <p class="p_text01">
              ${arrayNovosCards[i].Descricao}
            </p>
            <p class="p_data01"> Data da Viagem: ${TransformarDataTexto(arrayNovosCards[i].data)}</p>
            <div class="btn_localizacao">
                <button class="btn_editar01" id= "editar" onclick = "EditarPacote(${arrayNovosCards[i].id})" >Editar</button>
                <button class="btn_excluir01" id= "excluir" onclick = "ExcluirPacote(${arrayNovosCards[i].id})" >Excluir</button>
            </div>
        </div>
    </div>`;
    }
}
/*----------------------------------------------Função para Editar Array/objeto------------------------------------------*/
function EditarPacote(id) {
    /*             aqui nessa parte tem um bug que irei arrumar mais pra frente,
        (se voce clicar no botao de editar sem concluir o cadastro ele exclui o card que estava editando )*/
    // if(botaoCondicao == undefined){
    //     botaoCondicao = true
    // }
    // console.log("segunda parte "+botaoCondicao);
    // if(inputNome.value == "" && inputDescricaoTextArea.value == ""){ 
    //     botaoCondicao = true
    // }else if (inputNome.value != "" || inputDescricaoTextArea.value != ""){
    //     botaoCondicao = false
    // }
    // TENTATIVA FRUSTADA DEPOIS EU VOU CONSEGUIR :)
    // if(botaoCondicao == true){
    //     ExcluirPacote(id);
    //     console.log("botao condicao TRUE")
    // }else{
    //     console.log("botao Condicao esta saindo como falso")
    // }
    let indice;
    indice = SelecionarCardId(id);
    inputNome.value = novosCards[indice].Nome;
    inputData.value = InverterData(novosCards[indice].Data);
    inputStatus.value = novosCards[indice].Status;
    inputDescricaoTextArea.value = novosCards[indice].Descricao;
    ExcluirPacote(id);
    InjetarDados(novosCards);
}
/*----------------------------------------------Função para inverter Data com "-" -----------------------------------------*/
function InverterData(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getFullYear()).toString() + "-"
        + (newDate.getMonth() + 1).toString() + "-"
        + newDate.getDate().toString());
    return dataString;
}
/*----------------------------------------------Função para Excluir objeto do array-----------------------------------------*/
function ExcluirPacote(id) {
    let indice;
    indice = SelecionarCardId(id); // pega o Id do Array/Objeto exclui
    novosCards.splice(indice, 1); // adiciona novo elemento e remove antigo
    InjetarDados(novosCards);
}
/*----------------------------------------------Função para criar ID para cara objeto-----------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------------------------*/
window.onload = () => {
    ObterCardsApi();
};
