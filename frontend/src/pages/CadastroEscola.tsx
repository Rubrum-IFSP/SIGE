import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import InputField from "../components/formComponents/InputField";
import ConfirmButton from "../components/ConfirmButton";

export default function CadastroEscola() {
  return (
    <Layout connected={true}>
      <Form
        inputFields={[
          <InputField type={"text"} labelText={"Nome:"} nameInput={"name"} />,
        ]}
        title={"Cadastrar Escola"}
        children={[<ConfirmButton text={"Cadastrar"} />]}
      ></Form>
    </Layout>
  );
}
