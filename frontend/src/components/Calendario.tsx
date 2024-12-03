import "./Calendario.css";

interface Props {
  monthName: string;
  content: any;
  leftClickFunction: any;
  rightClickFunction: any;
}

export default function Calendario({
  monthName,
  content,
  leftClickFunction,
  rightClickFunction,
}: Props) {
  return (
    <div className="calendarWrapper">
      <button onClick={leftClickFunction}> {"<"} </button>
      <div>
        <p>{monthName}</p>
        {content}
      </div>

      <button onClick={rightClickFunction}> {">"}</button>
    </div>
  );
}
