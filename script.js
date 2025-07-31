const problemas = [
  {
    titulo: "Problema com Etiqueta",
    sintoma: "Após a separação, falha nas etiquetas de NF e postagem.",
    pagina: "problemas/problema_etiqueta.html"
  },
  {
    titulo: "Problema com Alocação de Produto",
    sintoma: "Mensagem de erro informando que a quantidade a ser alocada é superior ao disponível.",
    pagina: "problemas/problema_alocacao.html"
  },
  {
    titulo: "Lentidão ao Bipar Grandes Quantidades",
    sintoma: "Durante o processo de bipagem em pedidos com múltiplos itens, há lentidão significativa na leitura dos códigos de barras.",
    pagina: "problemas/lentidao_bipar.html"
  },
  {
    titulo: "Erro ao Abortar Pedidos",
    sintoma: "Ao tentar abortar um pedido, é exibida uma mensagem de erro que impede a conclusão da ação.",
    pagina: "problemas/erro_abortar.html"
  },
  {
    titulo: "Desconexão Inesperada da Conta",
    sintoma: "O sistema realiza logout automático mesmo com apenas uma aba ativa, encerrando a sessão do usuário de forma inesperada.",
    pagina: "problemas/desconexao_inesperada.html"
  },
  {
    titulo: "Erro Teste",
    sintoma: "Teste",
    pagina: "problemas/teste.html"
  },
];


const porPagina = 5;
let paginaAtual = 1;

const lista = document.getElementById("lista-problemas");
const paginacao = document.getElementById("paginacao");
const inputBusca = document.getElementById("busca");

function render(problemasFiltrados, pagina) {
  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;
  const paginaProblemas = problemasFiltrados.slice(inicio, fim);

  lista.innerHTML = paginaProblemas.map(p => `
    <div class="problema">
      <h2><a href="${p.pagina}">${p.titulo}</a></h2>
      <p><strong>Sintoma:</strong> ${p.sintoma}</p>
    </div>
  `).join("");

  // Paginação
  paginacao.innerHTML = "";
  const totalPaginas = Math.ceil(problemasFiltrados.length / porPagina);
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === pagina;
    btn.onclick = () => {
      paginaAtual = i;
      render(problemasFiltrados, paginaAtual);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    paginacao.appendChild(btn);
  }

  if (totalPaginas === 0) {
    lista.innerHTML = "<p>Nenhum problema encontrado.</p>";
  }
}

function atualizar() {
  const termo = inputBusca.value.toLowerCase();
  const filtrado = problemas.filter(p =>
    p.titulo.toLowerCase().includes(termo) ||
    p.sintoma.toLowerCase().includes(termo)
  );
  paginaAtual = 1;
  render(filtrado, paginaAtual);
}

inputBusca.addEventListener("input", atualizar);
render(problemas, paginaAtual);
