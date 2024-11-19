import "./Menu.css";
import { Link } from "react-router-dom";

interface Props {
  nomeEscola: string;
  idEscola: number;
  role: string;
}
export default function Menu({ nomeEscola, role }: Props) {
  if (role === "ADMIN" || role === "PROVOST") {
    return (
      <div className="menuWrapper">
        <h1>{nomeEscola}</h1>
        <div className="dropdown">
          <button>Ensino</button>
          <div className="dropdown-content">
            <Link to="/classes" state={{ name: nomeEscola, role: role }}>
              Classes
            </Link>
            <Link to="/noticias" state={{ name: nomeEscola, role: role }}>
              Notícias
            </Link>
            <Link to="/blog" state={{ name: nomeEscola, role: role }}>
              Blog do Grêmio
            </Link>
            <Link to="/eventos" state={{ name: nomeEscola, role: role }}>
              Eventos
            </Link>
            <Link to="/administracao" state={{ name: nomeEscola, role: role }}>
              Administração
            </Link>
            <Link to="/convite" state={{ name: nomeEscola, role: role }}>
              Convidar
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="menuWrapper">
        <h1>{nomeEscola}</h1>
        <div className="dropdown">
          <button>Ensino</button>
          <div className="dropdown-content">
            <Link to="/classes" state={{ name: nomeEscola, role: role }}>
              Classes
            </Link>
            <Link to="/noticias" state={{ name: nomeEscola, role: role }}>
              Notícias
            </Link>
            <Link to="/blog" state={{ name: nomeEscola, role: role }}>
              Blog do Grêmio
            </Link>
            <Link to="/eventos" state={{ name: nomeEscola, role: role }}>
              Eventos
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
