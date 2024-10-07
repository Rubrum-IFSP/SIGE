import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </Router>
  );
}

export default App;
