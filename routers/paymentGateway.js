const router = require("express").Router();
const PaymentGatewayControllers  = require("../app/controllers/paymentGatewayController");
const {verifyToken, authUser} = require("../middleware/auth");


router.post('/api/payment/courses', verifyToken,  authUser, PaymentGatewayControllers.handleMainRequest);

module.exports = router