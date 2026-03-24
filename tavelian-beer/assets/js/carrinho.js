/* ================================================
   TAVELIAN BEER — carrinho.js
   Responsável por:
     - Renderizar os itens salvos no localStorage
     - Controlar quantidade (+/-) e remoção
     - Calcular o total do pedido
     - Redirecionar para o WhatsApp com o resumo
   ================================================ */

/* Número do WhatsApp da adega (somente dígitos, com DDI) */
const WHATSAPP_NUMERO = '5563992130188';

/* ---------- RENDERIZAR O CARRINHO ---------- */
function renderizarCarrinho() {
  const lista   = document.getElementById('lista-carrinho');
  const total   = document.getElementById('total-carrinho');
  const resumo  = document.getElementById('resumo-pedido');
  const vazio   = document.getElementById('carrinho-vazio');

  if (!lista) return;

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  lista.innerHTML = ''; // Limpa antes de re-renderizar

  if (carrinho.length === 0) {
    // Carrinho vazio: exibe mensagem e esconde o resumo
    if (vazio)  vazio.style.display  = 'block';
    if (resumo) resumo.style.display = 'none';
    if (total)  total.textContent    = '0,00';
    return;
  }

  // Tem itens: esconde mensagem de vazio, exibe resumo
  if (vazio)  vazio.style.display  = 'none';
  if (resumo) resumo.style.display = 'flex';

  // Cria um elemento <li> para cada produto no carrinho
  carrinho.forEach(produto => {
    const li = document.createElement('li');
    li.className = 'item-carrinho';
    li.dataset.id = produto.id;

    li.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='assets/img/placeholder.png'">
      <div class="item-info">
        <h3>${produto.nome}</h3>
        <span class="item-preco">R$ ${formatarPreco(produto.preco)}</span>
      </div>
      <div class="controle-quantidade">
        <button class="btn-diminuir" aria-label="Diminuir quantidade">−</button>
        <input type="number" class="campo-quantidade" value="${produto.quantidade || 1}" min="1" max="99" aria-label="Quantidade">
        <button class="btn-aumentar" aria-label="Aumentar quantidade">+</button>
      </div>
      <button class="btn-remover" aria-label="Remover produto">Remover</button>
    `;

    /* -- Botão aumentar quantidade -- */
    li.querySelector('.btn-aumentar').addEventListener('click', () => {
      alterarQuantidade(produto.id, 1);
    });

    /* -- Botão diminuir quantidade -- */
    li.querySelector('.btn-diminuir').addEventListener('click', () => {
      alterarQuantidade(produto.id, -1);
    });

    /* -- Campo de quantidade digitada -- */
    li.querySelector('.campo-quantidade').addEventListener('change', (e) => {
      const novaQtd = parseInt(e.target.value) || 1;
      definirQuantidade(produto.id, novaQtd);
    });

    /* -- Botão remover -- */
    li.querySelector('.btn-remover').addEventListener('click', () => {
      removerItem(produto.id);
    });

    lista.appendChild(li);
  });

  calcularTotal();
}

/* ---------- ALTERAR QUANTIDADE (+/-) ----------
   delta: +1 para aumentar, -1 para diminuir.
   Se chegar a 0, remove o item automaticamente.  */
function alterarQuantidade(id, delta) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const index  = carrinho.findIndex(item => item.id === id);

  if (index < 0) return;

  carrinho[index].quantidade = (carrinho[index].quantidade || 1) + delta;

  if (carrinho[index].quantidade <= 0) {
    // Quantidade chegou a zero: remove do carrinho
    carrinho.splice(index, 1);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
  atualizarBadgeCarrinho();
}

/* ---------- DEFINIR QUANTIDADE DIRETA ---------- */
function definirQuantidade(id, quantidade) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const index  = carrinho.findIndex(item => item.id === id);

  if (index < 0) return;

  if (quantidade <= 0) {
    carrinho.splice(index, 1);
  } else {
    carrinho[index].quantidade = quantidade;
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
  atualizarBadgeCarrinho();
}

/* ---------- REMOVER ITEM ---------- */
function removerItem(id) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(item => item.id !== id);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
  atualizarBadgeCarrinho();
}

/* ---------- CALCULAR TOTAL ---------- */
function calcularTotal() {
  const totalEl = document.getElementById('total-carrinho');
  if (!totalEl) return;

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const total    = carrinho.reduce((acc, item) => {
    return acc + (item.preco * (item.quantidade || 1));
  }, 0);

  totalEl.textContent = formatarPreco(total);
}

/* ---------- FORMATAR PREÇO ----------
   Converte número para string no formato "45,00"  */
function formatarPreco(valor) {
  return parseFloat(valor).toFixed(2).replace('.', ',');
}

/* ---------- FINALIZAR PEDIDO — WHATSAPP ----------
   Monta a mensagem com os itens e o total,
   e abre o WhatsApp com o número da adega.         */
function finalizarPedido() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  // Monta o texto da mensagem
  let mensagem = '🍺 *Olá, Tavelian Beer!* Gostaria de fazer o seguinte pedido:\n\n';

  let total = 0;
  carrinho.forEach(item => {
    const subtotal = item.preco * (item.quantidade || 1);
    total += subtotal;
    mensagem += `▪ ${item.nome} × ${item.quantidade || 1} — R$ ${formatarPreco(subtotal)}\n`;
  });

  mensagem += `\n*Total: R$ ${formatarPreco(total)}*`;
  mensagem += '\n\nAguardo confirmação e instruções de pagamento. Obrigado!';

  // Codifica a mensagem para URL
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

  // Abre o WhatsApp em nova aba
  window.open(url, '_blank');
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrinho();

  // Botão de finalizar pedido
  const btnFinalizar = document.getElementById('btn-finalizar');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', finalizarPedido);
  }
});
