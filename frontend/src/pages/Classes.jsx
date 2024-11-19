import Layout from "../components/Layout"
import Classes from "../components/Classes"
import { Link, useLocation } from "react-router-dom";
import { getClassesBySchoolId, getSchoolIdByName, getSubjectsBySchoolClassId, deleteSchoolClass } from "../interface/auth";
import Cookie from "js-cookie";
import { useState, useEffect, Children } from "react";
import {Toaster, toast} from "react-hot-toast";





export default function ClassesPage() {

  const [schoolId, setSchoolId] = useState({});

  const [classes, setClasses] = useState([]); // State to hold the classes

  const [subjectsByClass, setSubjectsByClass] = useState({}); // State to hold subjects for each class

  const { state } = useLocation();

  const role = state.role; 
    console.log(state.role)

  const css =`
    .subject{
    display:block;
    font-size:1.2em;
    text-decoration:none;
    color:white;
    font-weight:bold;
    margin-bottom:10px;
    border:3px solid white;
    padding:5px;
    text-align:center;
    border-radius:0.8em;
    margin-top:5px;
    }
    .subject:hover{
        background-color:white;
        color:black;
        transition:0.4s;
    }
    .deleteClassButton{
        text-align:center;
        width: 100%;
        background-color:black;
        border:solid white 3px;
        border-radius:0.8em;
        padding:10px;
        color:white;
        font-weight:bold;   
    }
    .deleteClassButton:hover{
  background-color:rgb(230,26,26);
  transition:0.4s;
    }
  `
    if(role === "PROVOST" || role === "ADMIN"){
    useEffect(() => {

        const fetchClasses = async () => {

            const id = await getSchoolIdByName(state.name);

            setSchoolId({ schoolId: id });


            const res = await getClassesBySchoolId(id);

            setClasses(res); // Store the fetched classes in state


            // Fetch subjects for each class

            const subjectsPromises = res.map(async (classItem) => {

                const subjects = await getSubjectsBySchoolClassId(classItem.id);

                return { classId: classItem.id, subjects };

            });


            // Wait for all subject fetching to complete

            const subjectsResults = await Promise.all(subjectsPromises);

            // Create a mapping of classId to subjects

            const subjectsMap = subjectsResults.reduce((acc, { classId, subjects }) => {

                acc[classId] = subjects;

                return acc;

            }, {});


            setSubjectsByClass(subjectsMap); // Store subjects in state

        };


        fetchClasses();

    }, [state.name]); // Run effect when state.name changes

    const getHtmlClasses = () => {
        return classes.map((classItem) => (
            <div key={classItem.id}>
                <Classes 
                    nomeClasse={classItem.name} 
                    nomeEscola={state.name} 
                    children={
                        <>
                            
                            
                            {/* Render subjects for each class */}
                            {subjectsByClass[classItem.id] && subjectsByClass[classItem.id].length > 0 && (
                                <div >
                                    {subjectsByClass[classItem.id].map((subject) => (
                                        <Link className="subject" to={"/materia"} state={{ schoolName: state.name ,subjectName: subject.name, schoolClassId: classItem.id, role: state.role}} key={subject.id}>{subject.name}</Link>
                                    ))}
                                </div>
                            )}
                            <button className="deleteClassButton" onClick={(e) => deleteThisSchoolClass(e, classItem.name)}>
                                Delete Class
                            </button>
                        </>
                    }
                />
            </div>
        ));
    };

    const deleteThisSchoolClass = async (e, className) => {
        e.preventDefault();
        
        console.log(`Deleting class: ${className}`);

        const schoolId = await getSchoolIdByName(state.name);

        setSchoolId({schoolId: schoolId})

        const response = await deleteSchoolClass(className,schoolId);

        if(response)
            {
                window.location.reload();
            }
        else
        {
            return toast.error("Erro ao Deletar Classe");
        }
        
    };
    return (

        <Layout connected={Cookie.get("user")}>
            <style>{css}</style>
            <Toaster position="top-center" reverseOrder={false} />

            <div className="mainWrapper">

                {[

                    getHtmlClasses(), // Call the function to get HTML

                    <div className="classWrapper" key="links">

                        <div className="linkFormClasses">

                            <Link to="/formclasse" state={{ name: state.name }}>Cadastrar nova Classe</Link>

                        </div>

                        <div className="linkFormClasses">

                            <Link to="/formmateria" state={{ schoolName: state.name }}>Cadastrar nova Matéria</Link>

                        </div>

                    </div>

                ]}

            </div>

        </Layout>

    );

    }

    else if(role  === "PROFESSOR")
    {
        return (

            <Layout connected={Cookie.get("user")}>
                <style>{css}</style>
                <Toaster position="top-center" reverseOrder={false} />
    
                <div className="mainWrapper">
    
                    {"PROFESSOR"}
    
                </div>
    
            </Layout>
    
        );
    }
    else{
        return (

            <Layout connected={Cookie.get("user")}>
                <style>{css}</style>
                <Toaster position="top-center" reverseOrder={false} />
    
                <div className="mainWrapper">
    
                  {"RESTO"}
    
                </div>
    
            </Layout>
    
        );
    }
}