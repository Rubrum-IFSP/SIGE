import Layout from "../components/Layout";
import "./Atendimento.css";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function Atendimeneto() {
  return (
    <Layout connected={false}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Blog Post</h1>
          <label>Título:</label>
          <input type="text" name="title" />
          <label>Autor:</label>
          <input type="text" name="author" />
          <label>Conteúdo:</label>
          <textarea></textarea>
          <input className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
