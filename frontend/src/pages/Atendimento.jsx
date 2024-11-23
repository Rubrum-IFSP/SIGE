import Layout from "../components/Layout";
import { fetchUserIdByEmail, saveFaqMessage } from "../interface/auth";
import "./Atendimento.css";
import Cookie from "js-cookie"
import { useState } from "react";
import {Toaster, toast} from "react-hot-toast";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function Atendimeneto() {

  const user = JSON.parse(Cookie.get("user"));
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) =>{
    e.preventDefault();

    const copy = e.target.value;
    setMessage(copy);
    console.log(copy);
  }
  
  const saveMessage = async(e) =>{
    e.preventDefault();

    const userId =  await fetchUserIdByEmail(user.email);
    const response = await saveFaqMessage(userId,message);
    console.log(response);

    if(response === "msg adicionada"){
      return toast.success("Mensagem Enviada aos Desenvolvedores!")
    }
    else return toast.error("Algo deu errado! Tente Novamente Depois");
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
          <h1>Atendimento</h1>
          <label>Dúvida:</label>
          <textarea onChange={onChangeHandler}></textarea>
          <input className="submitButton" onClick={saveMessage} type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
