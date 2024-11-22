import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import {deleteSubject, getLessonsBySubjectId} from "../interface/auth.jsx";
import Cookie from "js-cookie";
import {Toaster, toast} from "react-hot-toast";

const atv = {
    titulo: "Lista MAB - 2a Parte",
    descricao: "Peso 2 na média geral da matéria",
    data: "11/11/24"
}

export default function Materia(){

    const {state} = useLocation();

    const navigate = useNavigate();

    const css = 
    `
    .deleteSubjectButton
    {
        margin-top:10px;
        background-color:rgb(164,25,25);
        color:white;
        border:3px solid black;
        border-radius:0.8em;
        padding:5px;
        width:100%;
        font-weight:bold;
    }
    .deleteSubjectButton:hover
    {
        background-color:black;
        color:white;
        transition:0.4s;

    }
    .linkFormAtividade a
    {
        color:black;
    }
    `

    const deleteThisSubject = async () =>
    {

        const response = await deleteSubject(state.subjectName, state.schoolClassId);
        
        if(response){
            navigate("/classes",{
                state:{
                    name: state.schoolName,
                    role: state.role
                }}
            )
        }
        else{
            return toast.error("erro ao deletar a matéria");
        }
    }

    const [lessons, setLessons] = useState([]);


    const getLessons = async () => {

        console.log(state.subjectId);

        const response = await getLessonsBySubjectId(state.subjectId);

        console.log(response);

        setLessons(response); // Store the response in state

    }


    useEffect(() => {

        getLessons(); // Call the function on component mount

    }, [state.subjectId]); // Re-run if subjectId changes


    console.log(state.subjectName, state.schoolClassId);


    if (state.role === "PROVOST" || state.role === "ADMIN") {

        return (

            <Layout connected={Cookie.get("user")}>

                <Toaster position="top-center" reverseOrder={false} />

                <style>{css}</style>

                <MateriaWrapper nomeMateria={state.subjectName}>

                    {lessons.map((atv, index) => (

                        <Atividade key={index} subjectId={state.subjectId} titulo={atv.title} descricao={atv.descricao} role={state.role} />

                    ))}

                    

                    <div className="linkFormAtividade">

                        <Link to="/formatividade" state={{ subjectName: state.subjectName, schoolClassId: state.schoolClassId }}>Cadastrar Nova Atividade</Link>

                    </div>

                    <div className="linkFormAtividade">

                        <Link to="/cadastroprofessor" state={{ subjectName: state.subjectName, schoolClassId: state.schoolClassId, schoolName: state.schoolName }}>Alterar Professor</Link>

                    </div>

                    <button className="deleteSubjectButton" onClick={deleteThisSubject}>Deletar Matéria</button>

                </MateriaWrapper>

            </Layout>

        );

    }

    else {
    
        return (
    
            <Layout connected={Cookie.get("user")}>
    
                <Toaster position="top-center" reverseOrder={false} />
    
                <style>{css}</style>
    
                <MateriaWrapper nomeMateria={state.subjectName}>
    
                    {lessons.map((atv, index) => (
    
                        <Atividade key={index} subjectId={state.subjectId} titulo={atv.title} descricao={atv.descricao} role={state.role} />
    
                    ))}
    
                    
    
                    <div className="linkFormAtividade">
    
                        <Link to="/formatividade" state={{ subjectName: state.subjectName, schoolClassId: state.schoolClassId }}>Cadastrar Nova Atividade</Link>
    
                    </div>
    
                </MateriaWrapper>
    
            </Layout>
    
        );
    
    }
}