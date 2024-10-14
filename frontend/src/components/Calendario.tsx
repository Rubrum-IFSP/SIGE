import "./Calendario.css";

interface Props {
  monthName: string;
  content: any;
}

export default function Calendario({ monthName, content }: Props) {
  return (
    <div className="calendarWrapper">
      <div>
        <p>{monthName}</p>
        {content}
      </div>
    </div>
  );
}
