// =========================================================
// DADOS DO SISTEMA
// =========================================================

// Lista que armazena todas as vendas realizadas.
const vendas = [];


// =========================================================
// PRODUTOS
// =========================================================

// Cadastro inicial dos produtos.
// O estoque poderá ser atualizado durante o uso do sistema.
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


// =========================================================
// RECUPERAÇÃO DOS DADOS DO LOCALSTORAGE
// =========================================================

// Recupera os produtos e vendas armazenados anteriormente.
const produtosSalvos = localStorage.getItem("produtos");
const vendasSalvas = localStorage.getItem("vendas");


// Recupera os estoques salvos.
if (produtosSalvos) {

    const produtosRecuperados = JSON.parse(produtosSalvos);

    produtosRecuperados.forEach(produtoSalvo => {

        const produto = produtos.find(
            p => p.id === produtoSalvo.id
        );

        if (produto) {
            produto.estoque = produtoSalvo.estoque;
        }

    });
}


// Recupera o histórico de vendas.
if (vendasSalvas) {

    vendas.push(
        ...JSON.parse(vendasSalvas)
    );

}


// =========================================================
// MENSAGENS DO SISTEMA
// =========================================================

// Exibe mensagens para o usuário.
function mostrarMensagem(texto) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

}


// =========================================================
// ATUALIZAÇÃO DO ESTOQUE NA TELA
// =========================================================

// Atualiza os valores de estoque exibidos nos cards.
function atualizarEstoquesNaTela() {

    produtos.forEach(produto => {

        const estoque = document.getElementById(
            "estoque-" + produto.id
        );

        estoque.textContent = produto.estoque;

    });

}


// =========================================================
// REGISTRO DE VENDA
// =========================================================

// Registra uma nova venda e atualiza o estoque.
function registrarVenda(idProduto, quantidade) {

    // Procura o produto pelo ID.
    const produto = produtos.find(
        p => p.id === idProduto
    );


    // Verifica se o produto existe.
    if (!produto) {

        console.log("Produto não encontrado.");

        return;
    }


    // Verifica se a quantidade é válida.
    if (
    quantidade <= 0 ||
    !Number.isInteger(quantidade)
) {

    mostrarMensagem("Quantidade inválida.");

    console.log("Quantidade inválida.");

    return;
}


    // Verifica se existe estoque suficiente.
    if (quantidade > produto.estoque) {

    mostrarMensagem("Estoque insuficiente.");

    console.log("Estoque insuficiente.");

    return;
}


    // Atualiza o estoque.
    produto.estoque -= quantidade;


    // Cria o registro da venda.
    const venda = {

        produto: produto.nome,

        quantidade: quantidade,

        precoUnitario: produto.preco,

        total: produto.preco * quantidade

    };


    // Adiciona a venda ao histórico.
    vendas.push(venda);


    // Salva os dados no navegador.
    localStorage.setItem(
        "vendas",
        JSON.stringify(vendas)
    );

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );


    // Atualiza o estoque exibido na tela.
    document.getElementById(
        "estoque-" + idProduto
    ).textContent = produto.estoque;


    // Mensagem para o usuário.
    mostrarMensagem(
        "Venda registrada com sucesso!"
    );


    // Informações para acompanhamento no console.
    console.log("Venda registrada!");
    console.log("Produto:", produto.nome);
    console.log("Quantidade vendida:", quantidade);
    console.log("Estoque restante:", produto.estoque);


    // Atualiza histórico e análise.
    mostrarHistorico();
    atualizarAnalise();

}


// =========================================================
// VENDA DO PRODUTO
// =========================================================

// Obtém a quantidade informada pelo usuário
// e envia para a função registrarVenda().
function venderProduto(idProduto) {

    const quantidade = Number(
        document.getElementById(
            "quantidade-" + idProduto
        ).value
    );

    registrarVenda(
        idProduto,
        quantidade
    );

}


// =========================================================
// HISTÓRICO DE VENDAS
// =========================================================

// Exibe todas as vendas realizadas.
function mostrarHistorico() {

    const listaVendas = document.getElementById(
        "lista-vendas"
    );


    // Limpa a área antes de reconstruir o histórico.
    listaVendas.innerHTML = "";


    // Percorre todas as vendas.
    vendas.forEach((venda, indice) => {

        const item = document.createElement("div");


        // Cria o conteúdo da venda.
        item.innerHTML = `

            <p>Venda ${indice + 1}</p>

            <p>Produto: ${venda.produto}</p>

            <p>Quantidade: ${venda.quantidade}</p>

            <p>
                Preço unitário:
                R$ ${venda.precoUnitario.toFixed(2)}
            </p>

            <p>
                Total:
                R$ ${venda.total.toFixed(2)}
            </p>

        `;


        // Adiciona a venda ao histórico.
        listaVendas.appendChild(item);

    });

}


// =========================================================
// ANÁLISE DE VENDAS
// =========================================================

// Calcula os principais indicadores do sistema.
function atualizarAnalise() {

    // Quantidade de vendas realizadas.
    const totalVendas = vendas.length;


    // Variáveis utilizadas nos cálculos.
    let itensVendidos = 0;
    let faturamento = 0;


    // Percorre as vendas para calcular os totais.
    vendas.forEach(venda => {

        itensVendidos += venda.quantidade;

        faturamento += venda.total;

    });


    // Atualiza os indicadores na tela.
    document.getElementById(
        "total-vendas"
    ).textContent = totalVendas;

    document.getElementById(
        "itens-vendidos"
    ).textContent = itensVendidos;

    document.getElementById(
        "faturamento"
    ).textContent = faturamento.toFixed(2);

}


// =========================================================
// EXIBIÇÃO DOS PRODUTOS
// =========================================================

// Cria os cards dos produtos dinamicamente.
function mostrarProdutos() {

    const listaProdutos = document.getElementById(
        "lista-produtos"
    );


    // Limpa a área antes de criar os produtos.
    listaProdutos.innerHTML = "";


    // Percorre todos os produtos cadastrados.
    produtos.forEach(produto => {

        const item = document.createElement("div");


        // Define a classe CSS do card.
        item.className = "produto";


        // Cria o conteúdo do card.
        item.innerHTML = `

            <h3>
                ${produto.id.toString().padStart(3, "0")}
                - ${produto.nome}
            </h3>

            <p>
                Categoria: ${produto.categoria}
            </p>

            <p>
                Subcategoria: ${produto.subcategoria}
            </p>

            <p>
                Preço: R$ ${produto.preco.toFixed(2)}
            </p>

            <p>
                Estoque:
                <span id="estoque-${produto.id}">
                    ${produto.estoque}
                </span>
                unidades
            </p>

            <input
                type="number"
                id="quantidade-${produto.id}"
                value="1"
                min="1"
            >

            <button
                onclick="venderProduto(${produto.id})"
            >
                Vender
            </button>

        `;


        // Adiciona o card à lista de produtos.
        listaProdutos.appendChild(item);

    });

}


// =========================================================
// INICIALIZAÇÃO DO SISTEMA
// =========================================================

// Exibe os produtos.
mostrarProdutos();

// Atualiza os estoques.
atualizarEstoquesNaTela();

// Exibe o histórico.
mostrarHistorico();

// Atualiza os indicadores.
atualizarAnalise();