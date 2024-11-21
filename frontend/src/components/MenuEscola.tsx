import "./MenuEscola.css";

interface Props {
  schools: any;
}

export default function MenuEscola({ schools }: Props) {
  return (
    <div className="menuEscolaWrapper">
      <div className="adicionarEscolaOption">
        <a href="#/cadastroescola">
          <span>Criar Escola...</span>
        </a>
      </div>
      <div className="adicionarEscolaOption">
        <a href="#/entrarescola">
          <span>Entrar em uma Escola...</span>
        </a>
      </div>
      {schools}
    </div>
  );
}
