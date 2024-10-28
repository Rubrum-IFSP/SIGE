import { useState } from "react";
import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function Atendimeneto() {
  const [content, setContent] = useState([]);

  class Component {
    constructor(name, value) {
      this.name = name;
      this.value = value;
    }
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    const newComponent = new Component(e.target.name, e.target.value);
    const newContent = content.concat([newComponent]);

    setContent(newContent);
  }

  const moveContent = (e) => {
    e.preventDefault();
    const index = e.target.value;
    if (index <= 0) return;

    const dir = e.target.dir

    const temp = content[index + dir];
    const target = content[index];
    const copy = content.copyWithin();
    
    copy[index + dir] = target;
    copy[index] = temp;

    setContent(copy);
  }

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Notícias</h1>
          <div>
            <label>Título:</label>
            <input type="text" name="title" />
            <label>Autor:</label>
            <input type="text" name="author" />
          </div>
          
          <div>
            <div>
              <button onClick={onClickHandler} name="subtitulo">Adicionar Subtítulo</button>
              <button onClick={onClickHandler} name="imagem">Adicionar Imagem</button>
            </div>
            <div>
              {content.map((c, key) => {
                return(
                  <div key={key}>
                    <label htmlFor={c.name + c.key}> {c.name} </label>
                    <input type="text" name={c.name} id={c.name + key} />
                    <div>
                      <button type="button" onClick={moveContent} value={key} dir={-1}>Up</button>
                      <button type="button" onClick={moveContent} value={key} dir={1}>Down</button>
                      <button type="button">Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <input className="submitButton" type="submit" value="Enviar" />
        </form>
      </div>

      
    </Layout>
  );
}
