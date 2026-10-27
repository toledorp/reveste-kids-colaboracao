
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";

const JWTSecret = process.env.JWTSECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Token do Google não fornecido.",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error("GOOGLE_CLIENT_ID não está configurado no backend.");
    }

    if (!JWTSecret) {
      throw new Error("JWTSECRET não está configurado no ambiente.");
    }

    // 1. Valida o token recebido do frontend.
    // O campo "aud" do token precisa corresponder a este Client ID.
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
      return res.status(401).json({
        error: "O Google não retornou um e-mail verificado.",
      });
    }

    const email = payload.email;
    const name = payload.name || email.split("@")[0];

    // 2. Procura o usuário pelo e-mail
    let user = await userService.getOne(email);

    // 3. Cadastra o usuário caso ele ainda não exista
    if (!user) {
      const randomPassword =
        `${cryptoRandomPart()}${cryptoRandomPart()}`;

      const hash = bcrypt.hashSync(randomPassword, 10);

      await userService.Create(name, email, hash, "user");

      // Recupera o registro criado no banco
      user = await userService.getOne(email);
    }

    if (!user) {
      throw new Error(
        "O usuário não foi encontrado no banco após a tentativa de cadastro."
      );
    }

    // 4. Gera o JWT utilizado pelo sistema
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
    // O erro detalhado fica apenas no terminal do backend
    console.error("Erro na rota de login com Google:", error);

    if (
      error.message?.includes("Wrong recipient") ||
      error.message?.includes("audience")
    ) {
      return res.status(401).json({
        error:
          "O Client ID do token do Google não corresponde ao configurado no backend.",
      });
    }

    return res.status(500).json({
      error: "Erro na autenticação com o Google.",
    });
  }
};

// Gera partes aleatórias para a senha interna do usuário Google
function cryptoRandomPart() {
  return Math.random().toString(36).slice(2);
}

export default {
  createUser,
  loginUser,
  googleLogin,
  JWTSecret,
};
