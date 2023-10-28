const express = require('express');
const { registerAdmin, registerMember, getAllUsers, detailUsers, deleteUser, updateUser, login, logOut, updateToken } = require('../contreollers/user');
const { verifyUser, onlyAdmin, findUserById } = require('../middleware/verifyUser.js');

const router = express.Router();

router.post('/register-admin', registerAdmin);
router.post('/register-member', registerMember);
router.post('/login', login)
router.get('/users', verifyUser, onlyAdmin, getAllUsers);
router.get('/refresh-token', updateToken)
router.get('/users/:id', verifyUser, findUserById, onlyAdmin, detailUsers);
router.put('/users/:id', verifyUser, findUserById, onlyAdmin, updateUser);
router.delete('/users/:id', verifyUser, findUserById, onlyAdmin, deleteUser);
router.delete('/logout', logOut);
module.exports = router