import Layout from "../components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { generateSchoolInvite, getSchoolIdByName } from "../interface/auth";
import Cookie from "js-cookie"

export default function Convite() {

    const [token, setToken] = useState ("");

  const {state} = useLocation();

  const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
    .token{
        color:black;
        font-size:1.2em;
    }
    .submitButton{
    width:100%;
    background-color:white;
    border:3px solid black;
    border-radius:0.8em;
    }
    .submitButton:hover{
        background-color:black;
        color:white;
        transition:0.3s;
    }
`
    const criarConvite = async (e) =>{
        e.preventDefault();
        const schoolId = await getSchoolIdByName(state.name)
        const userEmail = JSON.parse(Cookie.get("user")).email;


        const response = await generateSchoolInvite(schoolId,userEmail);
        setToken(response);
    }
  

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Criar Convite</h1>
          <button className="submitButton"  onClick={criarConvite} >Convidar</button>
          <p className="token">Token: {token}</p>
        </form>
      </div>
    </Layout>
  );
}