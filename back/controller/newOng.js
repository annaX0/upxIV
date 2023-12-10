const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.newOng = (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json("Todos os campos devem ser preenchidos");
    }
    const img = req.file.filename;

    const {
      nome,
      telefone,
      email,
      endereco,
      nomeOng,
      descricao,
      chave,
      liberado,
      qr,
      senha,
    } = req.body;

    const q =
      "INSERT INTO ong(`nome`, `telefone`, `email`, `endereco`, `nomeOng`,`descricao`, `chave`, `liberado`, `img`, `qr`, `senha`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      nome,
      telefone,
      email,
      endereco,
      nomeOng,
      descricao,
      chave,
      liberado,
      img,
      qr,
      senha,
    ];

    db.query(q, values, (err) => {
      if (err) {
        if (
          !nome ||
          !telefone ||
          !email ||
          !endereco ||
          !nomeOng ||
          !descricao ||
          !chave ||
          !liberado ||
          !qr ||
          !senha
        ) {
          return res.status(400).json("Todos os campos devem ser preenchidos");
        }

        return res
          .status(500)
          .json("Erro interno no servidor ao cadastrar a ONG");
      }

      return res.status(200).json("ONG cadastrada com sucesso");
    });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return res.status(500).json("Erro interno no servidor");
  }
};

exports.getOngs = (req, res) => {
  const idOng = req.params.idong;
  const q = "SELECT * FROM ong WHERE idong = ?";
  db.query(q, [idOng], (err, data) => {
    return res.status(200).json(data);
  });
};

exports.getHome = (req, res) => {
  try {
    const q = "SELECT * FROM ong";
    db.query(q, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.getLogin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const { email, senha } = req.body;

    const q = "SELECT * FROM ong WHERE email = ?";
    db.query(q, [email], async (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor" });
      }

      if (data.length === 0) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      } else {
        const storedPassword = data[0].senha;

        const match = (await senha) === storedPassword;
        if (data[0].liberado !== 1) {
          return res.status(401).json({
            error: "Usuário não liberado, entre em contato com o suporte",
          });
        } else {
          if (match === true) {
            const token = jwt.sign({ userId: data[0].idong }, "seuSegredo", {
              expiresIn: "1h",
            });

            return res.status(200).json({ token, userId: data[0].idong });
          } else {
            return res.status(401).json({ error: "Senha incorreta" });
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.newAnimal = (req, res) => {
  const idOng = req.params.idong;
  const img = req.file.filename;

  const { nome, idade, descricao, porte, ativado } = req.body;
  if (!nome || !idade || !descricao || !idOng || !porte || !ativado) {
    return res.status(400).json("Todos os campos devem ser preenchidos");
  }

  const values = [nome, idade, descricao, porte, idOng, img, ativado];
  try {
    const q =
      "INSERT INTO animal(`nome`, `idade`, `descricao`, `porte`, `idong`, `img`, `ativado`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(q, values, (err) => {
      if (err) {
        console.error("Erro ao inserir animal:", err);
        return res
          .status(500)
          .json("Erro interno no servidor ao cadastrar o animal");
      }

      return res.status(200).json("Animal cadastrado com sucesso");
    });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return res.status(500).json(error);
  }
};
exports.getAnimais = (req, res) => {
  const idOng = req.params.idong;
  const q = "SELECT * FROM animal WHERE idong = ?";
  db.query(q, [idOng], (err, data) => {
    return res.status(200).json(data);
  });
};

exports.editAnimal = (req, res) => {
  const idAnimal = req.params.id;

  const { nome, idade, descricao, porte, ativado } = req.body;

  // if (!nome || !idade || !descricao || !porte || !ativado) {
  //   return res.status(400).json("Todos os campos devem ser preenchidos");
  // }

  const values = [nome, idade, descricao, porte, ativado, idAnimal];

  try {
    const q =
      "UPDATE animal SET `nome` = ?, `idade` = ?, `descricao` = ?, `porte` = ?,  `ativado` = ? WHERE `idanimal` = ?";

    db.query(q, values, (err, results) => {
      if (err) {
        console.error("Erro ao atualizar animal:", err);
        return res
          .status(500)
          .json("Erro interno no servidor ao atualizar o animal");
      }

      if (results.affectedRows === 0) {
        return res.status(404).json("Animal não encontrado");
      }

      return res.status(200).json("Animal atualizado com sucesso");
    });
  } catch (error) {
    console.log("Erro ao processar a requisição:", error);
    return res.status(500).json(error);
  }
};

exports.deleteAnimal = (req, res) => {
  const idAnimal = req.params.id;

  try {
    const q = "DELETE FROM animal WHERE `idanimal` = ?";

    db.query(q, [idAnimal], (err, results) => {
      if (err) {
        console.error("Erro ao excluir animal:", err);
        return res
          .status(500)
          .json("Erro interno no servidor ao excluir o animal");
      }

      if (results.affectedRows === 0) {
        return res.status(404).json("Animal não encontrado");
      }

      return res.status(200).json("Animal excluído com sucesso");
    });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return res.status(500).json(error);
  }
};
