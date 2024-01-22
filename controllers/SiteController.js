const modelUser = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const title = 'LU-LAB';
const valueRe = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null
};


class SiteController {
    index(req, res) {
        let title = 'LU-LAB';
        res.render('index', { title: title });
    }

    createUser = async (req, res) => {
        try {
            let valueRe = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            };

            const data = await modelUser.readUser();

            const userWithEmail = data.find(user => user.email === valueRe.email);

            if (userWithEmail) {

                if (valueRe.password === valueRe.confirmPassword) {
                    let messageEmail = 'The email has already been taken.';
                    let errPass = null;
                    res.render('register', { title: title, messageEmail: messageEmail, valueRe: valueRe, errPass: errPass });
                } else {
                    let messageEmail = 'The email has already been taken.';
                    let errPass = 'The password confirmation does not match.'
                    res.render('register', { title: title, messageEmail: messageEmail, valueRe: valueRe, errPass: errPass });
                }
            } else {
                if (valueRe.password === valueRe.confirmPassword) {
                    bcrypt.hash(valueRe.password, saltRounds, function (err, hash) {
                        // Store hash in your password DB.
                        let upData = {
                            name: valueRe.name,
                            email: valueRe.email,
                            password: hash
                        }
                        modelUser.createUser(upData, () => {
                            res.redirect('/login');
                        })
                    });

                } else {
                    let messageEmail = null;
                    let errPass = 'The password confirmation does not match.'
                    res.render('register', { title: title, messageEmail: messageEmail, valueRe: valueRe, errPass: errPass });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    };

    checkLogin = async (req, res) => {
        let userLogin = {
            email: req.body.email,
            password: req.body.password
        }

        const data = await modelUser.readUser();
        const emailData = data.find(user => user.email === userLogin.email)
        if (emailData) {
            bcrypt.compare(userLogin.password, emailData.password, function (err, result) {
                if (result === true) {
                    req.session.checkSession = true;
                    req.session.emailDataSession = emailData;
                    res.redirect('/')
                } else {
                    let errEmail = 'These credentials do not match our records.';
                    let valueEmail = userLogin.email;
                    res.render('login', { title: title, errEmail: errEmail, valueEmail: valueEmail });
                }
            });

        } else {
            let errEmail = 'These credentials do not match our records.';
            let valueEmail = userLogin.email;
            res.render('login', { title: title, errEmail: errEmail, valueEmail: valueEmail });
        }


    };

    seeSession(req, res) {
        res.send(req.session)
    }

    register(req, res) {
        let messageEmail = null;
        let errPass = null;
        res.render('register', { title: title, messageEmail: messageEmail, valueRe: valueRe, errPass: errPass });
    };

    search(req, res) {
        let search = req.query.word;
        res.render('search', { search: search })
    };

    login(req, res) {
        let errEmail = null;
        let valueEmail = null;
        res.render('login', { title: title, errEmail: errEmail, valueEmail: valueEmail });
    };
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) throw err;
            req.session = null;
            res.redirect('/')
        })
    };
}

module.exports = new SiteController;