const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const enCryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
};


const comparePassword = async (password, hash) => {
    const matchPassword = await bcrypt.compare(password, hash);
    return matchPassword
};

const createAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn : '1h'
    });
    return accessToken
};

const createRefreshToken = (payload) => {
    const refreshToke = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn : '1d'
    })
    return refreshToke
}

const verifyToken = (token, env) => {
    const decoded= jwt.verify(token, env, (error, payload) => {
        if(error) {
            throw new ApplicationError('unauthorized', 401)
        }
        return payload
    });

    return decoded;
}

module.exports = {enCryptedPassword, comparePassword, createAccessToken, createRefreshToken, verifyToken}