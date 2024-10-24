import Layout from "../components/Layout.tsx";
import Form from "../components/formComponents/Form.tsx";
import ConfirmButton from "../components/ConfirmButton.tsx";
import { register, User } from "../interface/auth.ts";
import { useState, Alert } from "react";
import {Toaster, toast} from "react-hot-toast";


export default function Cadastro() {
  const [user, setUser] = useState({});



  const onChangeHandler = (e) => {
    e.preventDefault();
    const userCopy = user;
    
    const name = e.target.getAttribute("name");
    userCopy[name] = e.target.value;
    setUser(userCopy);
    console.log(user);
  };
  
  const registerUser = () => {
    if(user.password === user.passwordConfirm ){
    register(user);
    }
    else {
      return toast.error("Senhas Diferentes!")
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
            <label>Nome:</label>
            <input onChange={onChangeHandler} name="name"></input>
          </div>,
          <div className="inputFieldWrapper">
            <label>Email:</label>
            <input onChange={onChangeHandler} name="email"></input>
          </div>,
          <div className="inputFieldWrapper">
            <label>Senha:</label>
            <input type="password" onChange={onChangeHandler} name="password"></input>
          </div>,
          <div className="inputFieldWrapper">
            <label>Confirme sua Senha:</label>
            <input type="password" onChange={onChangeHandler} name="passwordConfirm"></input>
          </div>,
        ]}
        title={"Cadastro"}
        children={[
          <ConfirmButton onClick={registerUser} text={"Entrar"} />,
          <div className="linkCadastro">
            <a href="#/login">Login</a>
          </div>,
        ]}
      />
    </Layout>
  );
}
