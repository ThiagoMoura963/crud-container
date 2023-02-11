import { db } from "../db.js";

// CRUD CONTAINER

export const getContainer = (_, res) => {
    const q = "SELECT * FROM container";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
        "INSERT INTO container(`nome`, `cliente`, `tipo`, `status`, `categoria`) VALUES(?)";

        const values = [
            req.body.nome,
            req.body.cliente,
            req.body.tipo,
            req.body.status,
            req.body.categoria,
        ];

        db.query(q, [values], (err) => {
            if(err) return res.json(err);

            return res.status(200).json("Container cadastrado com sucesso.");
        });
};

export const updateContainer = (req, res) => {
    const q = 
        "UPDATE container SET `nome` = ?, `cliente` = ?, `tipo` = ?, `status` = ?, `categoria` = ? WHERE `id` = ?";
        
        const values = [
            req.body.nome,
            req.body.cliente,
            req.body.tipo,
            req.body.status,
            req.body.categoria,
        ];

        db.query(q, [...values, req.params.id], (err) => {
            if(err) return res.json(err);

            return res.status(200).json("Dados do container atualizados com sucesso.");
        });
};

export const deleteCotainer = (req, res) => {
    const q = "DELETE FROM container WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Dados deletados com sucesso.");
    });
};

//CRUD MOVIMENTAÇÃO

export const getMovimentacao = (_, res) => {
    const q = "SELECT * FROM movimentacao";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addMovimentacao = (req, res) => {
    const q = 
        "INSERT INTO movimentacao (`idContainer`, `tipo`, `inicio`, `fim`) VALUES(?)";

        const values = [
            req.body.id,
            req.body.cliente,
            req.body.tipo,
            req.body.inicio,
            req.body.fim,
        ];

        db.query(q, [values], (err) => {
            if(err) return res.json(err);

            return res.status(200).json();
        });
};

export const updateMovimentacao = (req, res) => {
    const q =
        "UPDATE movimentacao SET `tipo` = ?, `inicio` = ?, `fim` = ? WHERE `id` = ? ";

    const values = [
        req.body.id,
        req.body.cliente,
        req.body.tipo,
        req.body.inicio,
        req.body.fim,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json();
    });
};

export const deleteMovimentacao = (req, res) => {
    const q =
        "DELETE FROM movimentacao WHERE `id` = ?";

        db.query(q, [req.params.id], (err) => {
            if(err) return res.json(err);

            return res.status(200).json();
        });
};

/* Esta é a sua estrutura de arquivo para controlar as operações CRUD para containers e movimentações. As funções incluem a recuperação de dados de uma tabela específica, adição de novos dados, atualização de dados existentes e exclusão de dados.
Para cada tabela (container e movimentação), você tem uma função para cada operação CRUD. Por exemplo, a função getContainer recupera todos os dados da tabela container, a função addUser adiciona novos dados à tabela container, e assim por diante.
Cada função recebe um objeto req com os dados da solicitação e um objeto res para enviar a resposta. As operações de banco de dados são executadas usando a função db.query, que aceita uma consulta SQL e um callback para manipular os resultados da consulta.
*/