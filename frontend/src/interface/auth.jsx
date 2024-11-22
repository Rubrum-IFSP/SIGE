import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { url } from "./resources";

const urlCopy = url;

export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}


export const getSchoolMembersBySchoolId = async (schoolId) =>{
  try{
    const response =  await fetch(urlCopy + `/schoolMember/getMembers?schoolId=${schoolId}`,{
      method: "GET",
      headers:{
        'Content-type' : 'application/json'
      }
    })

    const data = await response.json();
    return data;

  }
  catch(e){
    console.error(e);
  }
}

export const getUserById = async (id) =>{
  try{
    const response =  await fetch(urlCopy + `/user/getUser?id=${id}`,{
      method: "GET",
      headers:{
        'Content-type' : 'application/json'
      }
    })
  
  const data = await response.json();
  return data;
  }
  catch(e){
    console.error(e);
  }
}

export const fetchUserIdByEmail = async (email) => {

  try {

      const response = await fetch(urlCopy +`/user/id?email=${encodeURIComponent(email)}`, {

          method: 'GET',

          headers: {

              'Content-Type': 'application/json',

          },

      });


      if (!response.ok) {

          throw new Error('Network response was not ok');

      }


      const userId = await response.text();

      console.log('User  ID:', userId);

      return userId; // Return the user ID or handle it as needed

  } catch (error) {

      console.error('Error fetching user ID:', error);

      // Handle the error appropriately, e.g., show a message to the user

  }

};

export const getSchoolIdByName = async (name) => {

  try {

      const response = await fetch(urlCopy+`/school/get/${encodeURIComponent(name)}`, {

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

    const response = await fetch(urlCopy + `/schoolClass/${id}`,{
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

  return await fetch(urlCopy + "/auth/register", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res);
};

export const login = async (user) => {

  return await fetch(urlCopy + "/auth/login", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const fetchRoles = async (userId, schoolId) => {

  try {

      const response = await fetch( urlCopy + `/schoolMember/getRoles?userId=${userId}&schoolId=${schoolId}`, {

          method: 'GET',

          headers: {

              'Content-Type': 'application/json',

          },

      });


      if (!response.ok) {

          throw new Error('Network response was not ok');

      }


      const role = await response.text();

      console.log('Role:', role);

      return role; // Return the role or handle it as needed

  } catch (error) {

      console.error('Error fetching role:', error);

      // Handle the error appropriately, e.g., show a message to the user

  }

};


export const saveSchool = async (school) => {

  return await fetch(urlCopy + "/school/save", {
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
  return await fetch(urlCopy+ "/schoolClass/save",{
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
      const response = await fetch(urlCopy + "/school/user", {
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

  const response = await fetch(urlCopy + `/subject/${schoolClassId}`, {

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

      const response = await fetch(urlCopy + '/subject/save', {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify(subjectData),

      });


      if (response.ok) {

          const message = await response.text();

          console.log(message); // Handle the success message as needed

          return response; // Return the success message

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

    const response = await fetch( urlCopy+ `/schoolClass/get/${name}`, {

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
      const response = await fetch(urlCopy+ '/schoolClass/delete', {
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

export const getSchoolClassIdByNameAndSchoolId = async (name, schoolId) => {

  try {

      const res = await fetch(urlCopy+`/schoolClass/search?name=${name}&schoolId=${schoolId}`, {

          method: 'GET',

          headers: {

              'Content-Type': 'application/json',

          },


      });


      if (!res.ok) {

          throw new Error('Something went wrong');

      }


      const data = await res.json();

      return data.id; // Return the response data (SchoolClassResponseDTO)

  } catch (err) {

      console.error(err); // Log error to the console for debugging

      throw err; // Re-throw the error to be handled by the calling function

  }

};

export const getSubjectIdByNameAndSchoolClassId = async (name, schoolClassId) =>{

  try
  {
    const res =  await fetch(urlCopy + `/subject/search?name=${name}&schoolClassId=${schoolClassId}`,
      {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        }
      })    
      if(!res.ok){
        throw new Error("algo deu errado")
      }
      const data = await res.json();
      return data.id;
  }
  catch(err)
  {
    console.error(err);
    throw err;
  }
}

export const deleteSubject = async (subjectName, schoolClassId) => {

  const deleteData = {
    schoolClassId: schoolClassId,
    name: subjectName
  }

try{
      const response = await fetch(urlCopy +'/subject/delete', {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify(deleteData) // Send subjectName as JSON

          // schoolClassId should be sent as a query parameter or included in the body if needed


      });

      if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'failed to delete subject');
      }
      console.log("subject deleted successfully");
      return true;
    }
    catch(error){
      console.error("erro pra deleter subject", error);
      return false
    }

  
};

export const saveLession = async (data) =>{

  try
  {
    const response =  await fetch(urlCopy+ "/lession/save",
      {
        method: 'POST',
        headers:{
          'Content-type' : "application/json",
          
        },
        body: JSON.stringify(data)
      })
  
    if(!response.ok)
    {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'failed to save lession')
    }
    return true;
  }
  catch(error)
  {
    console.error("erro ao salvar lession",error)
    return false
  }
}

export const generateSchoolInvite = async (schoolId, userEmail) => {

  const inviteRequestDTO = {

      schoolId: schoolId,

      userEmail: userEmail

  };


  try {

      const response = await fetch(urlCopy+'/invite/create', {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',
              Authorization: "Bearer " + JSON.parse( Cookie.get("user")).token,

          },

          body: JSON.stringify(inviteRequestDTO),

      });


      if (!response.ok) {

          throw new Error('Failed to generate invite');

      }


      const invite = await response.text();

      return invite;

  } catch (error) {

      console.error('Error:', error);

      throw error; 

  }

};

export const getLessonsBySubjectId = async (subjectId) => {

  try {

    const response = await fetch(urlCopy +`/lession/get?subjectId=${subjectId}`);

    if (!response.ok) {

      throw new Error('Network response was not ok');

    }

    const data = await response.json();

    return data; // This will be the list of lessons

  } catch (err) {

    console.error('Fetch error:', err);

    throw err; // Rethrow the error if needed

  }

};

export const deleteLesson = async (title, subjectId, descricao) => {

  const data ={
    subjectId: subjectId,
    title: title,
    descricao: descricao
  }

  try {
      const response = await fetch(urlCopy+'/lession/delete', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Sending the title in the request body
      });

      if (!response.ok) {
          throw new Error('Failed to delete lesson');
      }

      const result = await response.json();
      console.log('Lesson deleted successfully:', result);
      // Optionally, you can update your state here to remove the lesson from the UI
  } catch (error) {
      console.error('Error deleting lesson:', error);
  }
};

export const savePassword = async (schoolId, password) => {
  const data = {
      schoolId: schoolId,
      schoolPassword: password,
  };

  try {
      const response = await fetch(urlCopy+'/password/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data));

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.text();
      return { success: true, message: result };
  } catch (err) {
      return { success: false, message: err.message };
  }
};

export const enterSchool = async (schoolId, password, userId) => {

  try {

      const response = await fetch(urlCopy+`/password/enter?schoolId=${schoolId}&password=${password}&userId=${userId}`, {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },


      });


      if (!response.ok) {

          throw new Error('Network response was not ok');

      }


      const data = await response.text();

      return data; // Success message

  } catch (err) {

      throw new Error(err.message || 'Something went wrong'); // Handle errors

  }

};


export const updateSchoolMember = async (userId, schoolId, role, data) => {
    const requestData = {
        userId,
        schoolId,
        role,
        data,
    };

    try {
        const response = await fetch(urlCopy+'/schoolMember/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Failed to update the member');
        }

        const result = await response.text();
        return result; // Return success message
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const getMemberClassByUserIdAndSchoolId = async (userId,schoolId) =>{

    const response = await fetch(urlCopy+`/schoolMember/searchClass?userId=${userId}&schoolId=${schoolId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to update the member');
    }

    const result = await response.text();
    return result; // Return success message
}

export const getAllTeachersBySchoolId = async (schoolId) =>{

  const response =  await fetch(urlCopy+`/schoolMember/searchTeachers?schoolId=${schoolId}`,{
    method:"GET",
    headers:{
      'Content-type': 'application/json',
    },
  });

  if(!response.ok){
    throw new Error("eita");
  }

  const result =  await response.json();
  return result;
}

export const updateTeacher = async (professorId, subjectName, schoolClassId) =>{

  const response = await fetch(urlCopy+`/subject/saveProfessor?professorId=${professorId}&subjectName=${subjectName}&schoolClassId=${schoolClassId}`,{
    method: "GET",
    header :{
      'Content-type' : 'application/json',
    },
  });

  if(!response.ok){
    throw new Error("eita")
  }
  const result = await response.text();
  return result;
}

export const fetchTeacherEmailBySubjectNameAndSchoolClassId = async (subjectName, schoolClassId) =>{

  const response = await fetch(urlCopy+`/subject/getProfessor?subjectName=${subjectName}&schoolClassId=${schoolClassId}`,{
    method: 'GET',
    header:{
      'Content-type': 'application/json'
    },
  });

  if(!response.ok){
    throw new Error("error")
  }
  const result = await response.text();
  return result;
}

export const getSchoolClassById = async (schoolClassId) =>{

  const response = await fetch(urlCopy+`/schoolClass/searchById?schoolClassId=${schoolClassId}`,{
    method: "GET",
    headers:{
      'Content-type': 'application/json'
    }
  });

  if(!response.ok){
    throw new Error("error");
  }
  const result = await response.json();
  return result;
}

export const getAllSubjectsByTeacherUserId = async (userId) =>{

  const response = await fetch(urlCopy+`/subject/getByTeacherId?userId=${userId}`,{
    method: 'GET',
    headers:{
      'Content-type':'application/json',
    },
  })

  const data = await response.json();
  return data;
}