const url = "http://localhost:8081";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";


export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const getSchoolIdByName = async (name) => {

  try {

      const response = await fetch(url+`/school/get/${encodeURIComponent(name)}`, {

          method: "GET",

          headers: {

              'Content-Type': 'application/json',

              Accept: 'application/json',

          },

      });


      if (!response.ok) {

          throw new Error(`Error: ${response.status} ${response.statusText}`);

      }


      const data = await response.json(); // Parse the JSON response

      return  data.id; // Assuming the SchoolResponseDTO contains an 'id' field

  } catch (error) {

      console.error('Error fetching school ID:', error);

      throw error; // Rethrow the error for further handling

  }

};

export const getClassesBySchoolId = async (id) =>{

    const response = await fetch(url + `/schoolClass/${id}`,{
      method:"GET",
      headers:{
        'Content-type':'application/json',
        'schoolId':id
      }
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data
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
      Authorization: "Bearer " + JSON.parse( Cookie.get("user")).token,
    },
    method: "POST",
    body: JSON.stringify(school),
  }).then((res) =>res);
};

export const saveClass = async (schoolClass) =>{
  return await fetch(url+ "/schoolClass/save",{
    headers:{
      "Content-type" : "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(schoolClass),

}).then((res)=> {
  return res;
}) 
}

export async function getSchoolByEmail(email) {
  
  try {
      const response = await fetch(url + "/school/user", {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'email': email
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return data;

  } catch (error) {
      console.error('Failed to fetch schools:', error);
      throw error; 

  }

}
