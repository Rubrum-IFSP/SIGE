import "./Atividades.css";

interface Props {
  data: any;
  titulo: any;
  descricao: any;
}

export default function Atividade({ data, titulo, descricao }: Props) {
  return (
    <div className="atividade">
      <span className="atividadeTitulo">
        {titulo} - {data}
      </span>
      <span className="atividadeDescricao">{descricao}</span>
    </div>
  );
}
