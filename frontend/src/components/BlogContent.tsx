import "./BlogContent.css";

interface Props {
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function BlogContent({ author, date, content, title }: Props) {
  return (
    <div className="blogContent">
      <h1>{title}</h1>
      <span className="content">{content}</span>
      <span className="details">
        {date} - {author}
      </span>
    </div>
  );
}
