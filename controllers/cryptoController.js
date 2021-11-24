import axios from "axios";
import Crypto from "../models/crypto.js";

export const crypto_getAll = (req, res) => { };
export const crypto_getById = async (req, res) => {
    let cryptoInfos = {};
    try {
        const currentPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${req.params.cmid}&tsyms=EUR&api_key=${process.env.SECRET_API_KEY_CRYPTO_COMPARE}`);
        cryptoInfos.currentPrice = `${Object.values(currentPrice.data)[0]}${'€'}`;
        await axios.get(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${req.params.cmid}&api_key=${process.env.SECRET_API_KEY_CRYPTO_COMPARE}`)
            .then((resp) => {
                const respObj = resp.data.Data[Object.keys(resp.data.Data)[0]];
                cryptoInfos.code = respObj.Symbol,
                    cryptoInfos.fullName = respObj.FullName,
                    cryptoInfos.imgUrl = `https://www.cryptocompare.com/${respObj.ImageUrl}`
            })
            .catch(error => res.status(401).json({ error }));
        res.status(201).json(cryptoInfos);
    } catch {
        res.status(404).json({ error: 'We do not know this crypto' });
    }
};
export const crypto_history = (req, res) => { };
export const crypto_add = (req, res) => {
    axios.get(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${req.body.code}&api_key=${process.env.SECRET_API_KEY_CRYPTO_COMPARE}`)
        .then((resp) => {
            const respObj = resp.data.Data[Object.keys(resp.data.Data)[0]];
            const crypto = new Crypto({
                code: respObj.Symbol,
                fullName: respObj.FullName,
                imgUrl: `https://www.cryptocompare.com/${respObj.ImageUrl}`
            });
            crypto.save()
                .then(() => res.status(201).json({ message: 'Crypto has been created !' }))
                .catch((error) => res.status(401).json({ error }));
        })
        .catch((error) => res.status(404).json({ error: 'Crypto does not exist' }));
};
export const crypto_delete = (req, res) => { };