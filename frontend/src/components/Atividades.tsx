import "./Atividades.css";

interface Props {
  data: any;
  titulo: any;
  descricao: any;
  role: string;
}

export default function Atividade({ data, titulo, descricao, role }: Props) {
  if (role === "PROVOST" || role === "PROFESSOR" || role === "ADMIN") {
    return (
      <div className="atividade">
        <span className="atividadeTitulo">
          {titulo} - {data}
        </span>
        <span className="atividadeDescricao">{descricao}</span>
        <button>Excluir</button>
      </div>
    );
  } else {
    return (
      <div className="atividade">
        <span className="atividadeTitulo">
          {titulo} - {data}
        </span>
        <span className="atividadeDescricao">{descricao}</span>
      </div>
    );
  }
}
