import Layout from "../components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPasswordBySchoolId, getSchoolIdByName, savePassword } from "../interface/auth";
import Cookie from "js-cookie"
import {Toaster, toast} from "react-hot-toast";

export default function Convite() {

  const [senha, setSenha] = useState({});
  const[senhaResponse, setSenhaResponse] = useState("");

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
  
    const onChangeHandler = (e) => {
      e.preventDefault();

      const copy = senha;
      const name = e.target.getAttribute("name");
      copy[name] = e.target.value;
      setSenha(copy);
      console.log(senha);
    };

    const criarSenha = async (e) =>{
      e.preventDefault();

      const schoolId = await getSchoolIdByName(state.name);
      console.log(schoolId)

      const res = await savePassword(schoolId, senha["password"]);

      if(res.success){
        return toast.success("Senha Criada com Êxito!")
      }
      else{
        const schoolId = await getSchoolIdByName(state.name);
        console.log(schoolId);
        const response = await getPasswordBySchoolId(schoolId);
        console.log(response);
        setSenhaResponse("Senha: "+response);
        return toast.error("Já existe uma senha de Uso Único!");
      }
      
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
        <label>Senha:</label>
        <input onChange={onChangeHandler} type="text" name="password" />
          
          <button className="submitButton"  onClick={criarSenha} >Convidar</button>
          <label>{senhaResponse? senhaResponse:senhaResponse}</label>
        </form>
      </div>
    </Layout>
  );
}