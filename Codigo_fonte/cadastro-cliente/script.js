function validarFormulario() {

    let nomeInput = document.getElementById('nome');
    let erroNome = document.getElementById('erroNome');
    let nome = nomeInput.value.trim();

    if (nome.length < 3 || !isNaN(nome)) {
        erroNome.textContent = 'Nome inválido. Deve ter pelo menos 3 caracteres e não pode ser um número.';
        return false;
    } else {
        erroNome.textContent = '';
    }

    let cpfInput = document.getElementById('cpf');
    let erroCpf = document.getElementById('erroCpf');
    let cpf = cpfInput.value.replace(/[^\d]+/g, '');

    if (!validarCPF(cpf)) {
        erroCpf.textContent = 'CPF inválido.';
        return false;
    } else {
        erroCpf.textContent = '';
    }

    let nascimentoInput = document.getElementById('nascimento');
    let erroNascimento = document.getElementById('erroNascimento');
    let dataNascimento = new Date(nascimentoInput.value);
    let hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (idade < 18) {
        erroNascimento.textContent = 'Você deve ser maior de 18 anos.';
        return false;
    } else {
        erroNascimento.textContent = '';
    }

    let emailInput = document.getElementById('email');
    let erroEmail = document.getElementById('erroEmail');
    let email = emailInput.value.trim();


    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        erroEmail.textContent = 'Formato de e-mail inválido.';
        return false;
    } else {
        erroEmail.textContent = '';
    }

    let senhaInput = document.getElementById('senha');
    let confirmaSenhaInput = document.getElementById('confirmaSenha');
    let erroSenha = document.getElementById('erroSenha');
    let erroConfirmaSenha = document.getElementById('erroConfirmaSenha');
    let senha = senhaInput.value;
    let confirmaSenha = confirmaSenhaInput.value;

    if (senha.length < 6) {
        erroSenha.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return false;
    } else {
        erroSenha.textContent = '';
    }

    if (senha !== confirmaSenha) {
        erroConfirmaSenha.textContent = 'As senhas não coincidem.';
        return false;
    } else {
        erroConfirmaSenha.textContent = '';
    }


    let sucesso = document.getElementById('sucesso');
    sucesso.textContent = 'Cadastro realizado com sucesso!';



    return true;
}

function validarCPF(cpf) {
    cpf = cpf.toString().replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }


    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}
let tituloElemento = document.querySelector('.cadastrar');

tituloElemento.style.fontFamily = 'Arial, Helvetica, sans-serif';

let rotulo = document.querySelector('form');
rotulo.style.fontFamily = 'Arial, Helvetica, sans-serif';

 // ---------- VALIDAÇÃO USERNAME ---------- //
let usernameInput = document.getElementById("name");
let usernameLabel = document.querySelector('label[for="name"]');
let usernameHelper = document.getElementById("name-helper");

let emailInput = document.getElementById("email");
let emailLabel = document.querySelector('label[for="email"]');
let emailHelper = document.getElementById("helper-text");

// Função para manipular popup de campo obrigatório
function manipulaPopup(input, label, helper) {
    input.addEventListener("focus", () => {
        label.classList.add("required-popup");
    });

    input.addEventListener("blur", () => {
        label.classList.remove("required-popup");

        if (input.value === "" || (input === emailInput && !input.value.includes("@"))) {
            // Exibe o popup de campo incorreto se o campo estiver vazio ou o e-mail não contiver "@"
            helper.classList.add("visible");
        } else {
            helper.classList.remove("visible");
        }
    });
}

manipulaPopup(usernameInput, usernameLabel, usernameHelper);

// Validar valor do input de nome de usuário
usernameInput.addEventListener("change", (e) => {
    let valorDigitado = e.target.value;

    if (valorDigitado.length < 3) {
        // Estilos dinâmicos caso o valor não seja validado
        usernameInput.classList.remove("correct");
        usernameInput.classList.add("error");
        usernameHelper.innerText = "Seu username deve conter mais de 3 caracteres";
        usernameHelper.classList.add("visible");
    } else {
        // Estilos dinâmicos caso o valor seja validado
        usernameInput.classList.remove("error");
        usernameHelper.classList.remove("visible");
        usernameInput.classList.add("correct");
        usernameHelper.innerText = "";
    }
});

// Validar valor do input de e-mail
emailInput.addEventListener("change", (e) => {
    manipulaPopup(emailInput, emailLabel, emailHelper);

    let valorDigitado = e.target.value;

    if (valorDigitado === "" || !valorDigitado.includes("@")) {
        // Estilos dinâmicos caso o valor não seja validado
        emailInput.classList.remove("correct");
        emailInput.classList.add("error");
        emailHelper.innerText = "Email incorreto";
        emailHelper.classList.add("visible");
    } else {
        // Estilos dinâmicos caso o valor seja validado
        emailInput.classList.remove("error");
        emailHelper.classList.remove("visible");
        emailInput.classList.add("correct");
    }
});
