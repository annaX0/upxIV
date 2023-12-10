import Footer from "../../components/Footer";
import Menu from "../../components/Menu";

import axios from "axios";

import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Donate() {
  const { id } = useParams();
  const [infosIng, setInfosIng] = useState({
    nomeOng: "",
    descricao: "",
    qr: "",
  });
  const [infosAnimals, setInfosAnimals] = useState();

  async function getOng() {
    try {
      const response = await axios.get(`http://localhost:3001/getOngs/${id}`);
      setInfosIng(response.data[0]);
    } catch (error) {}
  }

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
    getOng();
    getAnimals();
  }, []);

  return (
    <>
      <Menu />
      <body>
        <div class="container">
          <div class="container_donates">
            <h3>Doar para ong {infosIng && infosIng.nomeOng}</h3>
            <p>{infosIng && infosIng.descricao}</p>
          </div>

          <div class="container_about_ong">
            <div>
              <div className="container-ong">
                <div className="donate-conact">
                  <div className="payment">
                    <h4>Forma de pagamento</h4>
                    <p>
                      Aqui na nossa plataforma, tornamos o processo de doação e
                      contribuição mais simples do que nunca. Agora, aceitamos
                      PIX como uma opção rápida e conveniente de pagamento. Com
                      a praticidade do PIX, você pode apoiar a causa da proteção
                      animal de forma ágil e segura.
                    </p>
                    <img class="pay" src={infosIng && infosIng.qr} alt="" />
                  </div>
                  <div className="contato">
                    <h4>Entre em contato para adotar: </h4>
                    <h4 className="info-contact">
                      Telefone: <p>{infosIng.telefone}</p>
                    </h4>
                    <h4 className="info-contact">
                      Email: <p>{infosIng.email}</p>
                    </h4>
                  </div>
                </div>

                <div>
                  <h4>Animais para adoção</h4>
                  <div className="container-adopt">
                    {infosAnimals &&
                      infosAnimals.map((item) => (
                        <div className="container-info-animal">
                          <h4 className="porte">
                            {item.nome} porte: {item.porte}
                          </h4>
                          <p className="descricao">{item.descricao}</p>
                          <img
                            class="img_adote"
                            src={
                              infosIng &&
                              `http://localhost:3001/public/${item.img}`
                            }
                            alt=""
                            srcset=""
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </>
  );
}
