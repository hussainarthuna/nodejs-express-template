const express = require('express');
const adminUserController = require('../../controllers/adminUser');
const {body} = require('express-validator');

const router = express.Router();

router.post('/register',
    [
        body('email', 'Invalid Email').notEmpty().isEmail().normalizeEmail(),
        body('name', 'Name is requried').notEmpty({ignore_whitespace: true}),
        body('password', 'Password Should be atleast 6 characters').isLength({min: 6}),
    ],
    adminUserController.register
);

router.post('/login',
    [
        body('email', 'Invalid Email').notEmpty().isEmail().normalizeEmail(),
        body('password', 'Password Should be atleast 6 characters').isLength({min: 6}),
    ],
    adminUserController.login
);

module.exports = router;
