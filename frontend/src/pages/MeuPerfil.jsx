import Layout from "../components/Layout";
import PerfilUser from "../components/PerfilUser";

function School() {
  return (
    <div className="school">
      <span>{"Seila Escola"}</span>
    </div>
  );
}

export default function MeuPerfil() {
  return (
    <Layout connected={false}>
      <PerfilUser name={"felipe"} email={"felipecongioalbino11@gmail.com"}>
        {School()}
        {School()}
        {School()}
        {School()}
      </PerfilUser>
    </Layout>
  );
}
