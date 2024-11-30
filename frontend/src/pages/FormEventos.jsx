import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
import {Toaster, toast} from "react-hot-toast";
import { getSchoolIdByName, saveEvent } from "../interface/auth";
import { useLocation } from "react-router-dom";


export default function Atendimeneto() {

  const [event, setEvent] = useState({});
  const{state} =useLocation();

  const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`
  const onChangeHandler = (e)=>{
    e.preventDefault();
    const name = e.target.getAttribute("name");
    const copy = event;
    copy[name] = e.target.value;
    setEvent(copy);
    console.log(copy);
  }

  const saveThisEvent = async (e)=>{
    e.preventDefault();

    const schoolId = await getSchoolIdByName(state.name);
    console.log(schoolId);

    event["schoolId"] = schoolId;
    
    const response = await saveEvent(event);
  
    if(response === "Evento adicionado com sucesso!"){
      return toast.success("Evento Adicionado!")
    }
    else return toast.error("Algo Deu errado!");  
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
          <h1>Eventos</h1>
          <label>Título:</label>
          <input type="text" name="name" onChange={onChangeHandler}></input>
          <label>Data do Eveneto:</label>
          <input type="date" name="date" onChange={onChangeHandler}></input>
          <label>Descrição:</label>
          <textarea name="description" onChange={onChangeHandler}></textarea>
          <input className="submitButton" onClick={saveThisEvent}  type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
