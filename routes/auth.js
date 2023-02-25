const controller = require('../controllers/login');
const router = require('express').Router();

router.post('/signin', controller.signIn); // /auth/signin
router.post('/signup', controller.signUp); // /auth/signup
router.get('/logout', controller.logOut); // /auth/logout')