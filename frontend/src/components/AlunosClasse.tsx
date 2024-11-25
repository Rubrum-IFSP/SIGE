interface Props {
  emailPessoa: string;
  rolePessoa: string;
  numeroPessoa: string;
}

import "./AlunosClasse.css";

export default function AlunosClasse({
  rolePessoa,
  emailPessoa,
  numeroPessoa,
}: Props) {
  return (
    <div className="AlunosClasseWrapper">
      <span>
        Aluno {numeroPessoa}: {emailPessoa}
      </span>
      <span>{rolePessoa}</span>
    </div>
  );
}
