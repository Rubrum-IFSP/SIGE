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

export const getSubjectsBySchoolClassId = async (schoolClassId) => {

  const response = await fetch(url + `/subject/${schoolClassId}`, {

      method: "GET",

      headers: {

          'Content-Type': 'application/json',

          'schoolClassId': schoolClassId // Include the schoolClassId in the headers

      }

  });


  if (!response.ok) {

      throw new Error(`Error: ${response.status} ${response.statusText}`);

  }


  const data = await response.json();

  return data;

};
export const saveSubject = async (subjectData) => {

  try {

      const response = await fetch(url + 'subject/save', {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify(subjectData),

      });


      if (response.ok) {

          const message = await response.text();

          console.log(message); // Handle the success message as needed

          return message; // Return the success message

      } else {

          const errorMessage = await response.text();

          console.error('Error:', errorMessage); // Log the error

          throw new Error(errorMessage); // Throw an error for further handling

      }

  } catch (error) {

      console.error('Fetch error:', error);

      throw error; // Rethrow the error for further handling

  }

};

const getSubjectIdByName = async (name) => {

  try {

      const response = await fetch(url + `/subject/get/${name}`, {

          method: 'GET',

          headers: {

              'Content-Type': 'application/json',

          },

      });


      if (response.ok) {

          const subjectData = await response.json(); // Parse the JSON response

          return subjectData.id; // Return the subject data

      } else {

          const errorMessage = await response.text();

          console.error('Error:', errorMessage); // Log the error

          throw new Error(errorMessage); // Throw an error for further handling

      }

  } catch (error) {

      console.error('Fetch error:', error);

      throw error; // Rethrow the error for further handling

  }

};

export const getSchoolClassIdByName = async (name) => {

  try {

    const response = await fetch( url+ `/schoolClass/get/${name}`, {

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',

      }

    });


    if (!response.ok) {

      const errorMessage = await response.text();

      throw new Error(errorMessage);

    }


    const data = await response.json();

    return data.id; // Return the fetched class details

  } catch (error) {

    console.error('Error fetching class details:', error);

    throw error; // Rethrow the error for further handling

  }

};

export const deleteSchoolClass = async (className, schoolId) => {
  const requestBody = {
      name: className,
      schoolId: schoolId
  };

  try {
      const response = await fetch(url+ '/schoolClass/delete', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to delete school class');
      }

      console.log('School class deleted successfully');
      return true; // Optionally return a success indicator
  } catch (error) {
      console.error('Error deleting school class:', error);
      return false; // Optionally return a failure indicator
  }
};
