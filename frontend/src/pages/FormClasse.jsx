import Layout from "../components/Layout";
import ConfirmButton from "../components/ConfirmButton";
import { saveClass , getSchoolIdByName} from "../interface/auth";
import { useState } from "react";
import "./Atendimento.css";
import Cookie from "js-cookie";
import {Toaster, toast} from "react-hot-toast";
import { useLocation } from "react-router-dom";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`


export default function FormClasse() {

  const [schoolClass,setSchoolClass] = useState({});
  const{state} = useLocation();

  const saveThisClass = async (e)=>{
    e.preventDefault();

    const schoolClassCopy = schoolClass;
    console.log(state.name)
    schoolClassCopy["schoolId"] = await getSchoolIdByName(state.name)
    setSchoolClass(schoolClassCopy);
    console.log(schoolClassCopy["schoolId"]);

    const res = await saveClass(schoolClass)

    console.log(res);

    if(res.ok){
      return toast.success("Classe Salva!")
    }
    else{
      return toast.error("Ocorreu algum erro!")
    }
  }

  const onChangeHandler = (e)=>{
    e.preventDefault();

    const schoolClassCopy = schoolClass;
    schoolClassCopy["name"] = e.target.value;
    setSchoolClass(schoolClassCopy);
    console.log(schoolClassCopy);
  }


  return (
    
    <Layout connected={Cookie.get("user")}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Criar Classe</h1>
          <label>Nome:</label>
          <input onChange={onChangeHandler}  type="text" name="schoolClassName" />
          <ConfirmButton text={"Criar Classe"} onClick={saveThisClass}/>
        </form>
      </div>
    </Layout>
  );
}
