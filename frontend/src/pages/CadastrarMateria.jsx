import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";


export default function CadastrarMateria(){

    function getClasses(e){
        return(
            <option value={e}>{e}</option>
        )
    }

    return(
        <Layout connected={Cookie.get("user")}>
            <Form title={"Criar Materia"}>
            <div className="inputFieldWrapper">
                <label>Nome:</label>
                <input type="text" name="materiaNome"></input>
            </div>
            <div className="inputFieldWrapper">
                <label>Classe:</label>
                <select  name="classeNome">
                    {getClasses("Classe 1")}
                </select>
            </div>
            <ConfirmButton text={"Cadastrar"}>

            </ConfirmButton>
            </Form>
        </Layout>
    )
}