import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";
import { Link, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const atv = {
    titulo: "Lista MAB - 2a Parte",
    descricao: "Peso 2 na média geral da matéria",
    data: "11/11/24"
}

export default function Materia(){

    const {state} = useLocation();

    return(
        <Layout connected={Cookie.get("user")}>
            <MateriaWrapper nomeMateria={state.schoolSubject}>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>               <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                
            </MateriaWrapper>
        </Layout>
    )
}