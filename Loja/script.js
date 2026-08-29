const vendas = [];
function mostrarMensagem(texto) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
}


const produtos = [
    {
        id: 1,
        nome: "Terço",
        categoria: "Artigos religiosos",
        subcategoria: "Terços",
        preco: 25.00,
        estoque: 20
    },
    {
        id: 2,
        nome: "Imagem de Nossa Senhora",
        categoria: "Imagens religiosas",
        subcategoria: "Imagens religiosas",
        preco: 80.00,
        estoque: 10
    },
    {
        id: 3,
        nome: "Bíblia",
        categoria: "Livros",
        subcategoria: "Bíblias",
        preco: 60.00,
        estoque: 15
    },
    {
        id: 4,
        nome: "Escapulário",
        categoria: "Artigos religiosos",
        subcategoria: "Escapulários",
        preco: 15.00,
        estoque: 20
    },
    {
        id: 5,
        nome: "Medalha religiosa",
        categoria: "Artigos religiosos",
        subcategoria: "Medalhas",
        preco: 12.00,
        estoque: 25
    },
    {
        id: 6,
        nome: "Toalha de banho",
        categoria: "Cama, mesa e banho",
        subcategoria: "Toalhas de banho",
        preco: 45.00,
        estoque: 10
    },
    {
        id: 7,
        nome: "Copo térmico",
        categoria: "Casa e decoração",
        subcategoria: "Copos térmicos",
        preco: 50.00,
        estoque: 8
    }
];
const produtosSalvos = localStorage.getItem("produtos");
const vendasSalvas = localStorage.getItem("vendas");

if (produtosSalvos) {
    const produtosRecuperados = JSON.parse(produtosSalvos);

    produtosRecuperados.forEach(produtoSalvo => {
        const produto = produtos.find(p => p.id === produtoSalvo.id);

        if (produto) {
            produto.estoque = produtoSalvo.estoque;
        }
    });
}
if (vendasSalvas) {
    vendas.push(...JSON.parse(vendasSalvas));
}
function atualizarEstoquesNaTela() {
    produtos.forEach(produto => {
        document.getElementById("estoque-" + produto.id).textContent = produto.estoque;
    });
}


function registrarVenda(idProduto, quantidade) {
    const produto = produtos.find(p => p.id === idProduto);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        console.log("Quantidade inválida.");
        return;
    }

    if (quantidade > produto.estoque) {
        console.log("Estoque insuficiente.");
        return;
    }

    produto.estoque -= quantidade;

    produto.estoque -= quantidade;
    const venda = {
         produto: produto.nome,
         quantidade: quantidade,
         precoUnitario: produto.preco,
         total: produto.preco * quantidade
         };

         vendas.push(venda);
         localStorage.setItem("vendas", JSON.stringify(vendas));
         localStorage.setItem("produtos", JSON.stringify(produtos));

    document.getElementById("estoque-" + idProduto).textContent = produto.estoque;

    console.log("Venda registrada!");
    mostrarMensagem("Venda registrada com sucesso!");
    console.log("Produto:", produto.nome);
    console.log("Quantidade vendida:", quantidade);
    console.log("Estoque restante:", produto.estoque);
    mostrarHistorico();
    atualizarAnalise();
}

function venderProduto(idProduto) {
    const quantidade = Number(
        document.getElementById("quantidade-" + idProduto).value
    );

    registrarVenda(idProduto, quantidade);
}

function mostrarHistorico() {
    const listaVendas = document.getElementById("lista-vendas");

    listaVendas.innerHTML = "";

    vendas.forEach((venda, indice) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <p>Venda ${indice + 1}</p>
            <p>Produto: ${venda.produto}</p>
            <p>Quantidade: ${venda.quantidade}</p>
            <p>Preço unitário: R$ ${venda.precoUnitario.toFixed(2)}</p>
            <p>Total: R$ ${venda.total.toFixed(2)}</p>
        `;

        listaVendas.appendChild(item);
    });
}
function atualizarAnalise() {
    const totalVendas = vendas.length;

    let itensVendidos = 0;
    let faturamento = 0;

    vendas.forEach(venda => {
        itensVendidos += venda.quantidade;
        faturamento += venda.total;
    });

    document.getElementById("total-vendas").textContent = totalVendas;
    document.getElementById("itens-vendidos").textContent = itensVendidos;
    document.getElementById("faturamento").textContent = faturamento.toFixed(2);
}
function mostrarProdutos() {
    const listaProdutos = document.getElementById("lista-produtos");

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const item = document.createElement("div");

        item.className = "produto";

        item.innerHTML = `
    <h3>${produto.id.toString().padStart(3, "0")} - ${produto.nome}</h3>
    <p>Categoria: ${produto.categoria}</p>
    <p>Subcategoria: ${produto.subcategoria}</p>
    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
    <p>Estoque: <span id="estoque-${produto.id}">${produto.estoque}</span> unidades</p>

            <input
                type="number"
                id="quantidade-${produto.id}"
                value="1"
                min="1"
            >

            <button onclick="venderProduto(${produto.id})">
                Vender
            </button>
        `;

        listaProdutos.appendChild(item);
    });
}

mostrarProdutos();

atualizarEstoquesNaTela();

mostrarHistorico();

atualizarAnalise();

