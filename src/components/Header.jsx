import  { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importar o hook para navegação
import "../styles/styles.css";

const Header = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializar o hook de navegação

  useEffect(() => {
    // Monitorar o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpar o listener quando o componente desmontar
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado com sucesso!");
      navigate("/login"); // Redirecionar para a página de login após logout
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login"); // Redirecionar para a página de login
  };

  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li>Convites Digitais</li>
          <li>Home</li>
          <li>Produto</li>
          <li>Galeria</li>
          <li>Sobre nós</li>
          <li>
            {user ? (
              <button className="auth-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="auth-button" onClick={handleLogin}>
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
