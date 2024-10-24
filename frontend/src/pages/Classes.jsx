import Layout from "../components/Layout"
import Classes from "../components/Classes"
import { Link } from "react-router-dom";

function getClasses(e) {
    let res = [];
  
    for (let i = 0; i < 10; i++) {
      res.push(
        <div className="class">
          <span className="subjectTitle">{e + " " + i}</span>
          <span className="subjectLink">
            <a href="/#/materia">Acessar a Matéria</a>
          </span>
        </div>
      );
    }
    return res;
  }
export default function ClassesPage(){
    return(
        <Layout>
            <style></style>
            <div className="mainWrapper">
           <Classes nomeClasse={"3 INFO"} nomeEscola={"IFSP"}>{[getClasses("Teste"), 
            <div className="linkFormClasses"><Link to="/formclasse">Cadastrar nova Classe</Link></div>,
            <div className="linkFormClasses"><Link to="/formmateria">Cadastrar nova Matéria</Link></div>
            ]}</Classes>
           
            </div>
        </Layout>
    )
}