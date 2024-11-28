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
    event["date"] = getCurrentDate();
    
    const response = await saveEvent(event);
    console.log(response);
  }

  const getCurrentDate = () =>{
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth()+1).padStart(2,'0');
    const day = String(current.getDate()).padStart(2,'0');

    return `${year}-${month}-${day}`;
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
          <label>Descrição:</label>
          <textarea name="description" onChange={onChangeHandler}></textarea>
          <input className="submitButton" onClick={saveThisEvent}  type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
