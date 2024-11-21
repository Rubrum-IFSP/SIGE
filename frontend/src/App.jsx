import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import NoticiasPage from "./pages/Noticias";
import BlogPage from "./pages/Blog";
import EventosPage from "./pages/Eventos";
import LandingPage from "./pages/LandingPage";
import CadastroEscola from "./pages/CadastroEscola";
import Atendimento from "./pages/Atendimento";
import MeuPerfil from "./pages/MeuPerfil";
import SobreNos from "./pages/SobreNos";
import CadastrarClasse from "./pages/CadastrarClasse";
import Index from "./pages/Index";
import CadastrarMateria from "./pages/CadastrarMateria";
import Classes from "./pages/Classes";
import FormBlog from "./pages/FormBlog";
import FormNoticia from "./pages/FormNoticias"
import Materia from "./pages/Materia"
import FormAtividade from "./pages/FormAtividade"
import FormClasse from "./pages/FormClasse"
import FormMateria from "./pages/FormMateria"
import FormEventos from "./pages/FormEventos"
import Administracao from "./pages/Administracao"
import Convite from "./pages/Convite";
import CadastroProfessor from "./pages/CadastroProfessor";
import EntrarEscola from "./pages/EntrarEscola";


function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Index/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/cadastroescola" element={<CadastroEscola />} />
        <Route path="/Atendimento" element={<Atendimento />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/perfil" element={<MeuPerfil />} />
        <Route path="/sobrenos" element={<SobreNos />} />
        <Route path="/cadastroclasse" element={<CadastrarClasse/>}/>
        <Route path="/cadastromateria" element={<CadastrarMateria/>}/>
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/formblog" element={<FormBlog/>}/>
        <Route path="/formnoticias" element={<FormNoticia/>}/>
        <Route path="/materia" element={<Materia/>}/>
        <Route path="/formatividade" element={<FormAtividade/>}/>
        <Route path="/formclasse" element={<FormClasse/>}/>
        <Route path="/formmateria" element={<FormMateria/>}/>
        <Route path="/formeventos" element={<FormEventos/>}/>
        <Route path="/administracao" element ={<Administracao/>}/>
        <Route path="/convite" element={<Convite/>}/>
        <Route path="/cadastroprofessor" element={<CadastroProfessor/>}/>
        <Route path="/entrarescola" element={<EntrarEscola/>}/>
      </Routes>
    </Router>
  );
}

export default App;
