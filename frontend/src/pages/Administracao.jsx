import Layout from "../components/Layout";
import Cookies from "js-cookie"
import AdmWrapper from "../components/AdmWrapper";
import AdmPerson from "../components/AdmPerson";
import { getSchoolMembersBySchoolId, getSchoolIdByName, getUserById } from "../interface/auth";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Administracao() {

    const { state } = useLocation();

    const [schoolMembers, setSchoolMembers] = useState([]);


    const getUsers = async () => {

        const SchoolMembers = [];

        const idEscola = await getSchoolIdByName(state.name);

        const response = await getSchoolMembersBySchoolId(idEscola);


        for (let i = 0; i < response.length; i++) {

            const user = await getUserById(response[i].userId);

            user["role"] = response[i].role;

            SchoolMembers.push(user);

        }


        console.log(SchoolMembers);

        setSchoolMembers(SchoolMembers); // Update the state with the fetched users

    };


    useEffect(() => {

        getUsers(); // Fetch users when the component mounts

    }, []); // Empty dependency array means this effect runs once when the component mounts


    return (

        <Layout connected={Cookies.get("user")}>

            <AdmWrapper>

                {schoolMembers.map((member, index) => (

                    <AdmPerson key={index} userNumber={"Usuário "+(index+1)+": "} email={member.email} role={member.role} />

                ))}

            </AdmWrapper>

        </Layout>

    );

}