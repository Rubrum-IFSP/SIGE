import Layout from "../components/Layout.tsx";
import Form from "../components/formComponents/Form.tsx";
import ConfirmButton from "../components/ConfirmButton.tsx";
import { register, User } from "../interface/auth.ts";
import { useState } from "react";

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
    register(user);
  };

  return (
    <Layout connected={false}>
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
            <input onChange={onChangeHandler} name="password"></input>
          </div>,
          <div className="inputFieldWrapper">
            <label>Confirme sua Senha:</label>
            <input name="passwordConfirm"></input>
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
