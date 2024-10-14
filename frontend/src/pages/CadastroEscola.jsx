import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import InputField from "../components/formComponents/InputField";
import ConfirmButton from "../components/ConfirmButton";

export default function CadastroEscola() {
  return (
    <Layout connected={true}>
      <Form
       title={"Cadastrar Escola"}
      >
<div className="inputFieldWrapper">
      <label>Nome da Escola</label>
      <input name={"schoolName"} type={"text"}></input>
    </div>

    <ConfirmButton text={"Cadastrar"} />
      </Form>
    </Layout>
  );
}
