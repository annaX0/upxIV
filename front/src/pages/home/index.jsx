import "./style.css";
import "../../pages/global.css";
import cat1 from "../../assets/dog.jpg";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { Carousel } from "antd";
import { FcApproval, FcDonate, FcLike, FcRating } from "react-icons/fc";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [infoHome, setInfoHome] = useState([]);
  const [idSelected, setIdSelected] = useState();

  async function getHome() {
    try {
      const response = await axios.get("http://localhost:3001/");
      setInfoHome(response.data);
    } catch (error) {}
  }
  useEffect(() => {
    getHome();
  }, []);

  function hadleDonate(id) {
    setIdSelected(id);
  }

  return (
    <>
      <Menu />
      <body>
        <div className="container_about">
          <div className="text-about">
            <div>
              <h3>Sobre</h3>
              <p>
                Somos uma comunidade apaixonada por causas animais, unidos pelo
                propósito de fazer a diferença na vida daqueles que não têm voz.
              </p>
            </div>
            <a href="http://localhost:3000/register_ong">
              <button className="btn_primary">Cadastrar Ong</button>
            </a>
          </div>
        </div>
        <div className="container">
          <div className="services">
            <div className="service1">
              <h4>Cadastro de ONGs</h4>
              <FcApproval size={60} />
            </div>
            <div className="service1">
              <h4>Animais para Adoção</h4>
              <FcLike size={60} />
            </div>
            <div className="service1">
              <h4>Apadrinhamento de Animais</h4>
              <FcDonate size={60} />
            </div>
            <div className="service1">
              <h4>Processo de Adoção</h4>
              <FcRating size={60} />
            </div>
          </div>
          <div>
            <div className="background-project"></div>
            <div className="container-project">
              <div className="container-text">
                <div className="title-container">
                  <h3>Nosso Projeto</h3>
                  <div className="line"></div>
                </div>
                <p>
                  Nosso principal propósito é criar uma aplicação web inovadora
                  que visa fortalecer o elo entre Organizações Não
                  Governamentais (ONGs) de proteção animal e apaixonados por
                  animais, proporcionando uma plataforma abrangente e
                  interativa.
                </p>
                <a href="http://localhost:3000/register_ong">
                  <button className="btn_primary">Cadastrar Ong</button>
                </a>
              </div>
              <img className="project" src={cat1} alt="" srcset="" />
            </div>
          </div>
          <div>
            <h3 className="title">Doe Agora!</h3>
            <Carousel
              autoplay
              infinite
              draggable
              slidesToShow={infoHome.length > 5 ? 5 : infoHome.length}
            >
              {infoHome.length &&
                infoHome.map((item, index) => (
                  <a
                    href={`http://localhost:3000/donate/${item.idong}`}
                    key={index}
                  >
                    <img
                      class={`img_donate${index === 0 ? " active" : ""}`}
                      src={`http://localhost:3001/public/${item.img}`}
                      alt=""
                      onClick={() => hadleDonate(item.idong)}
                    />
                  </a>
                ))}
            </Carousel>
          </div>
        </div>
      </body>
      <Footer></Footer>
    </>
  );
}
