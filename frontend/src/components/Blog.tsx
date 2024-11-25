import "./Blog.css";

interface Props {
  children: any;
}

export default function Blog({ children }: Props) {
  return <div className="wrapper">{children}</div>;
}
