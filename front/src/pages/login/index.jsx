import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import cat from "../../assets/dog.jpg";
import "./style.css";
import Loader from "../../components/Loader";
export default function Login() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState({ email: null, senha: null });
  const [isLogin, setIsLogin] = useState(false);

  async function getLogin(e) {
    e.preventDefault();
    setIsLogin(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:3001/login", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const local = localStorage.getItem("authToken");

      localStorage.setItem("authToken", response.data.token);

      toast.info(response.data.message);

      const nextUrl = `http://localhost:3000/register_animal/${response.data.userId}`;
      window.history.pushState(null, null, nextUrl);
    } catch (error) {
      toast.info(error.response.data.error);
    }
    setIsLogin(false);
  }

  function handleLogin() {
    return (
      <div>
        <button type="submit" onClick={getLogin}>
          Login
        </button>
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      {isLogin && <Loader />}
      <Menu />
      <div className="container">
        <div className="container-login">
          <form className="container_form">
            <div className="title-container">
              <h3>Login</h3>
              <div className="line"></div>
            </div>
            <div class="input">
              <label for="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div class="input">
              <label for="senha">Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                onChange={(e) => setUser({ ...user, senha: e.target.value })}
              />
            </div>
            {handleLogin()}
          </form>
          <img className="project" src={cat} alt="" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
