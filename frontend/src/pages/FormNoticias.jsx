import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }

  .main-wrappers {
    display: flex;
    gap: 1em;
    justify-content: center;
    align-items: center;
  }

  .noticia.subtitulo {
    font-size: 1.4em;
    font-weight: 700;
    color: black;
  }

  .noticia.paragrrafo {
    text-align: justify;
  }
`

export default function Atendimeneto() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("Título");

  class Component {
    constructor(name, value, tag) {
      this.name = name;
      this.value = value;
      this.tag = tag;
    }
  }

  const changeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    const newComponent = new Component(e.target.name, e.target.value);
    const newContent = [...content, newComponent];
    setContent(newContent);
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    const contentCopy = [...content];
    const index = e.target.getAttribute("index");

    contentCopy[index].value = e.target.value;

    setContent(contentCopy);
  }

  const moveContent = (e) => {
    e.preventDefault();
    if (content.length <= 0) return;
    
    const index = parseInt(e.target.getAttribute("index"));
    const dir = parseInt(e.target.getAttribute("dir"));
    const temp = content[index + dir];
    const target = content[index];
    const contentCopy = [...content];
    
    contentCopy[index + dir] = target;
    contentCopy[index] = temp;

    setContent(contentCopy);
  }

  const removeContent = (e) => {
    e.preventDefault();
    const contentCopy = [...content];
    contentCopy.splice(e.target.getAttribute("index"), 1);
    setContent(contentCopy);
  }

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>

      <div className="main-wrappers">
        <div className="atendimentoWrapper">
          <h1>Notícias</h1>

          <div>
            <form>
              <div>
                <label>Título:</label>
                <input type="text" name="title" onChange={changeTitle} value={title} />
              </div>
              
              <div>
                <div>
                  <button onClick={onClickHandler} name="subtitulo">Adicionar Subtítulo</button>
                  <button onClick={onClickHandler} name="paragrafo">Adicionar Parágrafo</button>
                  <button onClick={onClickHandler} name="imagem">Adicionar Imagem</button>
                </div>

                <div>
                  {(content.length > 0) ? (
                      content.map((e, index) => {
                        const id = e.name + "-" + index;

                        return(
                          <div key={index}>
                            <label htmlFor={id}>{(index + 1) + " - " + e.name}</label>
                            {e.name == "imagem" ? (
                              <input type="file" id={id} onChange={onChangeHandler} index={index} value={e.value} />
                            ) : (
                              <textarea id={id} onChange={onChangeHandler} index={index} value={e.value} />
                            )
                            }
                            
                            <button onClick={moveContent} index={index} dir={-1}>Cima</button>
                            <button onClick={moveContent} index={index} dir={1}>Baixo</button>
                            <button onClick={removeContent} index={index}>Remover</button>
                          </div>
                        )

                      })
                    ) : ( <div></div> )}
                    <div>* O nome de sua conta será vinculado  automáticamente à notícia</div>
                </div>
              </div>
              <input className="submitButton" type="submit" value="Enviar" />
            </form>
          </div>
        </div>

        <div className="atendimentoWrapper">
          <div className="noticia-preview">
            <h1>{title}</h1>

            {(content.length > 0) ? (
              content.map((e, index) => {
                return(
                  <div key={index}>
                    <span className={"noticia " + e.name}>{e.value}</span>
                  </div>
                )
              })
            ) : ( <div>O preview de sua notícia ficará aqui!</div> )}
          </div>
        </div>
      </div>
      
    </Layout>
  );
}
