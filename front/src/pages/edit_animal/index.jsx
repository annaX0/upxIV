import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

export default function EditAnimal({ info, setIsOpen }) {
  const [infoAnimals, setInfoAnimals] = useState({
    nome: info.nome,
    idade: info.idade,
    porte: info.porte,
    descricao: info.descricao,
    idong: info.idong,
    img: info.img,
    ativado: info.ativado,
  });

  const handleEditAnimal = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/editAnimal/${info.idanimal}`,
        infoAnimals
      );
    } catch (error) {
      console.error("Erro ao editar animal:", error);
    }
  };

  const handleDeleteAnimal = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deleteAnimal/${info.idanimal}`
      );
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
    }
  };

  return (
    <>
      <div className="background" onClick={() => setIsOpen(false)}></div>
      <div className="modalEdit">
        <form class="container_form">
          <div class="container_inputs">
            <div class="input">
              <label for="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  setInfoAnimals({ ...infoAnimals, nome: e.target.value })
                }
                defaultValue={info.nome}
              />
            </div>

            <div class="input">
              <label for="age">idade</label>
              <input
                type="text"
                name="age"
                id="age"
                onChange={(e) =>
                  setInfoAnimals({ ...infoAnimals, idade: e.target.value })
                }
                defaultValue={info.idade}
              />
            </div>

            <div class="input">
              <label for="port">porte</label>
              <input
                type="text"
                name="port"
                id="port"
                onChange={(e) =>
                  setInfoAnimals({ ...infoAnimals, porte: e.target.value })
                }
                defaultValue={info.porte}
              />
            </div>

            <div class="input">
              <label for="desc">Descrição</label>
              <input
                type="text"
                name="desc"
                id="desc"
                onChange={(e) =>
                  setInfoAnimals({
                    ...infoAnimals,
                    descricao: e.target.value,
                  })
                }
                defaultValue={info.descricao}
              />
            </div>

            <div
              className="switch"
              onClick={() =>
                setInfoAnimals((prevInfo) => ({
                  ...prevInfo,
                  ativado: prevInfo.ativado === 0 ? 1 : 0,
                }))
              }
            >
              <div
                className={infoAnimals.ativado === 0 ? "false" : "true"}
              ></div>
            </div>
          </div>
          <button type="submit" onClick={handleEditAnimal}>
            Salvar
          </button>
          <button type="submit" onClick={handleDeleteAnimal}>
            Excluir
          </button>
        </form>
      </div>
    </>
  );
}
