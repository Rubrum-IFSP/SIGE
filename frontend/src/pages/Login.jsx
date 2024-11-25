import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import {Toaster, toast} from "react-hot-toast";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../interface/auth";
import Cookie from "js-cookie";


export default function Login() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();


  const onChangeHandler = (e) => {
    e.preventDefault();
    const userCopy = user;
    
    const name = e.target.getAttribute("name");
    userCopy[name] = e.target.value;
    setUser(userCopy);
    console.log(user);
  };
  
  const loginUser = async () => {
    const res = await login(user)

    if(!res.error){
      navigate("/landingpage")
      console.log(res)


      Cookie.set("user",JSON.stringify(res));
      console.log(Cookie.get("user"))
    }
    else {
      toast.error("Algo deu Errado")
    }
   
  };

  return (
    <Layout connected={false}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Form
        inputFields={[
          <div className="inputFieldWrapper">
            <label>Email:</label>
            <input type="email" onChange={onChangeHandler} name="email"></input>
          </div>,
          <div className="inputFieldWrapper">
          <label>Senha:</label>
          <input type="password" onChange={onChangeHandler} name="password"></input>
        </div>,
        ]}
        title={"Login"}
        children={[
          <ConfirmButton onClick={loginUser} text={"Entrar"} />,
          <div className="linkCadastro">
            <a href="#/cadastro">Cadastrar-se</a>
          </div>,
        ]}
      ></Form>
    </Layout>
  );
}
