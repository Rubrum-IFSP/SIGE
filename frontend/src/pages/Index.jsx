import Layout from "../components/Layout";
import Noticias from "../components/Noticias";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Cookie from "js-cookie";

const css = `
    .teste{
        color:#ffffff;
        font-size:2.6em;
        font-weight:bolder;
        text-align:center;
        margin-bottom:0.6em;
    }
`

export default function Index(){
    return(
        <Layout connected={Cookie.get("user")}> 
        <style jsx>{css}</style>
            <NoticiasWrapper>
                <h1 className="teste">Bem Vindo!</h1>
             
            </NoticiasWrapper>
            <NoticiasWrapper>
                <h1 className="teste">Versões de Software</h1>
                
            </NoticiasWrapper>
        </Layout>
    )
}