const express = require('express')
const CreditPackage = require('../controllers/creditPackage')

const router = express.Router();

router.get('/credit-package',CreditPackage.getCreditPackages)

router.post('/credit-package',CreditPackage.postCreditPackages)

router.delete('/credit-package/:id',CreditPackage.deleteCreditPackage)

module.exports = router