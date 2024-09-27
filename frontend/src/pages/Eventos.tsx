import Layout from "../components/Layout";
import Noticias from "../components/Noticias";
import NoticiasWrapper from "../components/NoticiasWrapper";

import { useLocation } from "react-router-dom";

export default function EventosPage(props: any) {
  let { state } = useLocation();

  return (
    <Layout connected={true}>
      <NoticiasWrapper
        children={[
          <Noticias
            title={state.id}
            content={state.id}
            datePublished={state.id}
            author={state.id}
          />,
        ]}
      />
    </Layout>
  );
}
