import Layout from "../components/Layout"
import Classes from "../components/Classes"

function getClasses(e) {
    let res = [];
  
    for (let i = 0; i < 10; i++) {
      res.push(
        <div className="class">
          <span className="subjectTitle">{e + " " + i}</span>
          <span className="subjectLink">
            <a href="/#/classes">Acessar a Matéria</a>
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
           <Classes nomeClasse={"3 INFO"} nomeEscola={"IFSP"}>{getClasses("Teste")}</Classes>
            </div>
        </Layout>
    )
}