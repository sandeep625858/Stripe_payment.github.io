var express=require('express');
var router=express.Router();
const STRIPEHANDLER=require('./stripeHandler.js');

router.post('/create-Customer',STRIPEHANDLER.createNewCustomers);
router.post('/add-card',STRIPEHANDLER.addNewCard);
router.post('/create-Charges',STRIPEHANDLER.createChanges);

module.exports=router;