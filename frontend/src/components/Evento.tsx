import "./Evento.css";

interface Props {
  date: string;
  content: string;
  title: string;
  role: any;
  onClickFunc?: any;
}

export default function Evento({
  date,
  content,
  title,
  role,
  onClickFunc,
}: Props) {
  return (
    <div className="calendaryEventWrapper">
      <h1>{title}</h1>
      <span className="calendaryEventContent">{content}</span>
      <span className="calendaryEventDetails">{date}</span>
      {role === "PROVOST" || role === "ADMIN" ? (
        <button onClick={onClickFunc}> Excluir </button>
      ) : (
        ""
      )}
    </div>
  );
}
