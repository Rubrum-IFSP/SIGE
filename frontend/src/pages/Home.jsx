import Layout from "../components/Layout";
import DiaCalendario from "../components/DiaCalendario";
import Calendario from "../components/Calendario";
import Menu from "../components/Menu";
import {fetchRoles, getSchoolIdByName, fetchUserIdByEmail, getEventsBySchoolId} from "../interface/auth";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";




export default function Home() {
  
  const [role,setRole] = useState ("");
  const {state} = useLocation();
  const[schoolId, setSchoolId] = useState("");
  const [eventDays, setEventDays] = useState([]);
  const date = new Date();

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }


    

  function calendarDays (){
    let result = [];
    let dia = " ";
    let isEvent = false;


    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let dayNum = daysInMonth(month,year);
    if(month <10){
      "0".concat(month);
    }




    for (let i = 1; i <= dayNum; i++) {
      if (i < 10) {
        dia = "0";
      } 
      else 
      {
        dia = ""; 
      }

      if(eventDays.includes(i.toString()) || eventDays.includes("0"+i.toString())){
        isEvent = true;
      }
      else{
        isEvent = false;
      }

      result.push(
        <DiaCalendario
          dia={dia + i +"/"+ month}
          isEvent={isEvent}
          nomeEscola={state.name}
          key={i}
          role={role}
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

  useEffect(()=>{
    const getRole = async () =>{
    
      const userName = JSON.parse( Cookies.get("user")).email;
      const userId = await fetchUserIdByEmail(userName);
      const schoolId = await getSchoolIdByName(state.name);
  
      console.log(userId)
      console.log(schoolId);
  
      const response = await fetchRoles(userId,schoolId)
      
      setRole(response);
    }

    const getEventDays = async () =>{
      const schoolId = await getSchoolIdByName(state.name)
      const response = await getEventsBySchoolId(schoolId);
      const ThisEventDays = [];

      console.log(response);

      for(let i =0;i<response.length;i++){
        const [year,month,day] = response[i].date.split("-");
        
        if(year === date.getFullYear().toString() && month === (date.getMonth()+1).toString() ){
          ThisEventDays.push(day);
        }

      }
      console.log(ThisEventDays)

      setEventDays(ThisEventDays);
    }

    getEventDays();
  
    getRole();
  },[state.name])

  
 
  return(<Layout connected={Cookies.get("user")}>
    <Menu role={role} nomeEscola={state.name} idEscola={state.name}></Menu>
    <Calendario monthName={getMonthName(date.getMonth())} content={calendarDays()}></Calendario>
  </Layout>)
}
