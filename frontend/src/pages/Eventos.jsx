import Layout from "../components/Layout";
import Noticias from "../components/Noticias";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EventosPage(props) {
  const { state } = useLocation();

  if(state.role === "PROVOST" || state.role ==="ADMIN"){
  return (
    <Layout connected={Cookie.get("user")}>
      <NoticiasWrapper
        children={[
         
          <div className="centerWrapper"><Link to="/formeventos" state={{name:state.name}}>Publicar um Evento</Link></div>,
        ]}
      />
    </Layout>
  );
  }
  else{
    return (
      <Layout connected={Cookie.get("user")}>
        <NoticiasWrapper
          children={[
           
          ]}
        />
      </Layout>
    );
  }
}
