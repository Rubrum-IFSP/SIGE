import Cookie from "js-cookie"
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserIdByEmail, getClassesBySchoolId, getMemberClassByUserIdAndSchoolId, getSchoolIdByName, updateSchoolMember } from "../interface/auth";

export default function AlterarMembro () {

    const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
    select
    {
        margin-top:10px;
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

        console.log(res);
    }

    return (
        <Layout connected={Cookie.get("user")}>
          <style>{css}</style>
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
            </form>
          </div>
        </Layout>
      );
}