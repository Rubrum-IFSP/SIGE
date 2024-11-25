import { ReactNode } from "react";
import "./Classes.css";
import { Link } from "react-router-dom";

interface Props {
  nomeClasse: string;
  nomeEscola: string;
  children: any;
}

export default function Classes({ nomeClasse, nomeEscola, children }: Props) {
  return (
    <div className="classWrapper">
      <Link
        className="ClassesLinkToSpecificClass"
        to="/specificclass"
        state={{ nomeClasse: nomeClasse, nomeEscola: nomeEscola }}
      >
        <h1 className="title">
          {nomeEscola} -{" "}
          {nomeClasse != null ? (
            nomeClasse
          ) : (
            <h1 className="title">
              Você ainda não faz parte desta organização.
            </h1>
          )}
        </h1>
      </Link>
      {children}
    </div>
  );
}
