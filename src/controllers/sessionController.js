const { validationResult } = require('express-validator');
const validator = require('../controllers/sessionValidator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db/queries');

exports.signUp = [
    validator.signUpValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Create user',
                errors: errors.array()
            })
        }
        console.log(firstname)
        const { firstname, lastname, nickname, password } = req.body;
        const test = await db.checkExistNicknameDB(nickname);
        if (test.length > 0) {
            return res.status(400).json({
                title: 'Create user',
                errors: [{ msg: 'Nickname already exist!' }]
            })
        }
        await db.createUserDB(firstname, lastname, nickname, password);
        res.json({
            title: 'Create user',
            data: 'Success create user'
        })
    }
];

exports.logIn = [
    validator.logInValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Login user',
                errors: errors.array()
            })
        }
        const { nickname, password } = req.body;
        const user = await db.getUserByNicknameDB(nickname);
        console.log(user)
        if (user.length <= 0) {
            return res.status(400).json({
                title: 'Login user',
                errors: [{ msg: 'Not such nickname' }]
            })
        };
        const match = await bcrypt.compare(password, user[0].password)
        if (!match) {
            return res.status(400).json({
                title: 'Login user',
                errors: [{ msg: 'Password is not correct' }]
            })
        }
        if (match) {
            jwt.sign({ user: user[0] }, process.env.SECRETKEY, { expiresIn: '2 days' }, (err, token) => {
                res.json({
                    title: 'Login user',
                    data: token
                })
            })
        }
    }
];