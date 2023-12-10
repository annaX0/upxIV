import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterAnimal() {
  const { id } = useParams();

  const [infoAnimals, setInfoAnimals] = useState({
    nome: null,
    idade: null,
    porte: null,
    descricao: null,
    idong: id,
    img: null,
    ativado: 1,
  });

  async function getOng() {
    try {
      const formData = new FormData();
      formData.append("img", infoAnimals.img);

      const combinedData = {
        ...infoAnimals,
        formData: formData,
      };
      const response = await axios.post(
        `http://localhost:3001/newAnimal/${id}`,
        combinedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.info(response.data);
    } catch (error) {
      toast.info(error.response.data);
    }
  }

  return (
    <div>
      <ToastContainer />

      <Menu isLogin id={id} />
      <body>
        <div class="container">
          <h3>Cadastrar Animal</h3>

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
                />
              </div>
              <div class="input">
                <label for="img">Imagem</label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={(e) =>
                    setInfoAnimals({
                      ...infoAnimals,
                      img: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>
          </form>
          <button type="submit" onClick={getOng}>
            Cadastrar
          </button>
        </div>
      </body>
      <Footer />
    </div>
  );
}
