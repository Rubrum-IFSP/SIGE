import Layout from "../components/Layout";
import { useLocation, Link } from "react-router-dom";
import Blog from "../components/Blog";
import BlogContent from "../components/BlogContent";

var isGremio = true;

export default function BlogPage(props) {
  let { state } = useLocation();
  if(isGremio){
  return (
    <Layout connected={true}>
      
      <Blog
        content={[
          <BlogContent
            title={state.id}
            author={state.id}
            date={state.id}
            content={state.id}
          />,<div className="centerWrapper"><Link to="/formblog">Criar um Post</Link></div>,
        ]}
      />
    </Layout>
  );
}
else{
  return (
    <Layout connected={true}>
      <Blog
        content={[
          <BlogContent
            title={state.id}
            author={state.id}
            date={state.id}
            content={state.id}
          />,
        ]}
      />
    </Layout>
  );
}
}
