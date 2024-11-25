import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
import { saveLession, getSubjectIdByNameAndSchoolClassId } from "../interface/auth";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function FormAtividade() {

  const[lession, setLession] = useState ({})

  const {state} = useLocation();

  const onChangeHandler = (e) =>{
    e.preventDefault();

    const name =  e.target.getAttribute("name");
    const copy = lession;

    copy[name] = e.target.value;
    setLession(copy);
    console.log(lession);
  }

  const saveThisLession = async (e)=>{
    e.preventDefault();

    const id = await getSubjectIdByNameAndSchoolClassId(state.subjectName, state.schoolClassId);

    const copy = lession;

    copy["subjectId"] = id;

    setLession(copy);

    const response = await saveLession(lession);

    if(response){
      return toast.success("Atividade Adicionada")
    }
    else{
      return toast.error("Algo deu Errado!")
    }

  }

  console.log(state.subjectName)
  console.log(lession.title + " - ZZ - "+ state.schoolClassId);

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="atendimentoWrapper">
        <form>
          <h1>Nova Atividade</h1>
          <label>Título:</label>
          <input onChange={onChangeHandler} type="text" name="title" />
          <label>Descrição:</label>
          <textarea onChange={onChangeHandler} name="descricao"></textarea>
          <input onClick={saveThisLession} className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
