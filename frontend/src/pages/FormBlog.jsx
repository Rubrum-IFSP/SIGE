import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import "./Atendimento.css";
import Cookie from "js-cookie";
import { useState } from "react";
import { getSchoolIdByName, saveBlogPost } from "../interface/auth";
import {Toaster, toast} from "react-hot-toast";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function FormBlog() {

  const{state} = useLocation();
  const [blogPost,setBlogPost] = useState({})
  const user =  JSON.parse(Cookie.get("user"));

  const onChangeHandler = (e)=>{
    e.preventDefault();

    const name = e.target.getAttribute("name");
    const copy = blogPost;
    copy[name] = e.target.value;
    setBlogPost(copy);
    console.log(copy);
  }
  const saveThisPost = async (e)=>{
    e.preventDefault();

    const schoolId = await getSchoolIdByName(state.schoolName);

    const copy = blogPost;

    copy["author"]= user.email;
    copy["schoolId"] = schoolId;

    setBlogPost(copy);
  
    const response = await saveBlogPost(blogPost);

    if(response ==="ok"){
      return toast.success("Notícia Postada!")
    }
    else{
      return toast.error("Algo deu errado!")
    }
  }

  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="atendimentoWrapper">
        <form>
          <h1>Blog Post</h1>
          <label>Título:</label>
          <input type="text" name="title" onChange={onChangeHandler} />
          <label>Conteúdo:</label>
          <textarea name="content" onChange={onChangeHandler}></textarea>
          <input className="submitButton" onClick={saveThisPost} type="submit" value="Enviar" />
        </form>
      </div>
    </Layout>
  );
}
