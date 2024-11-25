import Layout from "../components/Layout"
import Classes from "../components/Classes"
import { Link, useLocation } from "react-router-dom";
import { getClassesBySchoolId, getSchoolIdByName, getSubjectsBySchoolClassId, deleteSchoolClass, fetchUserIdByEmail, getSchoolMembersBySchoolId, getMemberClassByUserIdAndSchoolId, getSchoolClassById, getAllSubjectsByTeacherUserId } from "../interface/auth";
import Cookie from "js-cookie";
import { useState, useEffect, Children } from "react";
import {Toaster, toast} from "react-hot-toast";





export default function ClassesPage() {

  const [schoolId, setSchoolId] = useState({});

  const [classes, setClasses] = useState([]); // State to hold the classes

  const [subjectsByClass, setSubjectsByClass] = useState({}); // State to hold subjects for each class

  const { state } = useLocation();

  const role = state.role; 

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
                                        <Link className="subject" to={"/materia"} state={{ schoolName: state.name ,subjectName: subject.name, subjectId: subject.id, schoolClassId: classItem.id, role: state.role}} key={subject.id}>{subject.name}</Link>
                                    ))}
                                </div>
                            )}
                            <button className="deleteClassButton" onClick={(e) => deleteThisSchoolClass(e, classItem.name)}>
                                Deletar Classe
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
        const user = JSON.parse(Cookie.get("user"));
        const [subjects, setSubjects] = useState([]);

        useEffect(()=>{
            const thisGetAllSubjectsByTeacherUserId = async ()=>{
                const email = user.email;
                
                const userId = await fetchUserIdByEmail(email);
                const response = await getAllSubjectsByTeacherUserId(userId);

                setSubjects(response);
                console.log(response);
                

            }

            thisGetAllSubjectsByTeacherUserId();
        },[state.name])

        return (

            <Layout connected={Cookie.get("user")}>
                <style>{css}</style>
                <Toaster position="top-center" reverseOrder={false} />
    
                <div className="mainWrapper">
    
                    <Classes nomeEscola={state.name} nomeClasse={"Suas Matérias"}>
                    {subjects.length > 0 ? (
        
        subjects.map((subject) => (

            <div key={subject.id}>

                <Link className="subject" to={"/materia"} state={{ schoolName: state.name, subjectName: subject.name, subjectId: subject.id, schoolClassId: subject.schoolClassId, role: state.role }}>

                    {subject.name}

                </Link>

            </div>

        ))

    ) : (

        <div>No subjects available.</div> // Optional: Message when no subjects are available

    )}
                    </Classes>
    
                </div>
    
            </Layout>
    
        );
    }
    else{
        const user = JSON.parse(Cookie.get("user"));
        const [classe, setClasse] = useState({});
        const [subjects, setSubjects] = useState([]);
        
        useEffect(() => {

            const getClassByUserIdAndSchoolId = async () => {
        
                const userId = await fetchUserIdByEmail(user.email);
        
                const schoolId = await getSchoolIdByName(state.name);
        
                const schoolClassId = await getMemberClassByUserIdAndSchoolId(userId, schoolId);
        
                const schoolClass = await getSchoolClassById(schoolClassId);

                setClasse(schoolClass);

                console.log(schoolClass);
        
            };
        
        
            getClassByUserIdAndSchoolId();
        
        }, [state.name]);
        
        
        useEffect(() => {
        
            const getAllSubjectsByClassId = async () => {
        
                if (classe.id) { // Ensure classe.id is defined before fetching
        
                    const response = await getSubjectsBySchoolClassId(classe.id);
        
                    setSubjects(response);
                    console.log(response)
        
                }
        
            };
        
        
            getAllSubjectsByClassId();
        
        }, [classe]); 


        return (

            <Layout connected={Cookie.get("user")}>
        
                <style>{css}</style>
        
                <Toaster position="top-center" reverseOrder={false} />
        
                <div className="mainWrapper">
        
                    <Classes nomeClasse={classe.name} nomeEscola={state.name}>
        
                        {subjects.length > 0 ? (
        
                            subjects.map((subject) => (
        
                                <div key={subject.id}>
        
                                    <Link className="subject" to={"/materia"} state={{ schoolName: state.name, subjectName: subject.name, subjectId: subject.id, schoolClassId: classe.id, role: state.role }}>
        
                                        {subject.name}
        
                                    </Link>
        
                                </div>
        
                            ))
        
                        ) : (
        
                            <div>Não há matérias cadastradas ainda.</div> // Optional: Message when no subjects are available
        
                        )}
        
                    </Classes>
        
                </div>
        
            </Layout>
        
        );
    }
}