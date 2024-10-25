import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";

export default function CadastrarClasse(){
    return(
        <Layout connected={Cookie.get("user")}>
            <Form title={"Criar Classe"}>
            <div className="inputFieldWrapper">
                <label>Nome:</label>
                <input type="text" name="classeNome"></input>
            </div>
            <ConfirmButton text={"Cadastrar"}>

            </ConfirmButton>
            </Form>
        </Layout>
    )
}