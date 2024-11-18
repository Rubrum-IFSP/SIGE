import { getSchoolIdByName } from "./auth";
import { url } from "./resources";

const url = url;

export const uploadNews = async (formData, schoolId, userToken) => {
    return await fetch(url + "/schools/news/save", {
        headers: {
            schoolId: schoolId,
            Authorization: "Bearer " + userToken
        },
        method: 'post',
        body: formData
    }).then(res => res.json());
}