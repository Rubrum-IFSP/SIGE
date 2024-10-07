import Layout from "../components/Layout";
import SobreNosContent from "../components/SobreNos";

export default function SobreNos() {
  return (
    <Layout connected={false}>
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
      <SobreNosContent
        imageUrl={"./public/vite.svg"}
        aboutMeText={
          "Felipe Congio Albino, fez parte da equipe que desenvolveu os componentes do Front-End do projeto, utilizando a tecnologia React para criar páginas interativas e fáceis de se navegar."
        }
      />
    </Layout>
  );
}
