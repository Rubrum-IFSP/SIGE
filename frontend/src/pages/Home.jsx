import Layout from "../components/Layout";
import DiaCalendario from "../components/DiaCalendario";
import Calendario from "../components/Calendario";
import Menu from "../components/Menu";
import { useLocation } from "react-router-dom";


const date = new Date();

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function calendarDays(){
  let result = [];
  let dia = " ";
  let isEvent = false;
  let idEscola = 123;

  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let dayNum = daysInMonth(month,year);



  for (let i = 1; i <= dayNum; i++) {
    if (i < 10) {
      dia = "0";
    } else dia = "";
    result.push(
      <DiaCalendario
        dia={dia + i + "/09"}
        isEvent={isEvent}
        idEscola={idEscola}
      ></DiaCalendario>
    );
  }



  return (
    result
  );
}

function getMonthName(e){
  const meses =["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

  return meses[e];
}


export default function Home() {
  return(<Layout connected={true}>
    <Menu nomeEscola={"IFSP"} idEscola={123}></Menu>
    <Calendario monthName={getMonthName(date.getMonth())} content={calendarDays()}></Calendario>
  </Layout>)
}
