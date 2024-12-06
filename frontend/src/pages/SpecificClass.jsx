import { useLocation } from "react-router-dom"
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import AlunosClasse from "../components/AlunosClasse";
import { useEffect, useState } from "react";
import { fetchRoles, getAllMembersBySchoolClass, getSchoolClassIdByName, getSchoolIdByName, getUserById } from "../interface/auth";

export default function SpecificClass(){

    const {state} = useLocation();
    const[listAlunos, setListAlunos] = useState([]);

    useEffect(()=>{

        const getAllMembersInThisSchoolClass = async ()=>{
            const schoolId = await getSchoolIdByName(state.nomeEscola);
            const schoolClassName = state.nomeClasse;
            const schoolClassId = await getSchoolClassIdByName(schoolClassName);

            const response = await getAllMembersBySchoolClass(schoolId,schoolClassId);
            console.log(response);
            const copy = [];

            for(let i =0;i <response.length;i++)
            {
                const student = await getUserById(response[i].userId);
                student["role"] = await fetchRoles(response[i].userId, schoolId);
                
                copy.push(student)

            }
            setListAlunos(copy)
            console.log(copy)

        }

        getAllMembersInThisSchoolClass();
    },[state.nomeEscola])


    return(
        <Layout connected={Cookies.get("user")}>
            <div className="AlunosClasseContentWrapper">
                {listAlunos.length > 0  ?(listAlunos.map((student,index)=>
                    <AlunosClasse
                        rolePessoa={student.role}
                        emailPessoa={student.email}
                        numeroPessoa={(index+1)}
                        />
                )): (
                    <h1></h1>
                )}
            </div>
        </Layout>
    )
}