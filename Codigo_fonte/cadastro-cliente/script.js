function validarNome() {
    let nomeInput = document.getElementById('nome');
    let balaoMensagemErro = document.getElementById('balaoMensagemErro');
    if (nomeInput.value.trim() === '' || nomeInput.value.length < 3) {
        balaoMensagemErro.textContent = 'Por favor, insira um nome válido (mínimo de 3 caracteres).';
        balaoMensagemErro.style.display = 'block';
    } else if (!isNaN(nomeInput.value)) {
        balaoMensagemErro.textContent = 'Por favor, insira um nome válido (sem números).';
        balaoMensagemErro.style.display = 'block';
    } else {
        balaoMensagemErro.textContent = '';
        balaoMensagemErro.style.display = 'none';
    }
}

document.getElementById('nome').addEventListener('input', function () {
    let balaoMensagemErro = document.getElementById('balaoMensagemErro');
    balaoMensagemErro.style.display = 'none';
});