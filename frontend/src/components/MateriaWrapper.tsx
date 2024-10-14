import "./MateriaWrapper.css";
import { Link } from "react-router-dom";

interface Props {
  children: any;
  nomeProfessor: string;
  nomeMateria: string;
}

export default function MateriaWrapper({
  children,
  nomeProfessor,
  nomeMateria,
}: Props) {
  var cadastrar;
  const isProfessor = true;
  if (isProfessor)
    cadastrar = (
      <div className="linkFormAtividade">
        <Link to="/formatividade">Cadastrar Nova Atividade</Link>
      </div>
    );
  else cadastrar = "";

  return (
    <div className="wrapper">
      <div className="subjectInfo">
        <span>
          {nomeProfessor} - {nomeMateria}
        </span>
      </div>
      <div className="atividadesWrapper">{children}</div>
      {cadastrar}
    </div>
  );
}
