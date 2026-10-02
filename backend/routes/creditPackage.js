const express = require('express')
const CreditPackageController = require('../controllers/creditPackage')

const router = express.Router();

router.get('/credit-package',CreditPackageController.getCreditPackages)

router.post('/credit-package',CreditPackageController.postCreditPackages)

router.delete('/credit-package/:id',CreditPackageController.deleteCreditPackage)

module.exports = router