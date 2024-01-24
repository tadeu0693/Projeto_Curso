/*const arrayProduto = [
    {
      titulo: "Produto",
      descricao: "Cerveja",
      preco: "R$ 10,00",
    },
  ];

const div = document.createElement("div");
div.id = "produto-2";

div.innerHTML = `
  <h3>${arrayProduto[0].titulo}</h3>
  <p class="descricao">${arrayProduto[0].descricao}</p>
  <div class="preco">${arrayProduto[0].preco}</div>
`;

const main = document.querySelector('main');
main.appendChild(div);*/

// carrinho

document.addEventListener("DOMContentLoaded", function() {
  var listaCarrinho = document.getElementById("listaCarrinho");
  let totalCarrinhoElement = document.getElementById("totalCarrinho");

  // Recuperar os dados do localStorage
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Exibir os produtos no carrinho
  carrinho.forEach(function(produto) {
    adicionarProdutoAoCarrinho(produto);
  });

  function adicionarProdutoAoCarrinho(produto) {
      let itemCarrinho = document.createElement("li");

      // Verificar se a propriedade 'preco' existe antes de usá-la
      let precoFormatado = typeof produto.preco === 'number' ? `R$${produto.preco.toFixed(0)}` : "Preço não disponível";

      //itemCarrinho.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}"> ${produto.nome} - R$${produto.preco.toFixed(0)}`;
      itemCarrinho.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}"> ${produto.nome} - ${precoFormatado}`;

      let removerBotao = document.createElement("button");
      removerBotao.textContent = "Remover";
      removerBotao.addEventListener("click", function() {
          listaCarrinho.removeChild(itemCarrinho);
          carrinho = carrinho.filter(item => item !== produto);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          calcularTotalCarrinho();
      });

      itemCarrinho.appendChild(removerBotao);

      listaCarrinho.appendChild(itemCarrinho);
      calcularTotalCarrinho();
  }

  function calcularTotalCarrinho() {
      let total = 0;
      carrinho.forEach(function(produto) {
        // Verificar se a propriedade 'preco' está definida
        if (typeof produto.preco === 'number') {
          total += produto.preco;
      }
      });

      totalCarrinhoElement.textContent = total.toFixed(2);
  }
});
