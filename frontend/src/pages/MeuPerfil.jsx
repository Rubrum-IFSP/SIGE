import Layout from "../components/Layout";
import PerfilUser from "../components/PerfilUser";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";



function School() {
  return (
    <div className="school">
      <span>{"Seila Escola"}</span>
    </div>
  );
}


export default function MeuPerfil() {
  const navigate = useNavigate();
  
  const user = JSON.parse(Cookie.get("user"));
  

  const logout =()  =>{
    Cookie.remove("user");
    console.log("removeu cookie");
    navigate("/",{state:{msg:"removed-cookie"}});
  }
  

  return (
    <Layout connected={Cookie.get("user")}>
      <PerfilUser name={user.name} email={user.email}>
      <button onClick={logout} className="logoutButton">Sair do Perfil</button>  
      </PerfilUser>
    </Layout>
    
);
}
