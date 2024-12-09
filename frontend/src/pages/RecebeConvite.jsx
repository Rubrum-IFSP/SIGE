import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../components/RecebeConvite.css";
import { joinSchool, validateInvite } from "../interface/invite";

import {Toaster, toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function RecebeConvite (props) {
    const [inviteInfo, setInviteInfo] = useState(undefined);
    const invite =  window.location.hash.split("=")[1];
    const navigate = useNavigate();
    let user;

    const getInviteInfo = async () => {
        const res = await validateInvite(invite);
        setInviteInfo(res);
    }
    getInviteInfo();

    if (Cookies.get("user") == undefined) {
        navigate("/cadastro");
    } else {
        user = JSON.parse( Cookies.get("user") );
    }


    const acceptInvite = async () => {
        const res = await joinSchool(invite, user.token);
        try {
            JSON.parse(res);
            navigate("/");
            return toast.success("Você entrou na escola " + inviteInfo.schoolInfo.name + "!");
        } catch (error) {
            return toast.error(res);
        }
    }

    return(
        <Layout connected={Cookies.get("user")}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="receive-invite-page">
                <div className="receive-invite-wrapper">
                    {/* <div className="receive-images-wrapper">
                        <figure>
                            <img src="./public/default_user.jpg" alt="convidante" />
                        </figure>

                        <figure>
                            <img src="./public/default_school.jpg" alt="" />
                        </figure>
                    </div> */}

                    <div><span>{(inviteInfo != undefined) ? (inviteInfo.userInfo.name) : ("")}</span> está te convidando para a escola <span>{(inviteInfo != undefined) ? (inviteInfo.schoolInfo.name) : ("")}</span></div>

                    <button onClick={acceptInvite}>Aceitar Convite</button>
                </div>
            </div>
        </Layout>
    )
 
}