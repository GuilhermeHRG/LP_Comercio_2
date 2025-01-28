import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "../styles/styles.css";

const db = getFirestore();
const auth = getAuth();

const Models = () => {
  const [models, setModels] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Usando useNavigate para redirecionamento

  useEffect(() => {
    // Verificar autenticação do usuário
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Buscar modelos do Firestore
    const fetchModels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedModels = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setModels(fetchedModels);
      } catch (error) {
        console.error("Erro ao buscar os modelos:", error);
      }
    };

    fetchModels();

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setModels((prevModels) => prevModels.filter((model) => model.id !== id));
      console.log("Modelo apagado com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar o modelo:", error);
    }
  };

  const handleAddModel = () => {
    navigate("/admin"); // Redirecionar para a página de admin
  };

  return (
    <section className="models">
      <h2>Nossos Modelos</h2>
      <div className="model-list">
        {models.map((model) => (
          <div className="card" key={model.id}>
            <div
              className="model-item1"
              style={{
                backgroundImage: model.imageBase64
                  ? `url(${model.imageBase64})`
                  : "none",
              }}
            >
              {!model.imageBase64 && <p>Sem Imagem</p>}
              {isAuthenticated && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(model.id)}
                >
                  &times;
                </button>
              )}
            </div>
            <span>{model.title}</span>
          </div>
        ))}
      </div>
      {/* Botão de adicionar visível apenas se o usuário estiver autenticado */}
      {isAuthenticated && (
        <button className="add-button" onClick={handleAddModel}>
          Adicionar Modelo
        </button>
      )}
      <span>*Confirmar possibilidades de personalizações</span>
    </section>
  );
};

export default Models;
