import "./PerfilUser.css";

interface Props {
  name: string;
  email: string;
  children: any;
}

export default function PerfilUser({ name, email, children }: Props) {
  return (
    <div className="perfilWrapper">
      <span>Escolas: </span>
      <div>{children}</div>
      <span>Nome: {name}</span>
      <span>Email: {email}</span>
    </div>
  );
}
