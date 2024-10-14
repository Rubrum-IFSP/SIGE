import "./DiaCalendario.css";
import { Link } from "react-router-dom";

interface Props {
  dia: string;
  isEvent: boolean;
  idEscola: any;
}

export default function DiaCalendario({ dia, isEvent, idEscola }: Props) {
  if (isEvent) {
    return (
      <div className="dayWrapperActive">
        <Link to="/eventos" state={{ id: idEscola }}>
          <span>{dia}</span>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="dayWrapperInactive">
        <span>{dia}</span>
      </div>
    );
  }
}
