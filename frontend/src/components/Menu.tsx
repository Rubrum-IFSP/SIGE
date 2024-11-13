import "./Menu.css";
import { Link } from "react-router-dom";

interface Props {
  nomeEscola: string;
  idEscola: number;
}
export default function Menu({ nomeEscola }: Props) {
  return (
    <div className="menuWrapper">
      <h1>{nomeEscola}</h1>
      <div className="dropdown">
        <button>Ensino</button>
        <div className="dropdown-content">
          <Link to="/classes" state={{ name: nomeEscola }}>
            Classes
          </Link>
          <Link to="/noticias" state={{ name: nomeEscola }}>
            Notícias
          </Link>
          <Link to="/blog" state={{ name: nomeEscola }}>
            Blog do Grêmio
          </Link>
          <Link to="/eventos" state={{ name: nomeEscola }}>
            Eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
