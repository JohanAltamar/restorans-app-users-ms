const { Router } = require('express');
const { verifyToken } = require('../../middlewares/tokens');
// CONTROLLERS
const authController = require('../controllers/auth.controller');

const router = Router();

/* USERS MANAGEMENT*/
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', verifyToken, authController.logoutUser);

router.put('/:userId', authController.updateUser);
router.delete('/:userId', authController.disableUser);

/* TOKENS MANAGEMENT */
router.post('/token/verify', authController.verifyToken);
router.post('/token/refresh', authController.refreshToken);


module.exports = router;