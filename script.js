


let cardContainer = document.querySelector('.card-container');
const searchInput = document.querySelector('header input[type="text"]');
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente.
async function carregarDados() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

function iniciarBusca() {
  const termoBusca = searchInput.value.toLowerCase();
  const resultados = dados.filter(dado =>
    dado.nome.toLowerCase().includes(termoBusca) ||
    dado.descricao.toLowerCase().includes(termoBusca)
  );
  renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
  cardContainer.innerHTML = ""; // Limpa os cards existentes

  if (cardsParaRenderizar.length === 0) {
    cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  for (let dado of cardsParaRenderizar) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <a href=${dado.link} target="_blank">Saiba mais</a>
     `;
    cardContainer.appendChild(article);
  }
}

// Carrega os dados quando o script é executado.
carregarDados();
