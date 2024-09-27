import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import MenuEscola from "../components/MenuEscola";
import School from "../components/School";

export default function LandingPage(props: any) {
  let { state } = useLocation();

  return (
    <Layout connected={true}>
      <MenuEscola
        schools={[
          <School
            name={
              "Instituto Federal de Ciência e Tecnologia, Campus Hortolândia"
            }
            id={"0"}
          />,
        ]}
      />
    </Layout>
  );
}
