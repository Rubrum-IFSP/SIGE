const url = "http://localhost:8081";


export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const register = async (user) => {

  return await fetch(url + "/auth/register", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res);
};

export const login = async (user) => {

  return await fetch(url + "/auth/login", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());
};


export const saveSchool = async (school) => {

  return await fetch(url + "/school/save", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(school),
  }).then((res) =>res);
};

