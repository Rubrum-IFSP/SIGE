import Layout from "../components/Layout";
import { useLocation, Link } from "react-router-dom";
import Blog from "../components/Blog";
import BlogContent from "../components/BlogContent";
import Cookie from "js-cookie";
import { useEffect , useState} from "react";
import { deleteBlogPostById, getAllBlogPostBySchoolId, getSchoolIdByName } from "../interface/auth";

export default function BlogPage(props) {
  const{ state } = useLocation();
  const[blogPosts, setBlogPosts] = useState([]);

  useEffect(()=>{
    const getAllBlogPosts = async() =>{
      const schoolId = await getSchoolIdByName(state.name);
      const response = await getAllBlogPostBySchoolId(schoolId);

      console.log(response);
      setBlogPosts(response);
    }
    getAllBlogPosts()
  },[state.name])

  const deleteThisPost = async(e,id) =>{
    e.preventDefault();
    
    const response = await deleteBlogPostById(id);
    console.log(response);

    if(response==="ok"){
      window.location.reload();
    }
  }

  if(state.role === "GREMIO"){
  return (
    <Layout connected={Cookie.get("user")}>
      
      <Blog>
      
      {blogPosts.length > 0 ?(
        
        blogPosts.map((post)=>(
          <BlogContent
            title={post.title}
            author={post.author}
            content={post.content}
            onClickFunc={(e)=>deleteThisPost(e,post.id)}
          />
        ))
      ):(
        <div>Ainda não Há Posts</div>
      )}

      <div className="centerWrapper"><Link to="/formblog" state={{schoolName: state.name}}>Criar um Post</Link></div>
      </Blog>
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
