import "./style.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <div class="container_infos">
            <span>Telefone:</span>
            <p>(12) 3456-7890</p>
          </div>
          <div class="container_infos">
            <span>E-mail:</span>
            <p>suporte@suporte.com.br</p>
          </div>
        </div>

        <div class="link_infos">
          <a href="register_ong">Quero me cadastrar</a>
          <a href="#">Perguntas Frequentes</a>
          <a href="#">Denunciar Abuso</a>
        </div>
      </div>
    </footer>
  );
}
