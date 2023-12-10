import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cat from "../../assets/cat1.jpg";
import { crc16ccitt } from "crc";
import Buffer from "buffer";
import Loader from "../../components/Loader";

export default function RegisterOng() {
  const [image, setImage] = useState();
  const [infosOng, setInfosOng] = useState({
    nome: null,
    telefone: null,
    email: null,
    endereco: null,
    cpf: null,
    nomeOng: null,
    descricao: null,
    pagamento: "pix",
    chave: null,
    liberado: 0,
    img: null,
    qr: "",
    senha: null,
  });
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function generateQRCode() {
    if (infosOng.chave && infosOng.nome) {
      function generateKey(key, message) {
        const payload = [genEMV("00", "BR.GOV.BCB.PIX"), genEMV("01", key)];
        if (message) {
          payload.push(genEMV("02", message));
        }
        return payload.join("");
      }

      function genEMV(id, parameter) {
        if (parameter) {
          const len = parameter.length.toString().padStart(2, "0");
          return `${id}${len}${parameter}`;
        }
      }

      let key = infosOng.chave;
      const payloadKeyString = generateKey(key);

      let version = "01";
      let name = infosOng.nome;
      let city = infosOng.endereco;
      let transactionId = "123";
      let cep = "18073101";
      let value = "";
      let currency = 986;
      let countryCode = "BR";

      let payload = [
        genEMV("00", version),
        genEMV("26", payloadKeyString),
        genEMV("52", "0000"),
        genEMV("53", String(currency)),
      ];

      if (value) {
        payload.push(genEMV("54", value.toFixed(2)));
      }

      name = String(name)
        .substring(0, 25)
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      city = String(city)
        .substring(0, 15)
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      payload.push(genEMV("58", countryCode.toUpperCase()));
      payload.push(genEMV("59", name));
      payload.push(genEMV("60", city));

      if (cep) {
        payload.push(genEMV("61", cep));
      }

      payload.push(genEMV("62", genEMV("05", transactionId)));
      payload.push("6304");

      const stringPayload = payload.join("");
      const crcResult = crc16ccitt(stringPayload)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");
      const payloadPIX = `${stringPayload}${crcResult}`;

      setQr(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${payloadPIX}`
      );
      setInfosOng({
        ...infosOng,
        qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${payloadPIX}`,
      });
    }
  }

  async function newOng(e) {
    generateQRCode();
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", infosOng.img);

    const combinedData = {
      ...infosOng,
      formData: formData,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/registerong",
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
    setIsLoading(false);
  }

  useEffect(() => {
    generateQRCode();
  }, [infosOng.chave]);

  function handleNew() {
    return (
      <div>
        <button type="submit" onClick={newOng}>
          Cadastrar
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <>
      <Menu />
      {isLoading && <Loader />}
      <body>
        <div className="container">
          <div className="container-newOng">
            <div className="container-text">
              <div className="title-container">
                <h3>Cadastrar Ong</h3>
                <div className="line"></div>
              </div>
              <p>
                Bem-vindo à nossa plataforma dedicada à proteção animal. Ao
                cadastrar sua ONG, você está dando um passo crucial para
                garantir o bem-estar dos nossos amigos peludos. Sua iniciativa é
                valiosa e pode fazer toda a diferença!
              </p>
              <img className="project" src={cat} alt="" />
            </div>
            <form action="" method="post" className="container_form">
              <div className="container_inputs">
                <div className="input">
                  <label for="name">Nome</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, nome: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input">
                  <label for="phone">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, telefone: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="mail">E-mail</label>
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, email: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="adress">Endereço</label>
                  <input
                    type="text"
                    name="adress"
                    id="adress"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, endereco: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="ong">Nome da Ong</label>
                  <input
                    type="text"
                    name="ong"
                    id="ong"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, nomeOng: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="ong">Descrição da ong</label>
                  <input
                    type="text"
                    name="ong"
                    id="ong"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, descricao: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="senha">Senha</label>
                  <input
                    name="senha"
                    id="senha"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, senha: e.target.value })
                    }
                    type="password"
                  ></input>
                </div>
                <div className="input">
                  <label for="ong">Chave</label>
                  <input
                    type="text"
                    name="ong"
                    id="ong"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, chave: e.target.value })
                    }
                  />
                </div>

                <div className="input">
                  <label for="img">Logo</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setInfosOng({ ...infosOng, img: e.target.files[0] })
                    }
                  />
                </div>
              </div>
              {handleNew()}
            </form>
          </div>
        </div>
      </body>
      <Footer />
    </>
  );
}
