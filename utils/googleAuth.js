import { CLIENT_ID_GOOGLE, SERVER_ROOT_URI } from "../config.js";
import axios from "axios";

export const getGoogleAuthUrl = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${SERVER_ROOT_URI}/users/auth/google/callback`,
        client_id: CLIENT_ID_GOOGLE,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" "),
    };

    const params = new URLSearchParams(options);
    return `${rootUrl}?${params}`;
}

export const getGoogleTokens = async ({
    code,
    clientId,
    clientSecret,
    redirectUri,
}) => {
    const rootUrl = "https://oauth2.googleapis.com/token";
    const options = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    }

    return await axios({
        method: "post",
        url: `${rootUrl}?${new URLSearchParams(options)}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
        .then((res) => res.data)
        .catch((err) => {
            console.error("failed to fetch auth tokens");
            throw new Error(error.message);
        });
}

export const getGoogleUser = async (access_token, id_token) => {
    return await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        )
        .then((res) => res.data)
        .catch((error) => {
            console.error(`Failed to fetch user`);
            throw new Error(error.message);
        });
}