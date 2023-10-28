const ApplicationError = require('../../error/ApplicationError.js');
const { findUserByEmail, create, getUsers, detailUser, deleteUser, update } = require('../repositories/user.js');
const { enCryptedPassword, comparePassword, createAccessToken } = require('./auth.js');

const register = async (requestBody, isRole) => {
    try {
        const {name, email, password} = requestBody

        const user = await findUserByEmail(email);

        if(user) {
            throw new ApplicationError('Email has been registered', 500)
        }

        const hashPassword = await enCryptedPassword(password);

        const body = {
            name, email, password : hashPassword, role : isRole ? 'admin' : 'costomer'
        }

        const newUser = await create(body);
        return newUser

    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}


const loginServices = async (requestBody) => {
    try {
        const {name, email, password, role} = requestBody

        const currentUser = await findUserByEmail(email);

        if(!currentUser) {
            throw new ApplicationError('User not registered', 404)
        }
        const currentRole = currentUser.role;
        const currentPassword = currentUser.password
        const matchPassword = await comparePassword(password, currentPassword);

        if(!matchPassword) {
            throw new ApplicationError('Password not match', 404)
        }

        if(role !== currentRole) {
            throw new ApplicationError('Role not match', 404)
        }

        return currentUser
    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}


const getUsersServices = async () => {
    try {
        const user = await getUsers()
        return user
    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}


const detailUserServives = async (id) => {
    try {
        const user = await detailUser(id);
        return user
    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}


const updateUserServices = async (requestBody, id) => {
    try {
        const {name, email, password, role} = requestBody;

        const hashPassword = await enCryptedPassword(password)

        const body = {
            name, email, password : hashPassword, role
        }
        const user = await update(body, id);

        return user;
    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}

const deleteUserServives = async (id) => {
    try {
        const user = await deleteUser(id);
        return user
    } catch (error) {
        throw new ApplicationError(error.message, 500);
    }
}

module.exports = {register, getUsersServices, detailUserServives, deleteUserServives, updateUserServices, loginServices};