import Layout from "../components/Layout";
import SobreNosContent from "../components/SobreNos";
import Cookie from "js-cookie";


export default function SobreNos() {
  return (
    <Layout connected={Cookie.get("user")}>
      <SobreNosContent
        imageUrl={"./public/foto_albino.jpg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu o o Back-end do projeto, utilizando o ambiente de desenvolvimento instalado, desenvolveu principalmente as relações dentro do banco de dados e CRUD das entidades."
        }
      />
      <SobreNosContent
        imageUrl={"./public/foto_fernandes.jpg"}
        aboutMeText={
          "Felipe Fernandes Alves, líder do time que desenvolveu o Back-End da aplicação, inovou com um novo framework ao invés de se contentar com apenas os assuntos passados em aula, iniciou o ambiente de desenvolvimento com novas tecnologias e fomentou uma estratégia de constante aprendizado."
        }
      />
      <SobreNosContent
        imageUrl={"./public/foto_joao.jpg"}
        aboutMeText={
          "João Victor Montanaro, colaborou principalmente no projeto dos componentes visuais do projeto, parte essencial do Front-End da aplicação. Sua parte foi fundamental para a formulação de componentes no framework de JS, além de ajudar com as partes secundárias da interface gráfica."
        }
      />
      <SobreNosContent
        imageUrl={"./public/foto_julia.jpg"}
        aboutMeText={
          "Júlia Moreira de Paula, líder da equipe de desenvolvimento da interface gráfica e design, foi parte essencial na migração de estilos de desenvolvimento do Front-End."
        }
      />
    </Layout>
  );
}
