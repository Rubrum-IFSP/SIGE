import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";
import { uploadNews } from "../interface/news";
import Cookies from "js-cookie";
import {Toaster, toast} from "react-hot-toast";
import { getSchoolIdByName } from "../interface/auth";
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

  h1, .noticia.subtitulo, .noticia.paragrafo {
    text-align: justify;
  }

  figure {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
  }

  img {
      max-height: 50vh;
      max-width: 100%;
  }

  .noticia.subtitulo {
    font-size: 1.4em;
    font-weight: 700;
    color: black;
  }

  .noticia.paragrrafo {
    text-align: justify;
  }
  .optionButton{
    margin: 10px 10px 0px 0px;
    border:solid black 2px;
    border-radius:0.8em;
    padding:5px;
    font-weight:bolder;
    background-color:white;
  }
  .optionButton:hover{
    background-color:black;
    color:white;
    transition:0.4s;
  }
  .imageInput{
    padding:5px;
  }
  .imageInput:hover{
    background-color:white;
  }
  .imageInput::file-selector-button{
    font-weight:bolder;
    background-color:white;
    border:solid black 2px;
    padding:5px 10px 5px 10px;
    border-radius:0.8em;
  }
  .imageInput::file-selector-button:hover{
    background-color:black;
    color:white;
    transition:0.4s;
  }
`

export default function Atendimeneto() {
  const {state} = useLocation();
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("Título");

  class Component {
    constructor(name, value, tag, preview) {
      this.name = name;
      this.value = value;
      this.tag = tag;
      this.preview = preview;
    }
  }

  const changeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    const newComponent = new Component(e.target.name, e.target.value, e.target.getAttribute("tagName"), "");
    const newContent = [...content, newComponent];
    setContent(newContent);
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    const contentCopy = [...content];
    const index = e.target.getAttribute("index");

    if (e.target.type == "file") {
      contentCopy[index].value = e.target.files[0];
      contentCopy[index].preview = URL.createObjectURL( e.target.files[0] );
    } else {
      contentCopy[index].value = e.target.value;
    }

    setContent(contentCopy);
    console.log(JSON.stringify(content));
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

  const submitNews = async (e) => {
    e.preventDefault();

    let images = content.filter(e => {
      return e.tag === "img";
    });

    images = images.map(e => {
      return e.value;
    });

    const schoolId = await getSchoolIdByName(state.schoolName);
    const user = JSON.parse( Cookies.get("user") );

    const formData = new FormData();
    formData.append("schoolId", schoolId);
    formData.append("newsType", "DIRECTION");
    formData.append("title", title);
    formData.append("authors", user.name);
    formData.append("content", JSON.stringify(content));

    for (const i of images) {
      i["preview"] = "";
      formData.append("images", i);
    }

    const response = await uploadNews(formData, schoolId, user.token);

    if(response === "Notícia adicionada com sucesso!"){
      return toast.success("Notícia adicionada com sucesso!");
    }
    else{
      return toast.error("Algo deu errado!");
    }


  }

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
                  <button className="optionButton" onClick={onClickHandler} name="subtitulo" tagName="h2">Adicionar Subtítulo</button>
                  <button className="optionButton" onClick={onClickHandler} name="paragrafo" tagName="p">Adicionar Parágrafo</button>
                  <button className="optionButton" onClick={onClickHandler} name="imagem" tagName="img">Adicionar Imagem</button>
                </div>

                <div>
                  {(content.length > 0) ? (
                      content.map((e, index) => {
                        const id = e.name + "-" + index;

                        return(
                          <div key={index}>
                            <label htmlFor={id}>{(index + 1) + " - " + e.name}</label>
                            {e.name == "imagem" ? (
                              <input className="imageInput" type="file" id={id} onChange={onChangeHandler} index={index} />
                            ) : (
                              <textarea id={id} onChange={onChangeHandler} index={index} value={e.value} />
                            )
                            }
                            
                            <button className="optionButton" onClick={moveContent} index={index} dir={-1}>Cima</button>
                            <button className="optionButton" onClick={moveContent} index={index} dir={1}>Baixo</button>
                            <button className="optionButton" onClick={removeContent} index={index}>Remover</button>
                          </div>
                        )

                      })
                    ) : ( <div></div> )}
                    <div>* O nome de sua conta será vinculado automáticamente à notícia</div>
                </div>
              </div>
              <input className="submitButton" type="submit" value="Enviar" onClick={submitNews} />
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
                    {e.tag == "img" ? (<figure><img className={"noticia " + e.name} src={e.preview} /></figure>) : (<span className={"noticia " + e.name}>{e.value}</span>)}                    
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
