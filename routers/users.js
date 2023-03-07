const router = require("express").Router();
const usersControllers  = require("../app/controllers/userControllers");
const {verifyToken, authUser, authAdmin} = require("../middleware/auth");

router.get('/api/users/findAll', verifyToken, authAdmin, usersControllers.findAllUsers);
router.get('/api/users/:id', verifyToken, authUser, usersControllers.findUsersById);
router.put('/api/users/update/:id', verifyToken, authUser, usersControllers.updateUsersById);
router.delete('/api/users/delete/:id', verifyToken, authAdmin, usersControllers.deleteUsersById);

module.exports = router