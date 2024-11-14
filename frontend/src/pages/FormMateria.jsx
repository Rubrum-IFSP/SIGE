import Layout from "../components/Layout";
import { getClassesBySchoolId, getSchoolClassIdByName, getSchoolIdByName} from "../interface/auth";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import "./Atendimento.css";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`

export default function FormMateria() {

  const {state} = useLocation();

  const [subject,setSubject ]= useState({});

  const [classes,setClasses] = useState([]);
  const [schoolId, setSchoolId] = useState({});

  useEffect(()=>{
    
    const fetchClasses = async ()=>{

      console.log(state.schoolName)

      const id = await getSchoolIdByName(state.schoolName);

      setSchoolId({schoolId:id});

      const res = await getClassesBySchoolId(id);


      setClasses(res);
    }

    

    fetchClasses();

  },[state.schoolName])

  const getHtmlClasses = () =>{

    return classes.map((classItem)=>(
      <option key={classItem.schoolId}>{classItem.name}</option>
    ))
  }

  const onChangeHandler = (e) =>{
    e.preventDefault();

    const name = e.target.name;
    const copy = subject;
    copy[name] = e.target.value;
    setSubject(copy);

    console.log(copy);
  }
  return (
    <Layout connected={Cookie.get("user")}>
      <style>{css}</style>
      <div className="atendimentoWrapper">
        <form>
          <h1>Matéria</h1>
          <label>Nome:</label>
          <input onChange={onChangeHandler} type="text" name="title" />
          <label>Classe:</label>
          <select>
            {getHtmlClasses()}
            </select>
          
          <ConfirmButton text={"Cadastrar Matéria"} />
        </form>
      </div>
    </Layout>
  );
}
