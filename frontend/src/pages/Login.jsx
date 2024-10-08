import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import InputField from "../components/formComponents/InputField";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Layout connected={false}>
      <Form
        inputFields={[
          <InputField type={"text"} labelText={"Nome:"} nameInput={"name"} />,
          <InputField
            type={"password"}
            labelText={"Senha:"}
            nameInput={"password"}
          />,
        ]}
        title={"Login"}
        children={[
          <ConfirmButton text={"Entrar"} />,
          <div className="linkCadastro">
            <a href="#/cadastro">Cadastrar-se</a>
          </div>,
        ]}
      ></Form>
    </Layout>
  );
}
