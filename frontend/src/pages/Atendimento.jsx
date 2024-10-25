import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie"

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function Atendimeneto() {
  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Atendimento</h1>
          <label>Email:</label>
          <input type="email" name="userEmail" />
          <label>Dúvida:</label>
          <textarea></textarea>
          <input className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
