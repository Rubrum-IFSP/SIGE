import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from "../components/Layout"
import { getSchoolIdByName, getAllTeachersBySchoolId, getUserById, fetchUserIdByEmail, updateTeacher } from "../interface/auth"

export default function CadastroProfessor() {
    const css = `
    .atendimentoWrapper {
      box-shadow: 4px 4px 10px;
    }
  `;

    const [teachers, setTeachers] = useState([]);
    const { state } = useLocation();
    const [optionTeacher, setOptionTeacher] =useState("");

    useEffect(() => {
        const getAllTeachersBySchool = async () => {
            const schoolId = await getSchoolIdByName(state.schoolName);
            console.log(schoolId);
            const res = await getAllTeachersBySchoolId(schoolId);

            const filteredResponse = [];
            for(let i =0;i<res.length;i++){
              const person =await getUserById(res[i].userId);
              filteredResponse.push(person);
            }
            setTeachers(filteredResponse);
            console.log(filteredResponse);
        };

        getAllTeachersBySchool();
    }, [state.schoolName]);

    const saveTeacher = async (e )=>{
      e.preventDefault();

      const professorId = await fetchUserIdByEmail(optionTeacher);
      const subjectName = state.subjectName;
      const schoolClassId = state.schoolClassId;

      const response = await updateTeacher(professorId, subjectName, schoolClassId);

      console.log(response);
    }

    const onChangeHandler = (e) =>{
      e.preventDefault();

      const copy = e.target.value;
      setOptionTeacher(copy);
      console.log(copy);
    }

    return (
        <Layout connected={Cookies.get("user")}>
            <style>{css}</style>
            <div className="atendimentoWrapper">
                <form>
                    <h1>Alterar Professor</h1>
                    <label>Matéria: {state.subjectName}</label>
                    <select value={optionTeacher} onChange={onChangeHandler}>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.email}>
                                {teacher.email}
                            </option>
                        ))}
                    </select>
                    <input className="submitButton" onClick={saveTeacher} type="submit" value="Enviar" />
                </form>
            </div>
        </Layout>
    );
}