import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import InputField from "../components/formComponents/InputField";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";

export default function CadastroEscola() {
  return (
    <Layout connected={Cookie.get("user")}>
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
