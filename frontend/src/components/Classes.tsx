import { ReactNode } from "react";
import "./Classes.css";

interface Props {
  nomeClasse: string;
  nomeEscola: string;
  children: any;
}

export default function Classes({ nomeClasse, nomeEscola, children }: Props) {
  return (
    <div className="classWrapper">
      <h1 className="title">
        {nomeEscola} - {nomeClasse}
      </h1>
      {children}
    </div>
  );
}
