import Layout from "../components/Layout";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Content from "../components/Noticias";

import { useLocation } from "react-router-dom";

export default function Noticias(props) {
  let { state } = useLocation();

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
