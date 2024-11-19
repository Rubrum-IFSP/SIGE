import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";
import { Link, useLocation , useNavigate} from "react-router-dom";
import {deleteSubject} from "../interface/auth.jsx";
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
                    name: state.schoolName
                }}
            )
        }
        else{
            return toast.error("erro ao deletar a matéria");
        }
    }

    console.log(state.subjectName, state.schoolClassId)
    return(
        <Layout connected={Cookie.get("user")}>
            <Toaster position="top-center" reverseOrder={false} />
            <style>{css}</style>
            <MateriaWrapper nomeMateria={state.subjectName}>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>               
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
               
                <div className="linkFormAtividade">
        <Link to="/formatividade" state={{ subjectName: state.subjectName, schoolClassId: state.schoolClassId}}>Cadastrar Nova Atividade</Link>
      </div>
      <button className="deleteSubjectButton" onClick={deleteThisSubject}>Deletar Matéria</button>
            </MateriaWrapper>
            
        </Layout>
    )
}