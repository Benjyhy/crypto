import User from "../models/user.js";
import axios from "axios";
import { CLIENT_ID_GITHUB, CLIENT_SECRET_GITHUB } from "../config.js";
import getGoogleAuthUrl from "../utils/getGoogleAuthUrl.js"



export const user_register = (req, res) => { };
export const user_login = (req, res) => { };
export const user_authProvider = (req, res) => {
    if (req.params.provider == "github") res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID_GITHUB}&redirect_uri=http://localhost:8080/users/auth/github/callback`);
    if (req.params.provider == "google") res.redirect(getGoogleAuthUrl());
};
export const user_authProviderCallback = (req, res) => {
    const requestToken = req.query.code;
    const provider = req.params.provider;

    if (provider == "github") {
        axios({
            method: "post",
            url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID_GITHUB}&client_secret=${CLIENT_SECRET_GITHUB}&code=${requestToken}`,
            headers: {
                accept: "application/json",
            },
        }).then((response) => {
            const accessToken = response.data.access_token;
            res.redirect(`/welcome.html?access_token=${accessToken}`);
        });
    }

    // if (provider == "google") {
    //     axios({
    //         method: "post",
    //         url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID_GITHUB}&client_secret=${CLIENT_SECRET_GITHUB}&code=${requestToken}`,
    //         headers: {
    //             accept: "application/json",
    //         },
    //     }).then((response) => {
    //         const accessToken = response.data.access_token;
    //         res.redirect(`/welcome.html?access_token=${accessToken}`);
    //     });
    // }
};
export const user_logout = (req, res) => { };
export const user_getProfile = (req, res) => { };
export const user_updateProfile = (req, res) => { };

