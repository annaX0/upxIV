import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import "./style.css";

export default function Menu({ isLogin, id }) {
  const menu = [
    { title: "Lista de animais", link: "animais" },
    { title: "Novo animal", link: "register_animal" },
  ];
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={!scrolling ? "scrolling" : "menu"}>
      <a href="http://localhost:3000/">
        <img src={Logo} alt="" />
      </a>
      {isLogin && menu ? (
        <div className="links">
          {menu.map(({ title, link }) => (
            <div>
              <a href={`/${link}/${id}`}>
                {title}
                <span classNameName="sr-only"></span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="links">
          <div>
            <a href="/">
              Home<span className="sr-only"></span>
            </a>
          </div>
          <div>
            <a href="/register_ong">
              Cadastrar<span className="sr-only"></span>
            </a>
          </div>

          <div>
            <a href="/login">
              Login<span className="sr-only"></span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
