import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import Blog from "../components/Blog";
import BlogContent from "../components/BlogContent";

export default function BlogPage(props) {
  let { state } = useLocation();

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
