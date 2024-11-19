import { getSchoolIdByName } from "./auth";
import { url } from "./resources";

const urlCopy = url;

export const uploadNews = async (formData, schoolId, userToken) => {
    return await fetch(urlCopy + "/schools/news/save", {
        headers: {
            schoolId: schoolId,
            Authorization: "Bearer " + userToken
        },
        method: 'post',
        body: formData
    }).then(res => res.json());
}