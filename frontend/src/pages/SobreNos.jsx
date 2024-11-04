import Layout from "../components/Layout";
import SobreNosContent from "../components/SobreNos";
import Cookie from "js-cookie";


export default function SobreNos() {
  return (
    <Layout connected={Cookie.get("user")}>
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Fernandes Alves, líder do time que desenvolveu o Back-End da aplicação, inovou com um novo framework ao invés de se contentar com apenas os assuntos passados em aula, afinal 'A conformidade é o carcereiro da liberdade e o inimigo do crescimento' - Paulo Kogos."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "João Victor Montanaro, colaborou principalmente no projeto dos componentes visuais do projeto, parte essencial do Front-End do projeto. Um querido amigo, filho e futuro esposo, descanse em paz."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Júlia Moreira de Paula, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
    </Layout>
  );
}
