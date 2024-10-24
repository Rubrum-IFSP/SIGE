import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import MenuEscola from "../components/MenuEscola";
import School from "../components/School";
const getCookie = (name) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
 
  return cookies ? cookies.split("=")[1] : null;
 };
 
 const user = JSON.parse(sessionStorage.getItem("user"))

export default function LandingPage(props) {
  const {state} = useLocation();
  console.log("teste user:"+user.name)

  return (
    <Layout connected={user.name}>
      <MenuEscola
        schools={[
          <School
            name={
              state.username
            }
            id={"0"}
          />,
        ]}
      />
    </Layout>
  );
}
