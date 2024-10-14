const url = "http://10.122.20.13:8081";

export class User {
  public name: string;
  public email: string;
  public password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const register = async (user: User) => {
  const server = await fetch(url + "/auth/register", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res);

  console.log(server);
};
