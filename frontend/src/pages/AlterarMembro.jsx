import Cookie from "js-cookie"
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {Toaster, toast} from "react-hot-toast";
import { deleteSchoolMemberByUserIdAndSchoolId, fetchUserIdByEmail, getClassesBySchoolId, getMemberClassByUserIdAndSchoolId, getSchoolIdByName, updateSchoolMember } from "../interface/auth";

export default function AlterarMembro () {

    const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
    select
    {
        margin-top:10px;
    }
    .deleteButton
    {
        width:100%;
        border: 2px solid black;
        background-color: rgb( 255, 21, 21 );
        margin-top:10px;
        border-radius:0.8em;
        padding: 5px 0px 5px 0px;
        font-weight:bolder;
        color:white;
    }
    .deleteButton:hover
    {
        background-color:black;
        color:white;
        transition:0.3s;
    }
`
    const {state} = useLocation();
    const schoolName = state.name;
    const [classes, setClasses] = useState([])
    const [optionClass, setOptionClass] = useState("");

    const [role, setRole] = useState(state.role);
    


    useEffect(()=>{
        const getClasses = async ()=>{
            const id = await getSchoolIdByName(schoolName);
    
            const res = await getClassesBySchoolId(id);
    
            setClasses(res);
        }

        getClasses();
    },[state.name])

    const getHtmlClasses = () =>{
        return classes.map((classItem) =>(
            <option value={classItem.id} >{classItem.name}</option>
        ))
    }

    const onChangeHandler = (e) =>{
        e.preventDefault();

        const newRole = e.target.value;
        setRole(newRole);
        console.log(newRole);
    }
   
    const onChangeHandlerClass = (e) =>{
        e.preventDefault();

        const newClass = e.target.value;
        setOptionClass(newClass);
        console.log(newClass);
    }

    useEffect(()=>{

        const getUserClass = async (e) =>{

            const userId = await fetchUserIdByEmail(state.email);
            const schoolId = await getSchoolIdByName(schoolName);
            const res = await getMemberClassByUserIdAndSchoolId(userId,schoolId);
    
            const copy = res;
            setOptionClass(copy);
            console.log(copy);
        }
        getUserClass();
    },[state.name])
   
    

    const alterarUsuario = async (e) =>{
        e.preventDefault();

        const userId =  await fetchUserIdByEmail(state.email);
        const schoolId = await getSchoolIdByName(schoolName);
        const res =  await updateSchoolMember(userId,schoolId,role,optionClass);

        if(res === "deu certo"){
            return toast.success("Usuário Alterado com Sucesso!")
        }
        else return toast.error("Algo deu Errado! Tente Novamente Depois")
    }

    const deletarUsuario = async (e)=>{
        e.preventDefault();
        const userId = await fetchUserIdByEmail(state.email);
        const schoolId = await getSchoolIdByName(schoolName);

        const res = await deleteSchoolMemberByUserIdAndSchoolId(userId,schoolId);

        if(res==="deu certo"){
            return toast.success("Usuário Excluído")
        }
        else{
            return toast.error("Algo deu Errado")
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
              <h1>Alterar Usuário</h1>
              <label>Email: {state.email}</label>
              <select name="role" value={role} onChange={onChangeHandler}>
              
                    <option value="ADMIN">Admin</option>
                    <option value="PROFESSOR">Professor</option>
                    <option value="GREMIO">Grêmio</option>
                    <option value="STUDENT">Aluno</option>
                    
              </select>
              <select name="classe" value={optionClass} onChange={onChangeHandlerClass}>
              <option value="" disabled selected>Select an option</option>
                    {getHtmlClasses()}
                    
              </select>
               
              <input className="submitButton" onClick={alterarUsuario} type="submit" value="Enviar" />
            <button className="deleteButton" onClick={deletarUsuario}>Deletar Usuário</button>
            </form>
          </div>
        </Layout>
      );
}