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
  var teste;
  
  const functionTeste = async ()=>{
    teste = await getSchoolByEmail(user.email)
    
  }

  return (
    <Layout connected={Cookies.get("user")}>
      <MenuEscola >
        
        </MenuEscola>
    </Layout>
  );
}
