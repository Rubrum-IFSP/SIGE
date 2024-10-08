import Layout from "../components/Layout";
import Noticias from "../components/Noticias";
import NoticiasWrapper from "../components/NoticiasWrapper";

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
        <Layout connected={false}> 
        <style jsx>{css}</style>
            <NoticiasWrapper>
                <h1 className="teste">Bem Vindo!</h1>
                <Noticias author={"Equipe do SIGE"} content={"Este é nosso projeto de conclusão de curso, um Sistema de Informação e Gerenciamento Escolar (SIGE), desenvolvido por nós, alunos do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, Campus Hortolândia. Seja bem vindo para navegar por nosso site, criar uma escola, classes/turmas, atividades e convidar pessoas que possam se beneficiar do nosso trabalho! "+" O Sistema de Informação e Gerenciamento Escolar é uma aplicação web interativa para escolas, viabilizando um ambiente escolar organizado. Dando ao aluno a possibilidade de acesso e ver informações relacionadas a sua escola, ao professor a manipulação de sua matéria e outras competências e ao Reitor a manipulação de sua organização. "} ></Noticias>
            </NoticiasWrapper>
            <NoticiasWrapper>
                <h1 className="teste">Versões de Software</h1>
                <Noticias datePublished={"01/01/0001"} author={"autor"} content={"Versão 1- atualizações - conteúdo"} title={"1.1 SIGE Version"}></Noticias>
            </NoticiasWrapper>
        </Layout>
    )
}