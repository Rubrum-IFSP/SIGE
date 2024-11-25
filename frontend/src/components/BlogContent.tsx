import "./BlogContent.css";

interface Props {
  title: string;
  author: string;
  content: string;
  onClickFunc?: any;
}

export default function BlogContent({
  author,
  content,
  title,
  onClickFunc,
}: Props) {
  return (
    <div className="blogContent">
      <h1>{title}</h1>
      <span className="content">{content}</span>
      <span className="details">{author}</span>
      <div className="blogContentButtonWrapper">
        {onClickFunc && <button onClick={onClickFunc}>Excluir</button>}
      </div>
    </div>
  );
}
