import "./Noticias.css";

interface Props {
  title: string;
  content: string;
  datePublished: string;
  author: string;
}

export default function Noticias({
  title,
  content,
  datePublished,
  author,
}: Props) {
  return (
    <div className="newsWrapper">
      <h1>{title}</h1>
      <span className="content">{content}</span>
      <span className="details">
        {datePublished} - {author}
      </span>
    </div>
  );
}
