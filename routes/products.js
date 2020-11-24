var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');


router.get('/create', productsController.create);
router.post('/create', productsController.store);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.update);

router.get('/destroy/:id', productsController.destroy);


module.exports = router;