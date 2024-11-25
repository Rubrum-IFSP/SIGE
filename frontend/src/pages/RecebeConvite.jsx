import Cookies from "js-cookie"
import { useEffect } from "react";
import Layout from "../components/Layout";
import "../components/RecebeConvite.css";


export default function RecebeConvite (props) {
    if (Cookies.get("user") == null) {
        return;
    }
    
    const user = JSON.parse( Cookies.get("user") );

    useEffect(() => {

    }, []);

    return(
        <Layout connected={Cookies.get("user")}>
            <div className="receive-invite-page">
                <div className="receive-invite-wrapper">
                    <div className="receive-images-wrapper">
                        <figure>
                            <img src="./public/default_user.jpg" alt="convidante" />
                        </figure>

                        <figure>
                            <img src="./public/default_school.jpg" alt="" />
                        </figure>
                    </div>

                    <div><span>Loren ipsum</span> está te convidando para a escola <span>dolor sit amet</span></div>

                    <button>Aceitar Convite</button>
                </div>
            </div>
        </Layout>
    )
 
}