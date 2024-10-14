import "./Blog.css";

interface Props {
  content: any;
}

export default function Blog({ content }: Props) {
  return <div className="wrapper">{content}</div>;
}
