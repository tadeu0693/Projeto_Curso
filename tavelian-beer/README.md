# 🍺 Tavelian Beer — Site da Adega

## Estrutura de Pastas

```
tavelian-beer/
├── index.html          → Página inicial (Home)
├── cervejas.html       → Catálogo de cervejas
├── promocoes.html      → Produtos em promoção
├── carrinho.html       → Carrinho de compras
├── cadastro.html       → Área do cliente / cadastro
├── sobre-nos.html      → Página sobre a equipe
├── README.md           → Este arquivo
└── assets/
    ├── css/
    │   └── style.css   → Estilos globais (todas as páginas)
    ├── js/
    │   ├── main.js     → Funções compartilhadas (carrossel, carrinho, toast)
    │   ├── carrinho.js → Lógica do carrinho + redirecionamento WhatsApp
    │   └── cadastro.js → Validação do formulário de cadastro
    └── img/            → Coloque todas as imagens aqui
```

## Como usar

1. Copie a pasta `tavelian-beer/` para o seu servidor ou abra diretamente no navegador.
2. Coloque todas as imagens dentro de `assets/img/` com os nomes abaixo.

## Imagens necessárias

Coloque os seguintes arquivos em `assets/img/`:

| Arquivo                     | Onde é usado              |
|-----------------------------|---------------------------|
| `logo.jpg`                  | Logo no header            |
| `banner1.jpg`               | Carrossel (slide 1)       |
| `banner2.jpg`               | Carrossel (slide 2)       |
| `banner3.jpg`               | Carrossel (slide 3)       |
| `budweiser-330-6pack.png`   | Produto                   |
| `heineken6.jpg`             | Produto                   |
| `sixpack-stella-j6.jpg`     | Produto                   |
| `corona330ml.jpg`           | Produto                   |
| `spaten.jpg`                | Produto / Promoção        |
| `Bohemia.jpg`               | Produto / Promoção        |
| `stela.png`                 | Produto / Promoção        |
| `557196-700x850.jpg`        | Produto / Promoção        |
| `skol269.jpg`               | Produto / Promoção        |
| `original269ML.jpg`         | Produto / Promoção        |
| `Serra_malte.jpg`           | Produto / Promoção        |
| `heineken600.jpg`           | Produto / Promoção        |
| `usuario1.jpeg`             | Sobre Nós                 |
| `usuario2.jpeg`             | Sobre Nós                 |
| `usuario3.jpg`              | Sobre Nós                 |
| `payment-mobile_2021.png`   | Footer (pagamentos)       |
| `mapa.png`                  | Footer (endereço)         |
| `facebook.png`              | Footer (redes sociais)    |
| `instagram.png`             | Footer (redes sociais)    |
| `whatsapp.png`              | Footer (redes sociais)    |

## WhatsApp da adega

O número está configurado em `assets/js/carrinho.js`:
```js
const WHATSAPP_NUMERO = '5563992130188', numero usado apenas para teste;
```
Para alterar, troque o número nessa linha (somente dígitos, com DDI 55).

## Como funciona o carrinho

1. Cliente clica em "Adicionar ao carrinho" em qualquer produto
2. O item é salvo no `localStorage` do navegador
3. O badge (🔴) no menu mostra a quantidade de itens
4. Na página do carrinho, o cliente pode ajustar quantidades ou remover itens
5. Ao clicar em **"Finalizar Pedido via WhatsApp"**, o site abre o WhatsApp com uma mensagem já preenchida listando todos os produtos, quantidades e o total
6. O dono da adega recebe o pedido e combina o pagamento diretamente com o cliente

## Tecnologias

- HTML5 semântico
- CSS3 puro (sem Bootstrap ou frameworks externos)
- JavaScript puro (Vanilla JS, sem jQuery)
- localStorage para persistência do carrinho
