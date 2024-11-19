import "./DiaCalendario.css";
import { Link } from "react-router-dom";

interface Props {
  dia: string;
  isEvent: boolean;
  idEscola: any;
  role: string;
}

export default function DiaCalendario({ dia, isEvent, idEscola, role }: Props) {
  if (isEvent) {
    return (
      <div className="dayWrapperActive">
        <Link to="/eventos" state={{ id: idEscola, role: role }}>
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
