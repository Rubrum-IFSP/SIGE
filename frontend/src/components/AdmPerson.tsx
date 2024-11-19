import { useState } from "react";
import "./AdmPerson.css";

interface Props {
  email: string;
  role: string;
  userNumber: string;
}

export default function AdmPerson({ email, role, userNumber }: Props) {
  const [selectedValue, setSelectedValue] = useState<string>(role);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  if (role !== "PROVOST") {
    return (
      <div className="person">
        <p className="email">
          {userNumber}
          {email}
        </p>
        <select value={selectedValue} onChange={handleChange}>
          <option value="ADMIN">Admin</option>
          <option value="GREMIO">Grêmio</option>
          <option value="PROFESSOR">Professor</option>
          <option value="STUDENT">Aluno</option>
        </select>
        <button>Alterar</button>
      </div>
    );
  } else {
    return (
      <div className="person">
        <p className="email">
          {" "}
          {userNumber}
          {email}
        </p>
        <p className="roleProvost">{role}</p>
      </div>
    );
  }
}
