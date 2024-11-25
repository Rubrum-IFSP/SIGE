import "./Noticias.css";

interface Props {
  title: string;
  content: string;
  datePublished: string;
  author: string;
  onClickFunction: any;
  role: string;
}

export default function Noticias({
  title,
  content,
  datePublished,
  author,
  onClickFunction,
  role,
}: Props) {
  const jsonContent = JSON.parse(content);
  let formatedContent = "<div></div>";

  if (typeof jsonContent == "object") {
    formatedContent = jsonContent
      .map((e: any) => {
        if (e.tag == "img") {
          return (
            "<figure><" + e.tag + " src='" + e.value + "'" + " /></figure>"
          );
        }

        return "<" + e.tag + ">" + e.value + "</" + e.tag + ">";
      })
      .join(" ");
  }

  return (
    <div className="newsWrapper">
      <h1>{title}</h1>
      <span className="content">
        <div dangerouslySetInnerHTML={{ __html: formatedContent }}></div>
      </span>
      <span className="details">
        {datePublished.split("T")[0]} - {author}
      </span>
      <div className="divWrapperNewsDeleteButton">
        {role === "PROVOST" || role === "ADMIN" ? (
          <button onClick={onClickFunction}>Excluir</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
