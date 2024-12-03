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

  const date = new Date();
  
  const [eventDays, setEventDays] = useState([]);
  const [month,setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [result,setResult] = useState([]);

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
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

    
  
    getRole();
  },[state.name])

  useEffect(()=>{
    const getEventDays = async () =>{
      const schoolId = await getSchoolIdByName(state.name)
      const response = await getEventsBySchoolId(schoolId);
      const ThisEventDays = [];


      for(let i =0;i<response.length;i++){
        const [thisYear,thisMonth,thisDay] = response[i].date.split("-");
        
        if(thisYear === year && thisMonth === (month+1).toString() ){
          ThisEventDays.push(thisDay);
        }
        console.log(thisMonth)
      }
      console.log(year);
      console.log(month);

      setEventDays(ThisEventDays);
    }

    const calendarDays= async ()=>{
      let dia = " ";
      let isEvent = false;
      let displayMonth;
      let calendarDaysArray = []
  
      let dayNum = daysInMonth(month+1,year);
      if(month+1 <10){
        displayMonth ="0".concat(month+1);
      }
      else{
        displayMonth = (month+1);
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
  
        calendarDaysArray.push(
          <DiaCalendario
            dia={dia + i +"/"+ displayMonth}
            isEvent={isEvent}
            nomeEscola={state.name}
            key={i}
            role={role}
          ></DiaCalendario>
        );
      }

      setResult(calendarDaysArray);
    }


    calendarDays();

    //getEventDays();
  },[month])

  const rightClickFunction = async (e)=>{
    e.preventDefault();
    const copy = month+1;

    if(copy>11){
      const copyYear = year+1;
      setYear(copyYear);
      setMonth(0);
    }

    else{
    setMonth(copy);
    console.log(copy);

    }
  }
  const leftClickFunction = async (e) =>{
    e.preventDefault();
    const copy = month-1;

    if(copy<0){

      const copyYear = year-1;
      setYear(copyYear)
      setMonth(11);
    }
    else{
    setMonth(copy);
    console.log(copy);
    console.log("left click")
    }
  }
 
  return(<Layout connected={Cookies.get("user")}>
    <Menu role={role} nomeEscola={state.name} idEscola={state.name}></Menu>
    <Calendario 
      monthName={ year+" "+getMonthName(month)} 
      content={result}
      leftClickFunction={leftClickFunction}
      rightClickFunction={rightClickFunction}
    ></Calendario>
  </Layout>)
}
