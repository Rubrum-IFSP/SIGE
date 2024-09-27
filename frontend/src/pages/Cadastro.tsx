import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import InputField from "../components/formComponents/InputField";
import ConfirmButton from "../components/ConfirmButton";

export default function Cadastro() {
  return (
    <Layout>
      <Form
        inputFields={[
          <InputField type={"text"} labelText={"Nome:"} nameInput={"name"} />,
          <InputField
            type={"password"}
            labelText={"Senha:"}
            nameInput={"password"}
          />,
          <InputField
            type={"password"}
            labelText={"Confirme sua senha:"}
            nameInput={"passwordConfirm"}
          />,
        ]}
        title={"Cadastro"}
        children={[
          <ConfirmButton text={"Entrar"} />,
          <div className="linkCadastro">
            <a href="#/login">Login</a>
          </div>,
        ]}
      />
    </Layout>
  );
}
