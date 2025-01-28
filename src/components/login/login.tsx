import React, { useState } from "react";
// @ts-ignore
import { auth } from "../../config/firebaseConfig"; // Ajuste o caminho conforme necessário
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Importando as funções de login
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importe o arquivo CSS para estilização

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const allowedEmails = ["guilhermehenriqueescritorio@gmail.com", "miriany.esposi@gmail.com"]; // Lista de e-mails permitidos

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verifica se o e-mail do usuário está na lista permitida
      if (!allowedEmails.includes(user.email!)) {
        alert("Acesso negado. Você não tem permissão para acessar este painel.");
        return;
      }

      console.log("Usuário logado:", user);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao fazer login:", error.code, error.message);
      alert("Erro ao fazer login. Verifique seu email e senha.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verifica se o e-mail do usuário está na lista permitida
      if (!allowedEmails.includes(user.email!)) {
        alert("Acesso negado. Você não tem permissão para acessar este painel.");
        await auth.signOut(); // Desloga o usuário
        return;
      }

      console.log("Usuário logado com Google:", user);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error.code, error.message);
      alert("Erro ao fazer login com Google.");
    }
  };

  return (
    <div className="main">
      <div className="login-container">
        <h1>Faça login para acessar o painel administrativo</h1>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>

        <button onClick={handleGoogleLogin} className="google-login-button">
          <i className="fab fa-google"></i> Login com Google
        </button>
        
        {/* Botão de voltar */}
        <button onClick={() => navigate("/")} className="back-button">
          Voltar para o início
        </button>
      </div>
    </div>
  );
};

export default Login;
