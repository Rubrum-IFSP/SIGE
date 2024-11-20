import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./NavBar.css";

interface Props {
  children: any;
  connected: boolean;
}

function BasicExample({ connected }: Props) {
  if (connected) {
    return (
      <Navbar expand="lg" className="navBar ">
        <Container className="teste2 ">
          <div className="logo">
            <a href="#/" className="logoBrand">
              SIGE
            </a>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <a href="#/sobrenos" className="link">
                Sobre Nós
              </a>
              <a href="#/atendimento" className="link">
                FAQ/Atendimento
              </a>
              <a href="#/landingpage" className="link">
                Instituições
              </a>

              <Nav.Link href="#link">
                <a href="#/perfil" className="buttonEntrar">
                  Meu Perfil
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg" className="navBar ">
        <Container className="teste2 ">
          <div className="logo">
            <a href="#/" className="logoBrand">
              SIGE
            </a>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <a href="#/sobrenos" className="link">
                Sobre Nós
              </a>

              <Nav.Link href="#link">
                <a href="#/login" className="buttonEntrar">
                  Entrar
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default BasicExample;
