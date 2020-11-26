const AdminUser = require('../models/adminUser');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hasedPassword = await bcrypt.hash(password, 12);
    const adminUser = new AdminUser({
        name: name,
        email: email,
        password: hasedPassword
    });
    if (!errors.isEmpty()) {
        return res.status(200).json({
            status: false,
            message: errors.array()[0]['msg']
        });
    }
    const userFound = await AdminUser.findOne({email: email});
    if (userFound) {
        return res.status(200).json({
            status: false,
            message: "User Already Exists"
        });
    }
    const createdUser = await adminUser.save();
    delete createdUser._doc.password;
    const token = jwt.sign(
        {
            userId: createdUser._doc._id.toString()
        }, 'secretKeyForTheAPI',
        {
            expiresIn: '3d'
        });
    return res.status(200).json({
        status: true,
        message: "User Registered Succesccfully",
        data: createdUser,
        token: token
    });
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;

    if (!errors.isEmpty()) {
        return res.status(200).json({
            status: false,
            message: errors.array()[0]['msg']
        });
    }

    const user = await AdminUser.findOne({email: email});
    if (!user) {
        return res.status(200).json({
            status: false,
            message: "Invalid Credentials"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(200).json({
            status: false,
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            userId: user._doc._id.toString()
        }, 'secretKeyForTheAPIToken',
        {
            expiresIn: '3d'
        });
    delete user._doc.password;
    const userData = {...user._doc, login_status: true};
    return res.status(200).json({
        status: true,
        message: "Logged in Succesccfully",
        data: userData,
        token: token
    });
};
