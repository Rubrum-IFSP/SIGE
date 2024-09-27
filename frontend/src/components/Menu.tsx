import "./Menu.css";
import { Link } from "react-router-dom";

interface Props {
  nomeEscola: string;
  idEscola: number;
}
export default function Menu({ nomeEscola, idEscola }: Props) {
  return (
    <div className="menuWrapper">
      <h1>
        {nomeEscola} - {idEscola}
      </h1>
      <div className="dropdown">
        <button>Ensino</button>
        <div className="dropdown-content">
          <Link to="/classes" state={{ id: idEscola }}>
            Classes
          </Link>
          <Link to="/noticias" state={{ id: idEscola }}>
            Notícias
          </Link>
          <Link to="/blog" state={{ id: idEscola }}>
            Blog do Grêmio
          </Link>
        </div>
      </div>
    </div>
  );
}
