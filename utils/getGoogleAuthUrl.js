import { CLIENT_ID_GOOGLE, SERVER_ROOT_URI } from "../config.js";

const getGoogleAuthUrl = () => {
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

export default getGoogleAuthUrl;