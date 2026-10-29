import userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";

const JWTSecret = process.env.JWTSECRET;

// Função para cadastrar um usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await userService.Create(name, email, hash, role);

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return res.status(500).json({
      error: "Não foi possível cadastrar o usuário.",
    });
  }
};

// Função para autenticar um usuário com e-mail e senha
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "E-mail e senha são obrigatórios.",
      });
    }

    const user = await userService.getOne(email);

    if (!user) {
      return res.status(404).json({
        error: "O usuário não foi encontrado.",
      });
    }

    const correct = bcrypt.compareSync(password, user.password);

    if (!correct) {
      return res.status(401).json({
        error: "Credenciais inválidas. Tente novamente.",
      });
    }

    if (!JWTSecret) {
      throw new Error("JWTSECRET não está configurado no ambiente.");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWTSecret,
      { expiresIn: "48h" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);

    return res.status(500).json({
      error: "Não foi possível realizar o login.",
    });
  }
};

// Função para autenticar ou cadastrar via Google
const googleLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        error: "Token do Google não fornecido.",
      });
    }

    if (!JWTSecret) {
      throw new Error("JWTSECRET não está configurado no ambiente.");
    }

    // Valida o access token e consulta o perfil no Google.
    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!googleResponse.ok) {
      return res.status(401).json({
        error: "Token do Google inválido ou expirado.",
      });
    }

    const payload = await googleResponse.json();

    if (!payload?.email || payload.email_verified !== true) {
      return res.status(401).json({
        error: "O Google não retornou um e-mail verificado.",
      });
    }

    const email = payload.email;
    const name = payload.name || email.split("@")[0];

    // Procura o usuário pelo e-mail.
    let user = await userService.getOne(email);

    // Cadastra o usuário caso ele ainda não exista.
    if (!user) {
      const randomPassword = randomBytes(32).toString("hex");
      const hash = bcrypt.hashSync(randomPassword, 10);

      await userService.Create(name, email, hash, "user");

      // Recupera o registro criado no banco.
      user = await userService.getOne(email);
    }

    if (!user) {
      throw new Error(
        "O usuário não foi encontrado no banco após a tentativa de cadastro."
      );
    }

    // Gera o JWT utilizado pelo sistema.
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWTSecret,
      { expiresIn: "48h" }
    );

    return res.status(200).json({
      message: "Login com Google realizado com sucesso",
      token: jwtToken,
    });
  } catch (error) {
    console.error("Erro na rota de login com Google:", error);

    return res.status(500).json({
      error: "Erro na autenticação com o Google.",
    });
  }
};

export default {
  createUser,
  loginUser,
  googleLogin,
  JWTSecret,
};
