import User from "../models/user.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CLIENT_ID_GITHUB, CLIENT_SECRET_GITHUB, SERVER_ROOT_URI, CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE, JWT_SECRET, COOKIE_NAME } from "../config.js";
import { getGoogleAuthUrl, getGoogleTokens, getGoogleUser } from "../utils/googleAuth.js"



export const user_register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User has been created !' }))
                .catch(error => res.status(401).json({ error }));
        })
};

export const user_login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(401).json({ error: 'User not found...' });
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({ error: 'Incorrect password...' });
                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

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
export const user_getProfile = (req, res) => {
    User.findOne({ _id: req.userId })
        .then(user => {
            if (!user) return res.status(401).json({ error: 'User not found...' });
            res.status(201).json({
                email: user.email,
                currency: user.currency,
                cryptos: user.cryptos,
                keywords: user.keywords,
            });
        })
        .catch(error => res.status(500).json({ error }));
};
export const user_updateProfile = (req, res) => { };

