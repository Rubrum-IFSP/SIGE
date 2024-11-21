import Layout from "../components/Layout";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";
import { useState, Alert } from "react";
import {Toaster, toast} from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import {enterSchool, fetchUserIdByEmail, getSchoolIdByName} from "../interface/auth"

export default function EntrarEscola(){

    const [join, setJoin] = useState({});
    const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`
  
    const joinSchool = async (e) =>{
        e.preventDefault();

        const userId = await fetchUserIdByEmail(JSON.parse(Cookie.get("user")).email);

        const schoolName = join["name"];
        const schoolId = await  getSchoolIdByName(schoolName);
        
        const password =  join["password"];

        const response = await enterSchool(schoolId,password,userId);

        console.log(response);

        
    }
  
  
    const onChangeHandler = (e) => {
      e.preventDefault();
      const joinCopy = join;
      
      const name = e.target.getAttribute("name");
      joinCopy[name] = e.target.value;
      setJoin(joinCopy);
      console.log(join);
    };
    

    return (
        <Layout connected={Cookie.get("user")}>
          <style>{css}</style>
          <div className="atendimentoWrapper">
            <form>
              <h1>Entrar em Uma Escola</h1>
              <label>Nome:</label>
              <input onChange={onChangeHandler} type="text" name="name" />
              <label>Senha:</label>
              <input onChange={onChangeHandler} type="text" name="password" />
              <input className="submitButton" onClick={joinSchool} type="submit" value="Entrar" />
            </form>
          </div>
        </Layout>
      );
      
}