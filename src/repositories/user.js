const {User} = require('../models');

const create = (requestBody) => {
    return User.create(requestBody)
}

const findUserByEmail = (email) => {
    return User.findOne({
        where : {
            email : email
        }
    })
}


const getUsers = () => {
    return User.findAll()
}

const detailUser = (id) => {
    return User.findByPk(id);
}


const update = (requestBody, id) => {
    return User.update(requestBody, {
        where : {
            id : id
        },
        returning : true
    })
}

const deleteUser = (id) => {
    return User.destroy({
        where : {
            id : id
        }
    })
}


module.exports = {create, getUsers, findUserByEmail, detailUser, update, deleteUser}