-- CONSULTAS SQL - SISTEMA BELAS ARTES
-- Versão 2 - Banco de Dados SQLite


-- 1. Listar todos os produtos
SELECT *
FROM produtos;
-- 2. Produtos com estoque acima de 10

SELECT *
FROM produtos
WHERE estoque > 10;
-- 3. Valor total do estoque

SELECT SUM(preco * estoque) AS valor_total_estoque
FROM produtos;
-- 4. Faturamento total

SELECT SUM(total) AS faturamento_total
FROM vendas;
-- 5. Quantidade vendida por produto

SELECT produto_id, SUM(quantidade) AS quantidade_vendida
FROM itens_venda
GROUP BY produto_id;
-- 6. Faturamento por produto

SELECT produto_id, SUM(quantidade * preco_unitario) AS faturamento
FROM itens_venda
GROUP BY produto_id;
-- 7. Produtos sem vendas

SELECT *
FROM produtos
WHERE id NOT IN (
    SELECT produto_id
    FROM itens_venda
);
-- 8. Produtos com estoque baixo

SELECT *
FROM produtos
WHERE estoque <= 5;
-- 9. Relatório completo de produtos

SELECT
    p.id,
    p.nome,
    p.preco,
    p.estoque,
    COALESCE(SUM(iv.quantidade), 0) AS quantidade_vendida,
    COALESCE(SUM(iv.quantidade * iv.preco_unitario), 0) AS faturamento
FROM produtos p
LEFT JOIN itens_venda iv
    ON p.id = iv.produto_id
GROUP BY p.id, p.nome, p.preco, p.estoque;
-- 10. Faturamento por categoria

SELECT
    p.categoria,
    SUM(iv.quantidade * iv.preco_unitario) AS faturamento
FROM produtos p
JOIN itens_venda iv
    ON p.id = iv.produto_id
GROUP BY p.categoria;
PS C:\Users\Natália\OneDrive\Documentos\Projetos\BelasArtes> dir


    Diretório: C:\Users\Natália\OneDrive\Documentos\Projetos\BelasArtes


Mode                 LastWriteTime         Length Name                                       
----                 -------------         ------ ----                                       
dar--l        31/08/2026     14:59                Banco                                      
dar--l        29/08/2026     07:17                Loja                                       
-a---l        31/08/2026     15:31              0 nome_do_seu_banco.db                       
-a---l        29/08/2026     15:26           3026 README.md                                  


PS C:\Users\Natália\OneDrive\Documentos\Projetos\BelasArtes> 