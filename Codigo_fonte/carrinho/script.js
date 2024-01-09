const arrayProduto = [
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
main.appendChild(div);