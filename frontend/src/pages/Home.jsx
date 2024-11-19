import Layout from "../components/Layout";
import DiaCalendario from "../components/DiaCalendario";
import Calendario from "../components/Calendario";
import Menu from "../components/Menu";
import {fetchRoles, getSchoolIdByName, fetchUserIdByEmail} from "../interface/auth";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

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
  if(month <10){
    "0".concat(month);
  }




  for (let i = 1; i <= dayNum; i++) {
    if (i < 10) {
      dia = "0";
      isEvent=true;
    } else {dia = ""; isEvent=false;}
    result.push(
      <DiaCalendario
        dia={dia + i +"/"+ month}
        isEvent={isEvent}
        idEscola={idEscola}
        key={i}
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

  const [role,setRole] = useState ("");
  const {state} = useLocation();


  const getRole = async () =>{
    const schoolName =  state.name;
    const userName = JSON.parse( Cookies.get("user")).email;

    const schoolId = await getSchoolIdByName(schoolName);
    const userId = await fetchUserIdByEmail(userName);

    const response = await fetchRoles(userId,schoolId)
    
    setRole(response);
  }

  getRole();
  console.log(Cookies.get("role"));
 
  return(<Layout connected={Cookies.get("user")}>
    <Menu role={"PROVOST"} nomeEscola={state.name} idEscola={state.name}></Menu>
    <Calendario monthName={getMonthName(date.getMonth())} content={calendarDays()}></Calendario>
  </Layout>)
}
