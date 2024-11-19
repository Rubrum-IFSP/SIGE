import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";


export default function CadastroProfessor() {
    const css = `
    .atendimentoWrapper{
      box-shadow: 4px 4px 10px ;
    }
  `
  const {state} = useLocation();
  
    return(
        <Layout>
            <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Alterar Professor</h1>
          <label>Matéria: {state.subjectName}</label>
          <select placeholder="a">
            <option>Opção de professor 1</option>
          </select>
          <input  className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>
        </Layout>
    )
}