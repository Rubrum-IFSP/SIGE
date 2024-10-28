import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import InputField from "../components/formComponents/InputField";
import { saveSchool } from "../interface/auth";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";
import { useState } from "react";

export default function CadastroEscola() {
  
  const [school, setSchool] = useState({});
  
  const onChangeHandler = (e) => {
    e.preventDefault();
    const schoolCopy = school;
  
    const name = e.target.getAttribute("name");
    schoolCopy[name] = e.target.value;
    setSchool(schoolCopy);
    console.log(school);
  };

  const registerSchool = async () => {
    const res = await saveSchool(school)

    if(res.ok){
      navigate("/landingpage",{state:{username:"teste"}})
    }
   
  };


  return (
    <Layout connected={Cookie.get("user")}>
      <Form
       title={"Cadastrar Escola"}
      >
<div className="inputFieldWrapper">
      <label>Nome da Escola</label>
      <input onChange={onChangeHandler} name={"schoolName"} type={"text"}></input>
    </div>

    <ConfirmButton onClick={registerSchool} text={"Cadastrar"} />
      </Form>
    </Layout>
  );
}
