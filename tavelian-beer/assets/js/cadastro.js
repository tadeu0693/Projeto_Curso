/* ================================================
   TAVELIAN BEER — cadastro.js
   Valida o formulário de cadastro de cliente:
     - Nome (mín. 3 letras, sem números)
     - CPF (formato e dígitos verificadores)
     - Data de nascimento (maior de 18 anos)
     - E-mail (formato válido)
     - Senha (mín. 6 caracteres)
     - Confirmar senha (deve coincidir)
   ================================================ */

/* ---------- UTILITÁRIO: EXIBIR/LIMPAR ERRO ----------
   Exibe ou limpa a mensagem de erro de um campo.     */
function setErro(idErro, idCampo, mensagem) {
  const erroEl  = document.getElementById(idErro);
  const campoEl = document.getElementById(idCampo);

  if (mensagem) {
    if (erroEl)  erroEl.textContent = mensagem;
    if (campoEl) { campoEl.classList.add('error'); campoEl.classList.remove('correct'); }
  } else {
    if (erroEl)  erroEl.textContent = '';
    if (campoEl) { campoEl.classList.remove('error'); campoEl.classList.add('correct'); }
  }
}

/* ---------- VALIDAÇÃO DE CPF ----------
   Algoritmo oficial de verificação dos dígitos.   */
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Verificação do primeiro dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  // Verificação do segundo dígito
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

/* ---------- VALIDAÇÃO DO FORMULÁRIO COMPLETO ----------
   Retorna true se tudo for válido (permite o submit).  */
function validarFormulario() {
  let valido = true;

  /* -- Nome -- */
  const nome = document.getElementById('nome').value.trim();
  if (nome.length < 3 || /\d/.test(nome)) {
    setErro('erro-nome', 'nome', 'Nome inválido. Deve ter pelo menos 3 letras e não conter números.');
    valido = false;
  } else {
    setErro('erro-nome', 'nome', '');
  }

  /* -- CPF -- */
  const cpf = document.getElementById('cpf').value;
  if (!validarCPF(cpf)) {
    setErro('erro-cpf', 'cpf', 'CPF inválido. Verifique e tente novamente.');
    valido = false;
  } else {
    setErro('erro-cpf', 'cpf', '');
  }

  /* -- Data de Nascimento (maior de 18 anos) -- */
  const nascimentoVal = document.getElementById('nascimento').value;
  if (!nascimentoVal) {
    setErro('erro-nascimento', 'nascimento', 'Informe sua data de nascimento.');
    valido = false;
  } else {
    const nascimento = new Date(nascimentoVal);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAniversario = nascimento.getMonth() - hoje.getMonth();
    if (mesAniversario > 0 || (mesAniversario === 0 && nascimento.getDate() > hoje.getDate())) {
      idade--; // Ainda não fez aniversário este ano
    }
    if (idade < 18) {
      setErro('erro-nascimento', 'nascimento', 'É necessário ter 18 anos ou mais para se cadastrar.');
      valido = false;
    } else {
      setErro('erro-nascimento', 'nascimento', '');
    }
  }

  /* -- E-mail -- */
  const email = document.getElementById('email-cad').value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    setErro('erro-email', 'email-cad', 'Informe um e-mail válido. Ex: nome@email.com');
    valido = false;
  } else {
    setErro('erro-email', 'email-cad', '');
  }

  /* -- Senha -- */
  const senha = document.getElementById('senha').value;
  if (senha.length < 6) {
    setErro('erro-senha', 'senha', 'A senha deve ter pelo menos 6 caracteres.');
    valido = false;
  } else {
    setErro('erro-senha', 'senha', '');
  }

  /* -- Confirmar Senha -- */
  const confirmaSenha = document.getElementById('confirma-senha').value;
  if (senha !== confirmaSenha) {
    setErro('erro-confirma-senha', 'confirma-senha', 'As senhas não coincidem.');
    valido = false;
  } else {
    setErro('erro-confirma-senha', 'confirma-senha', '');
  }

  /* -- Exibe mensagem de sucesso se tudo OK -- */
  const sucessoEl = document.getElementById('mensagem-sucesso');
  if (sucessoEl) {
    sucessoEl.textContent = valido ? 'Cadastro realizado com sucesso! ✅' : '';
  }

  return valido; // false previne o envio do formulário
}

/* ---------- MÁSCARA DE CPF ----------
   Formata automaticamente: 000.000.000-00          */
function mascaraCPF(e) {
  let v = e.target.value.replace(/\D/g, '').substring(0, 11);
  v = v.replace(/^(\d{3})(\d)/, '$1.$2');
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1-$2');
  e.target.value = v;
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.getElementById('cpf');
  if (cpfInput) cpfInput.addEventListener('input', mascaraCPF);

  const form = document.getElementById('form-cadastro');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!validarFormulario()) e.preventDefault();
    });
  }
});
