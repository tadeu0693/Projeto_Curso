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
