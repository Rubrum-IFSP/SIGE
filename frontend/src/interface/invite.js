import { url } from "./resources";

export const validateInvite = async (invite) => {
    return await fetch(url + "/invite/validate/" + invite, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const joinSchool = async (invite, token) => {
    const body = {
        invite: invite
    }

    const data = await fetch(url + '/invite/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(body),
    }).then(res => {
        return res.text();
    });

    return data;
}