import Layout from "../components/Layout";
import Content from "../components/BlogContent"
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
                <Content author={"Equipe do SIGE"} content={"Este é nosso projeto de conclusão de curso, um Sistema de Informação e Gerenciamento Escolar (SIGE), desenvolvido por nós, alunos do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, Campus Hortolândia. Seja bem vindo para navegar por nosso site, criar uma escola, classes/turmas, atividades e convidar pessoas que possam se beneficiar do nosso trabalho! "+" O Sistema de Informação e Gerenciamento Escolar é uma aplicação web interativa para escolas, viabilizando um ambiente escolar organizado. Dando ao aluno a possibilidade de acesso e ver informações relacionadas a sua escola, ao professor a manipulação de sua matéria e outras competências e ao Reitor a manipulação de sua organização. "} />
            </NoticiasWrapper>
            <NoticiasWrapper>
                <h1 className="teste">Versões de Software</h1>
                <Content datePublished={"22/11/2024"} author={"Grupo RUBRUM"} content={"Versão 1.2 - Agora o Sige conta com um sistema de notícias e posts feitos para melhorar os canais de comunicação dentro de todas as instituições parceiras!"} title={"1.2 SIGE Version"}></Content>
                <Content datePublished={"22/11/2024"} author={"Grupo RUBRUM"} content={"Versão 1.1 - Agora o SIGE conta com um banco de dados completamente relacional! Ou seja, dessa forma podemos entregar dados e informações sem nenhuma redundância desnecessária, a implementação foi feita utilizando PostgreSQL juntamente com entitades desenvolvidas no servidor em SpringBoot"} title={"1.1 SIGE Version"}></Content>
                <Content datePublished={"26/08/2024"} author={"Grupo RUBRUM"} content={"Versão 1.0 - O Sige utiliza um software stack extenso com frameworks recentes e atualizados, o frontend conta com a tecnologia Vite, um framework derivado do JavaScript que permite a criação de componentes, sua reutilização e useState management, além de serem utilizadas bibliotecas terceirizadas em JS para a criação de notificações e gerenciamento de usuários. A API que liga o frontend com o servidor foi realizada em Java no framework Springboot, além de outras tecnologias como o REST e Hibernate."} title={"1.0 SIGE Version"}></Content>
            </NoticiasWrapper>
        </Layout>
    )
}