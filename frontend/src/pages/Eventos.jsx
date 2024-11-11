import Layout from "../components/Layout";
import Noticias from "../components/Noticias";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EventosPage(props) {
  let { state } = useLocation();

  return (
    <Layout connected={Cookie.get("user")}>
      <NoticiasWrapper
        children={[
          <Noticias
            title={state.nome}
            content={state.nome}
            datePublished={state.nome}
            author={state.nome}
          />,
          <div className="centerWrapper"><Link to="/formeventos">Publicar um Evento</Link></div>,
        ]}
      />
    </Layout>
  );
}
