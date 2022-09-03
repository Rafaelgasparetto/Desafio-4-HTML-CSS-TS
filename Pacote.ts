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

let inputNome = document.querySelector("#inp_nomeCompleto") as HTMLInputElement;
let inputStatus = document.getElementsByName("result") as any;
let inputData = document.querySelector("#data") as HTMLInputElement;
let inputDescricaoTextArea = document.querySelector("#inp_descricao") as HTMLInputElement; 
let botao_cadastrar = document.querySelector('#cadastro_btn') as HTMLButtonElement; 

//novo cartão para armazenamento dos input
let novosCards: Array<Card> = []



class Card {
    private nome: string;
    private descricao: string;
    private data: string;
    private status: Boolean;
    private id: string;

    public get Nome(): string {
        return this.nome;
    }
    public set Nome(value: string) {
        this.nome = value;
    }

    public get Descricao(): string {
        return this.descricao;
    }
    public set Descricao(value: string) {
        this.descricao = value;
    }

    public get Data(): string {
        return this.data;
    }
    public set Data(value: string) {
        this.data = value;
    }

    public get Status(): Boolean {
        return this.status;
    }
    public set Status(value: Boolean) {
        this.status = value;
    }

    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    constructor(_nome:string, _descricao:string, _data: string, _status: Boolean, _id: string ){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }

}

interface ApiTipagem{
    nome: string;
    descricao: string;
    data: string;
    status: Boolean;
    id: string;
}


function obterCardsApi():void{
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
    .then(resposta=>resposta.json())
    .then((dados:ApiTipagem [])=>{
        return dados.map(dadosCard=>{
                
            return new Card(
                dadosCard.nome,
                dadosCard.descricao,
                dadosCard.data,
                dadosCard.status,
                dadosCard.id
            )
        })
    })
    .then(dadosNovosCards => {
        InjetarDados(dadosNovosCards)
        novosCards = dadosNovosCards
        console.log(novosCards);

        // chamar funçoes apartir daqui


    })
    
    // só pode chamar funçoes apartir daqui (innerHTML)
    
}

function criarCards() {
    criarId()
    inputNome.value;
    ValidarInputStatus(inputStatus);
    inputData.value;
    inputDescricaoTextArea.value;
    // console.log("lembrar de corrigir o ID");
    let novoCard = new Card(inputNome.value, inputDescricaoTextArea.value, inputData.value, ValidarInputStatus(inputStatus), criarId())
    novosCards.push(novoCard);
    console.log(novosCards);
    InjetarDados(novosCards);
    LimparFormulario()
}

function criarId() { 
    let maiorId:number = 0;
    novosCards.map((dadoId, index)=>{
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id)
        }
    })
    maiorId ++
    return maiorId.toString() 
}


botao_cadastrar.addEventListener('click', criarCards);



function ValidarInputStatus(status:any){
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
        if (status[i].checked) {
            if(status[i].value == 'true'){
                status = true;
            }else{
                status = false;
            }
        }
    }
    return status
    
}

// novosCards[1].Status = true;


// console.log(ValidarInputStatus(novosCards[1]));

function dataTexto(data:string):string{
    let newDate = new Date(data)
    let dataString:string;
    dataString=(Number(newDate.getDate()).toString()+"/"
            +(newDate.getMonth()+1).toString()+"/"
            +newDate.getFullYear().toString()
            )
    return dataString
}


// novosdados.push para adicionar o "card"


function InjetarDados(arrayNovosCards:any){
    // let converterData = formatarData (data)
    let cardNovo = document.querySelector('#contain2') as HTMLElement
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
    </div>`
    }

    // console.log(dataTexto(arrayNovosCards[1].data));
   
}

function editar(id:string) {
    // EDITAR pacote

    let indice:number
    
    indice = SelecionarCardId(id)
    inputNome.value = novosCards[indice].Nome
    inputData.value = inversaoData(novosCards[indice].Data) 
    inputStatus.value = novosCards[indice].Status
    inputDescricaoTextArea.value = novosCards[indice].Descricao
    excluir(id);
    InjetarDados(novosCards)
    
    
}

function LimparFormulario(){
    inputNome.value = ''
    inputData.value = ''
    inputStatus.value = ''
    inputDescricaoTextArea.value = ''
}


function inversaoData(data:string):string{
    let newDate = new Date(data)
    let dataString:string;
    dataString=(Number(newDate.getFullYear()).toString()+"-"
            +(newDate.getMonth()+1).toString()+"-"
            +newDate.getDate().toString()
            )
    return dataString
}

function excluir(id:string) {
    // EXCLUIR PACOTE
    let indice:number
    indice = SelecionarCardId(id)
    novosCards.splice(indice,1)
    InjetarDados(novosCards)
}

function SelecionarCardId(id:string):number { 
   
    let indice:number =0
    
    for (let i = 0; i < novosCards.length; i++) {
        if (novosCards[i].Id == id) {
            indice = i
        } 
    }
    console.log(indice);
    return indice
    
}


window.onload = () =>   {
obterCardsApi();
};

// arrayNovosCards.map((x: any)=>console.log(x))