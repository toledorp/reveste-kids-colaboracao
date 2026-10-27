
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useGoogleLogin } from "@react-oauth/google";
import "./AuthPanel.css";

function AuthPanel({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const handleAuthStorageAndRedirect = (token) => {
    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));

    localStorage.setItem("role", payload.role);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: payload.id,
        email: payload.email,
        role: payload.role,
      })
    );

    setMessage("Login realizado com sucesso.");

    setTimeout(() => {
      onAuthSuccess();
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      handleAuthStorageAndRedirect(data.token);
    } catch (err) {
      setError(err.message || "Ocorreu um erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (tokenResponse) => {
      void handleGoogleAccessToken(tokenResponse.access_token);
    },
    onError: () => {
      setError("Ocorreu um erro na autenticação com o Google.");
    },
  });

  const handleGoogleAccessToken = async (accessToken) => {
    if (!accessToken) {
      setError("Não foi possível obter o token do Google.");
      return;
    }

    resetMessages();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Erro ao autenticar com o Google no servidor."
        );
      }

      if (!data.token) {
        throw new Error("O servidor não retornou um token de autenticação.");
      }

      handleAuthStorageAndRedirect(data.token);
    } catch (err) {
      setError(
        err.message || "Não foi possível realizar o login com o Google."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-panel">
      <div className="auth-main">
        <div className="auth-left">
          <img
            src="/logo_sem_fundo.png"
            alt="ReVeste Kids"
            className="auth-logo"
          />

          <div className="auth-left-content">
            <div className="auth-preview-image">
              <img src="/card-login.png" alt="Preview ReVeste Kids" />
            </div>

            <h1 className="auth-title-big">
              <span className="line">Novas</span>
              <span className="line">fases da</span>
              <span className="line highlight">infância</span>
              <span className="line">
                <span className="highlight">circulando</span>
                <span className="dot">.</span>
              </span>
            </h1>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2 className="auth-title">Entrar no ReVeste Kids</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Processando..." : "Entrar"}
              </button>
            </form>

            <button type="button" className="forgot-password">
              Esqueceu a senha?
            </button>

            {message && <p className="auth-message success">{message}</p>}
            {error && <p className="auth-message error">{error}</p>}

            <div className="google-login-container">
              <button
                type="button"
                className="google-btn"
                disabled={loading}
                onClick={() => {
                  resetMessages();
                  googleLogin();
                }}
              >
                <svg
                  className="google-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.16 7.14-17.56Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.26-8.28 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>

                <span>Entrar com o Google</span>
              </button>
            </div>

            <div className="auth-toggle">
              <Link to="/register" className="toggle-btn">
                Criar nova conta
              </Link>
            </div>

            <div className="auth-brand">
              <img
                src="/ralky-white.png"
                alt="Ralky"
                className="brand-logo"
              />
              <span>Ralky</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        <div className="auth-footer-links">
          <button>Ralky</button>
          <button>Sobre</button>
          <button>Ajuda</button>
          <button>API</button>
          <button>Comunidade</button>
          <button>Diretrizes</button>
          <button>Segurança</button>
          <button>Privacidade</button>
          <button>Termos</button>
          <button>Contato</button>
        </div>

        <div className="auth-footer-bottom">
          <span>Português (Brasil)</span>
          <span>© 2026 ReVeste by Ralky</span>
        </div>
      </footer>
    </section>
  );
}

export default AuthPanel;
