// carrinho

document.addEventListener("DOMContentLoaded", function() {
  let listaCarrinho = document.getElementById("listaCarrinho");
  let totalCarrinhoElement = document.getElementById("totalCarrinho");

  // Recuperar os dados do localStorage
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Exibir os produtos no carrinho
  carrinho.forEach(function(produto) {
    adicionarProdutoAoCarrinho(produto);
  });

  function adicionarProdutoAoCarrinho(produto) {
      let itemCarrinho = document.createElement("li");

      // Verificar se o produto já está no carrinho
      const produtoExistente = carrinho.find(item => item.id === produto.id);

      if (produtoExistente) {
          // Se o produto já existe, atualize apenas a quantidade
          produtoExistente.quantidade += produto.quantidade || 1;
      } else {
          // Se o produto não existe, adicione-o ao carrinho
          carrinho.push(produto);
          let itemCarrinho = document.createElement("li");
      }

      // Verificar se a propriedade 'preco' existe antes de usá-la
      let precoFormatado = typeof produto.preco === 'number' ? `R$${produto.preco.toFixed(0)}` : "Preço não disponível";

      itemCarrinho.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}"> ${produto.nome} - ${precoFormatado}`;

      let diminuirMaisUm = document.createElement("button");
      diminuirMaisUm.textContent = "-";
      diminuirMaisUm.addEventListener("click", function() {
          if (itemCarrinho <= 0){
            listaCarrinho.removeChild(itemCarrinho)
          };
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          diminuirQuantidade(produto, campoQuantidade);
          calcularTotalCarrinho();
      });
      itemCarrinho.appendChild(diminuirMaisUm);

      // campo de quantidade
      let campoQuantidade = document.createElement("input");
      campoQuantidade.type = "text";
      campoQuantidade.value = produto.quantidade || 1; // Valor padrão é 1
      campoQuantidade.addEventListener("input", function() {
          atualizarQuantidade(produto, campoQuantidade, itemCarrinho);
      });
      itemCarrinho.appendChild(campoQuantidade);

      // botão adicionar
      let adicionarMaisUm = document.createElement("button");
      adicionarMaisUm.textContent = "+";
      adicionarMaisUm.addEventListener("click", function() {
          adicionarQuantidade(produto, campoQuantidade);
      });
      itemCarrinho.appendChild(adicionarMaisUm);


      let removerBotao = document.createElement("button");
      removerBotao.textContent = "Remover";
      removerBotao.addEventListener("click", function() {
          listaCarrinho.removeChild(itemCarrinho);
          carrinho = carrinho.filter(item => item !== produto);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          calcularTotalCarrinho();
        });
        if (campoQuantidade.value == 0) {
          listaCarrinho.removeChild(itemCarrinho);
          carrinho = carrinho.filter(item => item !== produto);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          calcularTotalCarrinho();
      }  
      itemCarrinho.appendChild(removerBotao);

      listaCarrinho.appendChild(itemCarrinho);
      calcularTotalCarrinho();
  }
  function adicionarQuantidade(produto, campoQuantidade) {
    produto.quantidade = (produto.quantidade || 1) + 1;
    campoQuantidade.value = produto.quantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularTotalCarrinho();
}

function diminuirQuantidade(produto, campoQuantidade) {
    produto.quantidade = Math.max((produto.quantidade || 1) -1, 0);
    campoQuantidade.value = produto.quantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularTotalCarrinho();
}

function atualizarQuantidade(produto, campoQuantidade, itemCarrinho) {
    const novaQuantidade = parseInt(campoQuantidade.value) || 1;
    produto.quantidade = Math.max(novaQuantidade, 0); // Garante que a quantidade não seja negativa

    if (produto.quantidade === 0) {
      // Se a quantidade for menor ou igual a zero, remova o produto do carrinho
      listaCarrinho.removeChild(itemCarrinho);
      carrinho = carrinho.filter(item => item !== produto);
  }
    campoQuantidade.value = produto.quantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularTotalCarrinho();
}

  function calcularTotalCarrinho() {
      let total = 0;
      carrinho.forEach(function(produto) {
        // Verificar se a propriedade 'preco' está definida
        if (typeof produto.preco === 'number') {
          total += produto.preco * (produto.quantidade || 1);
      }
      });

      totalCarrinhoElement.textContent = total.toFixed(1);
  }
});
