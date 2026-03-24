/* ================================================
   TAVELIAN BEER — main.js
   Funções compartilhadas por todas as páginas:
     - Carrossel automático
     - Badge do carrinho no menu
     - Toast de confirmação
     - Validação do formulário do footer
     - Pesquisa (base)
   ================================================ */

/* ---------- BADGE DO CARRINHO ----------
   Atualiza o número exibido no ícone do carrinho
   a partir dos dados salvos no localStorage.        */
function atualizarBadgeCarrinho() {
  const badge = document.getElementById('badge-carrinho');
  if (!badge) return;

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);

  if (totalItens > 0) {
    badge.textContent = totalItens;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

/* ---------- TOAST DE CONFIRMAÇÃO ----------
   Exibe uma mensagem flutuante temporária.
   Uso: mostrarToast('Produto adicionado!');        */
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = mensagem;
  toast.classList.add('visivel');

  // Remove o toast após 2.5 segundos
  setTimeout(() => toast.classList.remove('visivel'), 2500);
}

/* ---------- ADICIONAR AO CARRINHO ----------
   Chamado pelos botões "Adicionar ao carrinho"
   em todas as páginas de produtos.
   Recebe um objeto { id, nome, preco, imagem }.   */
function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o produto já existe no carrinho
  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index >= 0) {
    // Produto já existe: apenas incrementa a quantidade
    carrinho[index].quantidade = (carrinho[index].quantidade || 1) + 1;
  } else {
    // Produto novo: adiciona com quantidade 1
    carrinho.push({ ...produto, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarBadgeCarrinho();
  mostrarToast(`"${produto.nome}" adicionado ao carrinho!`);
}

/* ---------- CARROSSEL ----------
   Funciona com qualquer elemento .carrossel na página.
   Controles: botões prev/next e dots indicadores.     */
function iniciarCarrossel() {
  const carrossel = document.querySelector('.carrossel');
  if (!carrossel) return; // Sem carrossel na página, encerra

  const slides    = carrossel.querySelector('.carrossel-slides');
  const totalSlides = carrossel.querySelectorAll('.carrossel-slide').length;
  const dots      = carrossel.querySelectorAll('.dot');
  const btnPrev   = carrossel.querySelector('.carrossel-btn.prev');
  const btnNext   = carrossel.querySelector('.carrossel-btn.next');

  let atual = 0;
  let intervalo;

  // Move para o slide indicado e atualiza os dots
  function irPara(index) {
    atual = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${atual * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('ativo', i === atual));
  }

  // Avança automaticamente a cada 4 segundos
  function iniciarAuto() {
    intervalo = setInterval(() => irPara(atual + 1), 4000);
  }

  // Para o intervalo ao interagir manualmente
  function pararAuto() {
    clearInterval(intervalo);
  }

  // Botão anterior
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      pararAuto();
      irPara(atual - 1);
      iniciarAuto();
    });
  }

  // Botão próximo
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      pararAuto();
      irPara(atual + 1);
      iniciarAuto();
    });
  }

  // Clique nos dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      pararAuto();
      irPara(i);
      iniciarAuto();
    });
  });

  irPara(0);      // Começa no primeiro slide
  iniciarAuto();  // Liga o auto-play
}

/* ---------- VALIDAÇÃO DO FOOTER (Dúvidas) ----------
   Valida nome e e-mail do formulário do rodapé.       */
function iniciarValidacaoFooter() {
  const nomeInput  = document.getElementById('footer-nome');
  const emailInput = document.getElementById('footer-email');
  const nomeHelper = document.getElementById('footer-nome-helper');
  const emailHelper = document.getElementById('footer-email-helper');

  if (!nomeInput || !emailInput) return; // Footer sem form, encerra

  // Valida nome ao sair do campo
  nomeInput.addEventListener('blur', () => {
    if (nomeInput.value.trim().length < 3) {
      nomeInput.classList.add('error');
      nomeInput.classList.remove('correct');
      if (nomeHelper) {
        nomeHelper.textContent = 'Nome deve ter pelo menos 3 caracteres.';
        nomeHelper.classList.add('visivel');
      }
    } else {
      nomeInput.classList.remove('error');
      nomeInput.classList.add('correct');
      if (nomeHelper) nomeHelper.classList.remove('visivel');
    }
  });

  // Valida e-mail ao sair do campo
  emailInput.addEventListener('blur', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailInput.classList.remove('correct');
      if (emailHelper) {
        emailHelper.textContent = 'Informe um e-mail válido.';
        emailHelper.classList.add('visivel');
      }
    } else {
      emailInput.classList.remove('error');
      emailInput.classList.add('correct');
      if (emailHelper) emailHelper.classList.remove('visivel');
    }
  });
}

/* ---------- INICIALIZAÇÃO ----------
   Executa quando o DOM estiver pronto.              */
document.addEventListener('DOMContentLoaded', () => {
  atualizarBadgeCarrinho();
  iniciarCarrossel();
  iniciarValidacaoFooter();
});
