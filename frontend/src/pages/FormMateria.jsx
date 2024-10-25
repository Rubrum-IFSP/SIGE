import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function FormMateria() {
  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Matéria</h1>
          <label>Nome:</label>
          <input type="text" name="title" />
          <label>Classe:</label>
          <select>
            <option>oioi</option>
            </select>
          
          <input className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
