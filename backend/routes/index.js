var express = require('express');
var router = express.Router();
const itemController = require('../controllers/itemController')

//Fetching all inventory items
router.get('/api/items', itemController.getAllItems);

//Inventory item addition
router.post('/api/items', itemController.addItem);

//Generate addition bill
router.post('/api/addition', itemController.itemAddition)

//Generate consumption bill
router.post('/api/consumption',itemController.itemConsumption)

module.exports = router;
  