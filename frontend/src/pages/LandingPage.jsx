import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import MenuEscola from "../components/MenuEscola";
import School from "../components/School";
import Cookies from "js-cookie";


export default function LandingPage(props) {
  const {state} = useLocation();
  const user = JSON.parse( Cookies.get("user"))

  console.log("teste user:"+user.name)

  return (
    <Layout connected={Cookies.get("user")}>
      <MenuEscola

      />
    </Layout>
  );
}
