let perguntas = [];
let indice = 0;
let acertos = 0;
let respostaSelecionada = null;

const somCorreto = new Audio("sounds/SomDeAcerto.wav");
const somErrado = new Audio("sounds/SomDeErro.wav");


function embaralhar(array){
    return array.sort(() => Math.random() - 0.5);
}

function carregarPergunta(){
    const p = perguntas[indice];

    document.getElementById("tituloPergunta").textContent = p.pergunta;

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    p.alternativas.forEach((alt, i) => {
        const btn = document.createElement("button");
        btn.textContent = alt;
        btn.classList.add("opcao");
        btn.onclick = () => selecionarResposta(i, btn);
        opcoesDiv.appendChild(btn);
    });

     // ★ ATUALIZAÇÃO DA BARRA DE PROGRESSO ★
    let progresso = ((indice + 1) / perguntas.length) * 100;
    document.getElementById("progressBar").style.width = progresso + "%";

    // ★ TEXTO "Pergunta X de Y" ★
    document.getElementById("progressText").textContent =
        `${indice + 1} de ${perguntas.length}`;

}

function selecionarResposta(i, botao){
    respostaSelecionada = i;

    document.querySelectorAll(".opcao").forEach(b => b.classList.remove("selecionada"));
    botao.classList.add("selecionada");
}

document.getElementById("btnResponder").onclick = () => {
    if(respostaSelecionada === null) return alert("Selecione uma resposta!");

    const p = perguntas[indice];
    const opcoes = document.querySelectorAll(".opcao");

    if(respostaSelecionada === p.correta){
        somCorreto.play();
        opcoes[respostaSelecionada].classList.add("correto");
        acertos++;
    } else {
        somErrado.play();
        opcoes[respostaSelecionada].classList.add("errado");
        opcoes[p.correta].classList.add("correto");
    }

    setTimeout(() => {
        indice++;
        respostaSelecionada = null;

        if(indice >= perguntas.length){
            localStorage.setItem("acertos", acertos);
            window.location.href = "result.html";

        } else {
            carregarPergunta();
        }
    }, 1500);
};

window.onload = () => {
    perguntas = embaralhar(bancoPerguntas).slice(0,15);
    carregarPergunta();
};
