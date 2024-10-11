import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";
import { Link } from "react-router-dom";

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
        <Layout>
            <MateriaWrapper nomeMateria={obj.nomeMateria} nomeProfessor={obj.nomeProfessor}>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>               <Atividade titulo={atv.titulo} descricao={atv.descricao} data={atv.data}></Atividade>
                
            </MateriaWrapper>
        </Layout>
    )
}