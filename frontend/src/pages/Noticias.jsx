import Layout from "../components/Layout";
import NoticiasWrapper from "../components/NoticiasWrapper";
import Content from "../components/Noticias";
import Cookie from "js-cookie";
import { useLocation, Link, json } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSchoolNews } from "../interface/news";
import { getSchoolIdByName } from "../interface/auth";

export default function Noticias(props) {
  let { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const user = JSON.parse(Cookie.get("user"));
  const schoolName = state.name;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const schoolId = await getSchoolIdByName(schoolName);
      const data = await getSchoolNews(schoolId, user.token);

      if (data != undefined && !data.error) {
        setNews(data.reverse());
      }
      setLoading(false);
    } 

    fetchNews();
  }, []);

  if (loading) {
    return(
      <Layout>
        <div className="wrapper">
          <div className="centerWrapper loading">Carregando...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout connected={Cookie.get("user")}>
      <div className="wrapper">
        {(state.role === "PROVOST" || state.role === "ADMIN") ? (
          <div className="centerWrapper"><Link to="/formnoticias" state={{schoolName: state.name}}>Publicar uma Notícia</Link></div>
        ) : (
          <div></div>
        )}
        {
          (news.length > 0) ? (
            news.map((e, key) => {
              return(
                <Content
                  key={key}
                  title={e.title}
                  content={e.content}
                  datePublished={e.created_at}
                  author={e.authors}
                />
              )
            })
          ) : (
            <div>Nenhuma notícia publicada ainda...</div>
          )
        }
        
      </div>
    </Layout>
  );
}
