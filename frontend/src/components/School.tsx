import { Link } from "react-router-dom";
import "./School.css";

interface Props {
  name: string;
  id: string;
}
export default function School({ name, id }: Props) {
  return (
    <div className="schoolWrapper">
      <Link className="a" to={"/home"} state={{ id: id, name: name }}>
        <span>{name}</span>
      </Link>
    </div>
  );
}
