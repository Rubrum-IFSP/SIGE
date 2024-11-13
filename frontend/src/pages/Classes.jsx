import Layout from "../components/Layout"
import Classes from "../components/Classes"
import { Link, useLocation } from "react-router-dom";
import { getClassesBySchoolId, getSchoolIdByName } from "../interface/auth";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import {Toaster, toast} from "react-hot-toast";
import ConfirmButton from "../components/ConfirmButton";


function getClass(e) {
    let res = [];
  
    for (let i = 0; i < 10; i++) {
      res.push(
        <div className="class">
          <span className="subjectTitle">{e + " " + i}</span>
          <span className="subjectLink">
            <a href="/#/materia">Acessar a Matéria</a>
          </span>
        </div>
      );
    }
    return res;
  }



  export default function ClassesPage() {

    const [schoolId, setSchoolId] = useState({});
  
    const [classes, setClasses] = useState([]); // State to hold the classes
  
    const { state } = useLocation();
  
  
    useEffect(() => {
  
      const fetchClasses = async () => {
  
        const id = await getSchoolIdByName(state.name);
  
        setSchoolId({ schoolId: id });
  
  
        const res = await getClassesBySchoolId(id);
  
        setClasses(res); // Store the fetched classes in state
  
      };
  
  
      fetchClasses();
  
    }, [state.name]); // Run effect when state.name changes
  
  
    const getHtmlClasses = () => {
  
      return classes.map((classItem, index) => (
  
        <div className="class" key={index}>
  
          <span className="subjectTitle">{classItem.name}</span>
  
          <span className="subjectLink">
  
            <Link to="/materia" state={{schoolName: state.name, schoolSubject: classItem.name}} >Acessar a Matéria</Link>
  
          </span>
  
        </div>
  
      ));
  
    };
  
  
    return (
  
      <Layout connected={Cookie.get("user")}>
  
        <Toaster position="top-center" reverseOrder={false} />
  
        <div className="mainWrapper">
  
          <Classes nomeClasse={"3 INFO"} nomeEscola={state.name}>
  
            {[
  
              getHtmlClasses(), // Call the function to get HTML
  
              <div className="linkFormClasses">
  
                <Link to="/formclasse" state={{ name: state.name }}>Cadastrar nova Classe</Link>
  
              </div>,
  
              <div className="linkFormClasses">
  
                <Link to="/formmateria" state={{ name: state.name }}>Cadastrar nova Matéria</Link>
  
              </div>,
  
  
            ]}
  
          </Classes>
  
        </div>
  
      </Layout>
  
    );
  
  }