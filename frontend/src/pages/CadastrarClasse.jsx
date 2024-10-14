import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";

export default function CadastrarClasse(){
    return(
        <Layout connected="true">
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