import Layout from "../components/Layout";
import { getClassesBySchoolId,getSchoolClassIdByNameAndSchoolId , getSchoolIdByName, saveSubject} from "../interface/auth";
import Form from "../components/formComponents/Form";
import ConfirmButton from "../components/ConfirmButton";
import "./Atendimento.css";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";

const css = `
  .atendimentoWrapper{
    box-shadow: 4px 4px 10px ;
  }
`


export default function FormMateria() {

  const { state } = useLocation();

  

  const [subject, setSubject] = useState({});

  const [selectedClass, setSelectedClass] = useState(""); // New state for selected class

  const [classes, setClasses] = useState([]);

  const [schoolId, setSchoolId] = useState({});


  useEffect(() => {

    const fetchClasses = async () => {

      console.log(state.schoolName);

      const id = await getSchoolIdByName(state.schoolName);

      setSchoolId({ schoolId: id });

      const res = await getClassesBySchoolId(id);

      setClasses(res);

    };


    fetchClasses();

  }, [state.schoolName]);


  const getHtmlClasses = () => {

    return classes.map((classItem) => (

      <option value={classItem.name}>

        {classItem.name}

      </option>

    ));

  };


  const onChangeHandler = (e) => {

    const name = e.target.name;

    const value = e.target.value;


    if (name === "className") {

      setSelectedClass(value); // Update selected class state

    } else {

      setSubject((prevSubject) => ({ ...prevSubject, [name]: value }));

    }


    console.log({ ...subject, [name]: value });

  };


  const saveThisSubject = async (e) => {

    e.preventDefault()

    console.log("Saving subject: ", subject);

    console.log("Selected class: ", selectedClass);

    const schoolId = await getSchoolIdByName(state.schoolName);

    const id = await getSchoolClassIdByNameAndSchoolId(selectedClass,schoolId);

    const subjectData = {
      name: subject.name,
      schoolClassId: id
    }

    const response =  await saveSubject(subjectData);

    if(response){
      return toast.success("Matéria Adicionada");
    }
   
      return toast.error("Algo deu errado!");
  

    

  };


  return (

    <Layout connected={Cookie.get("user")}>
         <Toaster position="top-center" reverseOrder={false} />

      <style>{css}</style>

      <div className="atendimentoWrapper">

        <form onSubmit={saveSubject}>

          <h1>Matéria</h1>

          <label>Nome:</label>

          <input onChange={onChangeHandler} type="text" name="name" />

          <label>Classe:</label>

          <select name="className" value={selectedClass} onChange={onChangeHandler}>

            <option value="" disabled>Select a class</option>

            {getHtmlClasses()}

          </select>

          <ConfirmButton text={"Cadastrar Matéria"} onClick={(e) =>saveThisSubject(e)} />

        </form>

      </div>

    </Layout>

  );

}