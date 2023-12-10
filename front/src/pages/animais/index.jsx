import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import EditAnimal from "../edit_animal";

export default function Animais() {
  const { id } = useParams();
  const [infosAnimals, setInfosAnimals] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  async function getAnimals() {
    try {
      const response = await axios.get(
        `http://localhost:3001/getAnimals/${id}`
      );
      setInfosAnimals(response.data);

      response.data.map((item) => item.ativado);
    } catch (error) {}
  }
  useEffect(() => {
    getAnimals();
  }, [isEdit]);

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    setIsEdit(true);
  };

  return (
    <>
      <Menu isLogin id={id} />

      <div class="container">
        {isEdit && (
          <EditAnimal
            info={selectedAnimal}
            onClose={() => {
              setIsEdit(false);
              setSelectedAnimal(null);
            }}
            setIsOpen={setIsEdit}
          />
        )}
        <div className="listAnimals">
          {infosAnimals.length &&
            infosAnimals.map((item) => (
              <div className="animal">
                <img
                  src={`http://localhost:3001/public/${item.img}`}
                  alt=""
                  class="img_donate"
                />
                <div>
                  <h3>{item.nome}</h3>
                  <p>{item.descricao}</p>

                  <h4>{item.ativado === 1 ? "disponivel" : "adotado"}</h4>

                  <button onClick={() => handleEdit(item)}>Editar</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
