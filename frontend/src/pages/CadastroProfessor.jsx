import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from "../components/Layout"
import { getSchoolIdByName, getAllTeachersBySchoolId, getUserById } from "../interface/auth"

export default function CadastroProfessor() {
    const css = `
    .atendimentoWrapper {
      box-shadow: 4px 4px 10px;
    }
  `;

    const [teachers, setTeachers] = useState([]);
    const { state } = useLocation();

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

    return (
        <Layout connected={Cookies.get("user")}>
            <style>{css}</style>
            <div className="atendimentoWrapper">
                <form>
                    <h1>Alterar Professor</h1>
                    <label>Matéria: {state.subjectName}</label>
                    <select placeholder="a">
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} {/* Adjust the property names based on your teacher object structure */}
                            </option>
                        ))}
                    </select>
                    <input className="submitButton" type="submit" value="Enviar" />
                </form>
            </div>
        </Layout>
    );
}