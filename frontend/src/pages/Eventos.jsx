import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Evento from "../components/Evento";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteEventById, getEventsBySchoolId, getSchoolIdByName } from "../interface/auth";

export default function EventosPage(props) {
  const { state } = useLocation();

  const [events,setEvents] = useState([]);

  useEffect(()=>{
    const getEvents = async () =>{
      const schoolId = await getSchoolIdByName(state.name);
      
      const response = await getEventsBySchoolId(schoolId);

      console.log(response);

      setEvents(response);
    }

    getEvents();
  },[state.name])

  const deleteThisEvent = async (e, eventId)=>{
    e.preventDefault();

    const schoolId = await getSchoolIdByName(state.name);

    const response =await deleteEventById(eventId,schoolId);
    
    if(response=== "deu certo"){
      window.location.reload();
    }
  }

  if(state.role === "PROVOST" || state.role ==="ADMIN"){
  return (
    <Layout connected={Cookie.get("user")}>
      <NoticiasWrapper>

      {events.length>0 ? (events.map((e)=>(
        <Evento
          date={e.date}
          title={e.name}
          content={e.description}
          role={state.role}
          onClickFunc={(event)=>deleteThisEvent(event,e.id)}
          />
      
      ))): (<p>Não Há Eventos ainda</p>)}

      <div className="centerWrapper"><Link to="/formeventos" state={{name:state.name}}>Publicar um Evento</Link></div>
      </NoticiasWrapper>
    </Layout>
  );
  }
  else{
    return (
      <Layout connected={Cookie.get("user")}>
        <NoticiasWrapper>
        {events.length>0 ? (events.map((e)=>(
        <Evento
          date={e.date}
          title={e.name}
          content={e.desc}
          role={state.role}
          />
      
      ))): (<p>Não Há Eventos ainda</p>)}


        </NoticiasWrapper>
      </Layout>
    );
  }
}
