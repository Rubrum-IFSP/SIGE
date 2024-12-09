import Layout from "../components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { generateSchoolInvite, getPasswordBySchoolId, getSchoolIdByName, savePassword } from "../interface/auth";
import Cookie from "js-cookie"
import {Toaster, toast} from "react-hot-toast";

export default function Convite() {

  const [invite, setInvite] = useState("");

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

     const schoolId = await getSchoolIdByName(state.name);
     const userEmail = JSON.parse(Cookie.get("user")).email;
     

     const response = await generateSchoolInvite(schoolId, userEmail);

     setInvite(window.location.origin + "/#/recebeconvite?invite=" + response);

     return toast.success("Seu convite Chegou!")
     
      
    }

    const copyToClipBoard = (e) =>{
      e.preventDefault();

      const copyText = document.getElementById("valueInvite");
      console.log(copyText.value);
      navigator.clipboard.writeText(copyText.value);

      return toast.success("Copiado!");
    }

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="atendimentoWrapper">
        <form>
        <h1>Criar Convite</h1>      
          
          <button className="submitButton"  onClick={criarConvite} >Criar Convite</button>
          <label>{invite? ( <><input type="text" id="valueInvite" value={invite} readOnly></input><button className="submitButton" onClick={copyToClipBoard}>Copiar</button></>):invite}</label>
        
        
        </form>
      </div>
    </Layout>
  );
}