import Layout from "../components/Layout";
import InputField from "../components/formComponents/InputField";
import "./Atendimento.css";

export default function Atendimeneto() {
  return (
    <Layout connected={false}>
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
