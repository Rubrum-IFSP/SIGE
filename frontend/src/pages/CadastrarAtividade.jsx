import Layout from "../components/Layout";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import Cookie from "js-cookie";

export default function CadastrarAtividade(){

    const onChangeHandler  = (e)=> {
        e.preventDefault();

    
    }
    function getClasses(e){
        return(
            <option value={e}>{e}</option>
        )
    }

    return(
        <Layout connected ={Cookie.get("user")}>
            <Form title={"Enviar Atividade"}>
            <div className="inputFieldWrapper">
                <label>Nome:</label>
                <input type="text" onChange={onChangeHandler} name="atividadeNome"></input>
            </div>
            <div className="inputFieldWrapper">
                <label>Data de Entrega:</label>
                <input onChange={onChangeHandler} name="atividadeData" type="date"></input>
            </div>
            <div className="inputFieldWrapper">
                <label>Classe:</label>
                <select  name="classeNome">
                    {getClasses("Classe 1")}
                </select>
            </div>
            
            
            <ConfirmButton text={"Cadastrar"} onClick={"function-CadastrarAtividade.jsx"}>

            </ConfirmButton>
            </Form>
        </Layout>
    )

}

