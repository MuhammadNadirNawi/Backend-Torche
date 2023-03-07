const router = require("express").Router();
const usersControllers  = require("../app/controllers/userControllers");
const {verifyToken, authUser, authAdmin} = require("../middleware/auth");
const { runValidation, FirstSignValidation } = require("../validation/index");


router.get('/api/users/findAll', verifyToken, authAdmin, usersControllers.findAllUsers);
router.get('/api/users/:id', verifyToken, authUser, usersControllers.findUsersById);
router.put('/api/users/update/:id', verifyToken, authUser, FirstSignValidation, runValidation, usersControllers.updateUsersById);
router.delete('/api/users/delete/:id', verifyToken, authAdmin, usersControllers.deleteUsersById);

module.exports = router