import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

const obj = {
    nomeProfessor : "Agnaldo",
    nomeMateria : "MAB",
}
const atv = {
    titulo: "Lista MAB - 2a Parte",
    descricao: "Peso 2 na média geral da matéria",
    data: "11/11/24"
}

export default function Materia(){
    return(
        <Layout connected={Cookie.get("user")}>
            <MateriaWrapper nomeMateria={obj.nomeMateria} nomeProfessor={obj.nomeProfessor}>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>               <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                
            </MateriaWrapper>
        </Layout>
    )
}