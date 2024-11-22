import { useState } from "react";
import "./AdmPerson.css";
import { Link } from "react-router-dom";

interface Props {
  email: string;
  role: string;
  userNumber: string;
  schoolName: string;
}

export default function AdmPerson({
  email,
  role,
  userNumber,
  schoolName,
}: Props) {
  if (role !== "PROVOST") {
    return (
      <div className="person">
        <p className="email">
          {userNumber}
          {email}
        </p>
        <Link
          to="/alterarmembro"
          state={{ name: schoolName, email: email, role: role }}
        >
          Atualizar
        </Link>
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
