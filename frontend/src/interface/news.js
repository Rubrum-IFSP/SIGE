import { getSchoolIdByName } from "./auth";
import { url } from "./resources";

const urlCopy = url;

export const uploadNews = async (formData, schoolId, userToken) => {
    return await fetch(urlCopy + "/school/news/save", {
        headers: {
            schoolId: schoolId,
            Authorization: "Bearer " + userToken
        },
        method: 'post',
        body: formData
    }).then(res => res.text());
}

export const getSchoolNews = async (schoolId, userToken) => {
    return await fetch(urlCopy + "/school/news", {
        headers: {
            schoolId: schoolId,
            Authorization: "Bearer " + userToken
        },
        method: 'get'
    }).then(res => res.json());
}