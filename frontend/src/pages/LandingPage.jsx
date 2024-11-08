import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import MenuEscola from "../components/MenuEscola";
import School from "../components/School";
import Cookies from "js-cookie";
import { getSchoolByEmail } from "../interface/auth";
import { useEffect, useState } from "react";

export default function LandingPage(props) {
  const {state} = useLocation();
  const user = JSON.parse( Cookies.get("user"))
  const [schools, setSchools] = useState([]); // State to hold schools data

  const [loading, setLoading] = useState(true); // State to manage loading status

  const [error, setError] = useState(null); // State to manage errors


  useEffect(() => {

    const fetchSchools = async () => {

      try {
        const schoolsData = await getSchoolByEmail(user.email);
        console.log('Schools:', schoolsData);
        setSchools(schoolsData); 

      } 
      catch (err) {
        console.error('Error fetching schools:', err);
        setError(err.message); 

      } 
      finally {
        setLoading(false); 
      }

    };


    fetchSchools(); 

  }, [user.email]); 


  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <Layout connected={Cookies.get("user")}>
      <MenuEscola schools={schools.map(school => (

// <li key={school.palette}>{school.name}</li>
 <School key={school.id} name={school.name} ></School>

))} >
      
        </MenuEscola>
    </Layout>
  );
}
