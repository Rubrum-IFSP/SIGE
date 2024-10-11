import Layout from "../components/Layout"
import MateriaWrapper from "../components/MateriaWrapper";
import Atividade from "../components/Atividades";

const obj = {
    nomeProfessor : "Agnaldo",
    nomeMateria : "MAB",
}

export default function Materia(){
    return(
        <Layout>
            <MateriaWrapper nomeMateria={obj.nomeMateria} nomeProfessor={obj.nomeProfessor}>
                <Atividade titulo="ATV1" descricao={"descricao"} data={"11/11/24"}></Atividade>
                <Atividade titulo="ATV2" descricao={"descriescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescricescriccao"} data={"11/11/24"}></Atividade>
            </MateriaWrapper>
        </Layout>
    )
}