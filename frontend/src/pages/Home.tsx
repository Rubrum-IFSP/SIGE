import Layout from "../components/Layout";
import DiaCalendario from "../components/DiaCalendario";
import Calendario from "../components/Calendario";
import Menu from "../components/Menu";
import { useLocation } from "react-router-dom";

export default function Home() {
  let result = [];
  let dia = " ";
  let isEvent = false;
  let idEscola = 123;

  for (let i = 1; i < 31; i++) {
    if (i < 10) {
      dia = "0";
    } else dia = "";

    if (i % 3 == 0) {
      isEvent = true;
    } else isEvent = false;
    result.push(
      <DiaCalendario
        dia={dia + i + "/09"}
        isEvent={isEvent}
        idEscola={idEscola}
      ></DiaCalendario>
    );
  }

  let { state } = useLocation();

  return (
    <Layout connected={true}>
      <Menu nomeEscola={"IFSP"} idEscola={idEscola}></Menu>
      <Calendario monthName={"Setembro"} content={result}></Calendario>
    </Layout>
  );
}
