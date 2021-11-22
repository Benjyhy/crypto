import User from "../models/user.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import { CLIENT_ID_GITHUB, CLIENT_SECRET_GITHUB, SERVER_ROOT_URI, CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE, JWT_SECRET, COOKIE_NAME } from "../config.js";
import { getGoogleAuthUrl, getGoogleTokens, getGoogleUser } from "../utils/googleAuth.js"



export const user_register = (req, res) => { };
export const user_login = (req, res) => { };
export const user_authProvider = (req, res) => {
    if (req.params.provider == "github") res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID_GITHUB}&redirect_uri=http://localhost:8080/users/auth/github/callback`);
    if (req.params.provider == "google") res.redirect(getGoogleAuthUrl());
};
export const user_authProviderCallback = async (req, res) => {

    const code = req.query.code;
    const provider = req.params.provider;

    if (provider == "github") {
        axios({
            method: "post",
            url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID_GITHUB}&client_secret=${CLIENT_SECRET_GITHUB}&code=${code}`,
            headers: {
                accept: "application/json",
            },
        }).then((response) => {
            const accessToken = response.data.access_token;
            res.redirect("welcome.html");
        });
    }

    if (provider == "google") {
        const { id_token, access_token } = await getGoogleTokens({
            code,
            clientId: CLIENT_ID_GOOGLE,
            clientSecret: CLIENT_SECRET_GOOGLE,
            redirectUri: `${SERVER_ROOT_URI}/users/auth/google/callback`,
        });
        const googleUser = await getGoogleUser(access_token, id_token);
        console.log(googleUser);
        const token = jwt.sign(googleUser, JWT_SECRET);

        res.cookie(COOKIE_NAME, token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
        });
        res.redirect("/welcome.html");
    }
};
export const user_logout = (req, res) => { };
export const user_getProfile = (req, res) => { };
export const user_updateProfile = (req, res) => { };

