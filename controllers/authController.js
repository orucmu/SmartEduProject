const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
};

exports.loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        User.findOne({ email }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        // User Session
                        req.session.userID = user._id //userID oluşturmak
                        res.status(200).redirect('/')
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}