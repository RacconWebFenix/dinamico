import {
  Funcionario,
  Gerente,
  Desenvolvedor,
} from "/js/Model/colaboradores.js";

function criaFuncionario(nome, idade, cargo) {
  let pessoa = new Funcionario(nome, idade, cargo);
  return pessoa;
}

function criaGerente(nome, idade, cargo, departamento) {
  let pessoa = new Gerente(nome, idade, cargo, departamento);
  return pessoa;
}

function criaDesenvolvedor(nome, idade, cargo, linguagem) {
  let pessoa = new Desenvolvedor(nome, idade, cargo, linguagem);
  return pessoa;
}

function exibirErro(msg) {
  throw new Error(msg);
}

function apresentacao(colaborador) {
  document.getElementById("apresentacao").innerText =
    colaborador.seApresentar();
  colaborador.cargo === "desenvolvedor"
    ? (document.getElementById("ocupacao").innerText = colaborador.programar())
    : (document.getElementById("ocupacao").innerText = colaborador.gerenciar());
}

function validar() {
  document.getElementById("error-message").innerText = "";
  document.getElementById("apresentacao").innerText = "";
  document.getElementById("ocupacao").innerText = "";

  const inputsQuerySelector = document.querySelectorAll(".form-control");

  const check = document.querySelectorAll('input[name="cargo"]:checked');

  try {
    const payload = [...inputsQuerySelector].map((d) => d.value);

    let nome = payload[0];
    let idade = payload[1];
    let departamento = payload[2];
    let linguagem = payload[3];

    if (check.length < 1) exibirErro("É necessario escolher um cargo.");

    if (!nome || !idade || !departamento || !linguagem)
      exibirErro("Existem campos não preenchidos.");

    switch (check[0].value) {
      case "desenvolvedor":
        const d = criaDesenvolvedor(nome, idade, check[0].value, linguagem);
        apresentacao(d);
        break;
      case "gerente":
        const g = criaGerente(nome, idade, check[0].value, departamento);
        apresentacao(g);
        break;
      default:
        criaFuncionario(nome, idade, check[0].value);
        break;
    }
  } catch (error) {
    document.getElementById("error-message").innerText = error.message;
  }
}

document.getElementById("validar").addEventListener("click", function () {
  validar();
});
