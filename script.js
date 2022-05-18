//LocalStorage
var novo_hist = window.localStorage.getItem("db_hist");
var novo_hist_entradas = window.localStorage.getItem("db_hist_entradas");
var novo_hist_geral = window.localStorage.getItem("db_hist_geral");

//Seleção de elementos HTML
var selecionarOp = document.getElementById("op");
var saida = document.getElementById("saida");
var tituloSaida = document.getElementById("titulo-saida");
var tabelaDespesas = document.getElementById("tabela-despesas");
var despesasTotais = document.getElementById("despesas-totais");
var entradasTotais = document.getElementById("entradas-totais");
var saldoTotal = document.getElementById("saldo-total");


//JSON de saídas e entradas
var historico_de_saidas = {
        titulo : [],
        valor : []
}

var historico_de_entradas = {
    titulo : [],
    valor : []
}

var historico_geral = {
    html_ : []
}



let list_data = JSON.parse(novo_hist);
let list_data_entradas = JSON.parse(novo_hist_entradas);
let list_data_geral = JSON.parse(novo_hist_geral);


console.log(list_data_geral)

//Push nos elementos do localStorage para o JSON
if(list_data != null){
    for (var i of list_data.titulo) {
        historico_de_saidas.titulo.push(i);
    }

    for (var i of list_data.valor) {
        historico_de_saidas.valor.push(i);
    }
}

if(list_data_entradas != null){
    for (var i of list_data_entradas.titulo) {
        historico_de_entradas.titulo.push(i);
    }

    for (var i of list_data_entradas.valor) {
        historico_de_entradas.valor.push(i);
    }
}

if(list_data_geral != null){
    for (var i of list_data_geral.html_) {
        historico_geral.html_.push(i);
    }
}

//Inserir os valores na tabela ao carregar a página
onload = function(){

    for(k = 0;k < historico_geral.html_.length; k++){
        tabelaDespesas.insertAdjacentHTML('afterbegin', historico_geral.html_[k]);
    }

    somarValores();
}

//Registrar novos valores de entradas e saídas
function registrar(){
    let valorSaida = saida.value;
    let valorTituloSaida = tituloSaida.value;

    //Registro das entradas
    if(selecionarOp.value == 'entrada'){
        if(valorSaida != "" && valorTituloSaida != ""){
            historico_de_entradas.titulo.push(valorTituloSaida);
            historico_de_entradas.valor.push(valorSaida);
            historico_geral.html_.push(`<tr id="entrada-cor"><td>${valorTituloSaida}</td><td>R$${valorSaida}</td><td><i class="fa-solid fa-pen-to-square" onclick="editar()"></i> <i class="fa-solid fa-trash-can" onclick="deletar(this)"></i></td></tr>`);
            tabelaDespesas.insertAdjacentHTML('afterbegin', `<tr id="entrada-cor"><td>${valorTituloSaida}</td><td>R$${valorSaida}</td><td><i class="fa-solid fa-pen-to-square" onclick="editar()"></i> <i class="fa-solid fa-trash-can" onclick="deletar(this)"></i></td></tr>`);
        }else{
            alert("Preencha todos os valores!");
        }//Registro das Saídas
    }else if(selecionarOp.value == 'saida'){
        if(valorSaida != "" && valorTituloSaida != ""){
            historico_de_saidas.titulo.push(valorTituloSaida);
            historico_de_saidas.valor.push(valorSaida);
            historico_geral.html_.push(`<tr id="saida-cor"><td>${valorTituloSaida}</td><td>R$${valorSaida}</td><td><i class="fa-solid fa-pen-to-square" onclick="editar()"></i> <i class="fa-solid fa-trash-can" onclick="deletar(this)"></i></td></tr>`);
            tabelaDespesas.insertAdjacentHTML('afterbegin', `<tr id="saida-cor"><td>${valorTituloSaida}</td><td>R$${valorSaida}</td><td><i class="fa-solid fa-pen-to-square" onclick="editar()"></i> <i class="fa-solid fa-trash-can" onclick="deletar(this)"></i></td></tr>`);
        }else{
            alert("Preencha todos os valores!");
        }
    }
        
    window.localStorage.setItem("db_hist", JSON.stringify(historico_de_saidas));
    window.localStorage.setItem("db_hist_entradas", JSON.stringify(historico_de_entradas));
    window.localStorage.setItem("db_hist_geral", JSON.stringify(historico_geral));

    somarValores();

    document.getElementById("entradas-e-saidas").style.display = "none";
}

function editar(){
    alert("editar");
}

function deletar(del){
    var pai = del.parentElement;
    pai.parentElement.remove();
}

//Soma de valores
function somarValores(){
    let somaValorSaidas = 0;
    let somaValorEntradas = 0;
    let saldoFinal = 0;
    for(i = 0; i < historico_de_saidas.valor.length; i++){
        somaValorSaidas = parseFloat(somaValorSaidas) + parseFloat(historico_de_saidas.valor[i]);
    }

    for(l = 0; l < historico_de_entradas.valor.length; l++){
        somaValorEntradas = parseFloat(somaValorEntradas) + parseFloat(historico_de_entradas.valor[l]);
    }
        
    saldoFinal = somaValorEntradas - somaValorSaidas;

    entradasTotais.innerText = somaValorEntradas;
    despesasTotais.innerText = somaValorSaidas;
    saldoTotal.innerText = saldoFinal;
}

function popup(){
    document.getElementById("entradas-e-saidas").style.display = "block";
}
