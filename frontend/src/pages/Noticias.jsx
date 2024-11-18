import Layout from "../components/Layout";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Content from "../components/Noticias";
import Cookie from "js-cookie";
import { useLocation, Link } from "react-router-dom";

export default function Noticias(props) {
  let { state } = useLocation();

  var isProfessor = true;
  if(isProfessor){
  return (
    <Layout connected={Cookie.get("user")}>
      <NoticiasWrapper
        children={[
          <Content
            title={"Titulo"}
            content={"1234567"}
            datePublished={"12/09"}
            author={"123"}
          ></Content>,
          <div className="centerWrapper"><Link to="/formnoticias" state={{schoolName: state.name}}>Publicar uma Notícia</Link></div>
        ]}
      ></NoticiasWrapper>
    </Layout>
  );
}
else{
  return (
    <Layout>
      <NoticiasWrapper
        children={[
          <Content
            title={"Titulo"}
            content={"1234567"}
            datePublished={"12/09"}
            author={"123"}
          ></Content>,
        ]}
      ></NoticiasWrapper>
    </Layout>
  );
}
}
