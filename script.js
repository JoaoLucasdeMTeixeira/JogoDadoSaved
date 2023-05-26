// Variáveis para controlar o jogo
let placar1 = 0;
let placar2 = 0;
let rodada = 1;
let vezJogador1 = true;
let dado1;
let dado2;


// Selecionando os elementos HTML
const jogador1 = document.getElementById("jogador1");
const jogador2 = document.getElementById("jogador2");
const reiniciar = document.getElementById("reiniciar");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");//
const face1  = document.getElementById("roll1");
const face2 = document.getElementById("roll2");
const placar1HTML = document.getElementById("placar1");
const placar2HTML = document.getElementById("placar2");
const rodadaHTML = document.getElementById("rodada");

// Função para jogar o dado e retornar um número aleatório de 1 a 6
function jogarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para atualizar o placar e verificar se houve empate ou se algum jogador venceu
function atualizarPlacar(resultadoJogador1, resultadoJogador2) {
  if (resultadoJogador1 > resultadoJogador2) {
    placar1++;
    resultado.innerText = "Jogador 1 venceu a rodada!";
    salvarJogo();
  } else if (resultadoJogador1 < resultadoJogador2) {
    placar2++;
    resultado.innerText = "Jogador 2 venceu a rodada!";
    salvarJogo();
  } else {
    resultado.innerText = "Empate!";
    salvarJogo();
  }

  // Atualizando o placar e verificando se alguém ganhou a partida
  placar1HTML.innerText = placar1;
  placar2HTML.innerText = placar2;

  if (rodada == 10) {
    if (placar1 > placar2) {
      mensagem.innerText = "Jogador 1 ganhou a partida!";
    } else if (placar1 < placar2) {
      mensagem.innerText = "Jogador 2 ganhou a partida!";
    } else {
      mensagem.innerText = "Empate na partida!";
    }
    // jogador1.disabled = true;
    // jogador2.disabled = true;
    reiniciar.disabled = false;
    salvarJogo();
  } 
    
  else {
    vezJogador1 = !vezJogador1;
    // jogador1.disabled = !vezJogador1;
    // jogador2.disabled = vezJogador1;
    rodada++;
    rodadaHTML.innerText = rodada;
    mensagem.innerText = vezJogador1 ? "Jogador 1, é a sua vez!" : "Jogador 2, é a sua vez!";
    salvarJogo();
  }
}

// Adicionando evento de clique no botão do jogador 1
jogador1.addEventListener("click", function() {
  const resultadoJogador1 = jogarDado();
  jogador1.disabled = true;
  jogador2.disabled = false;
  dado1 = jogarDado();
  salvarJogo();
  //face1 = jogarDado();
  //atualizarPlacar(resultadoJogador1, jogador2.disabled ? 0 : );
});

// Adicionando evento de clique no botão do jogador 2
jogador2.addEventListener("click", function() {
  const resultadoJogador2 = jogarDado();
  jogador2.disabled = true;
  jogador1.disabled = false;
  dado2 = jogarDado();
  //face2 = jogarDado();
  atualizarPlacar(dado1, dado2);
  salvarJogo();
});

// Adicionando evento de clique no botão de reiniciar
reiniciar.addEventListener("click", function() {
  placar1 = 0;
  placar2 = 0;
  rodada = 1;
  vezJogador1 = true;
  jogador1.disabled = false;
  jogador2.disabled = true;
  rodadaHTML.innerText = rodada;
  placar1HTML.innerText = placar1;
  placar2HTML.innerText = placar2;
  mensagem.innerText = "Jogador 1, é a sua vez!";
  resultado.innerText = "";
  reiniciar.disabled = true;
  salvarJogo();
});

function salvarJogo() {
    localStorage.setItem("placar1", placar1);
    localStorage.setItem("placar2", placar2);
    localStorage.setItem("rodada", rodada);
    localStorage.setItem("vezJogador1", vezJogador1);
  }
  
  
  window.addEventListener("load", function () {
    if (localStorage.getItem("placar1") !== null) {
      placar1 = parseInt(localStorage.getItem("placar1"));
      placar1HTML.innerText = placar1;
    }
    if (localStorage.getItem("placar2") !== null) {
      placar2 = parseInt(localStorage.getItem("placar2"));
      placar2HTML.innerText = placar2;
    }
    if (localStorage.getItem("rodada") !== null) {
      rodada = parseInt(localStorage.getItem("rodada"));
      rodadaHTML.innerText = rodada;
    }
    if (localStorage.getItem("vezJogador1") !== null) {
      vezJogador1 = localStorage.getItem("vezJogador1") === "true";
      jogador1.disabled = !vezJogador1;
      jogador2.disabled = vezJogador1;
      mensagem.innerText = vezJogador1 ? "Jogador 1, é a sua vez!" : "Jogador 2, é a sua vez!";
    }
  
    }
  );