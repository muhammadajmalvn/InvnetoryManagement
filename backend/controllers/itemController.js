const inventoryItem = require('../models/InventoryItem')
const inventoryConsumption = require('../models/InventoryConsumption')
const InventoryAddition = require('../models/InventoryAddition')



//fetching all the inventory items
exports.getAllItems = async (req, res) => {
    try {
        const items = await inventoryItem.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({error:"failed to fetch items"})
    }
}

//Adding inventory item
exports.addItem = async (req, res) => {
    try {
        const newItem = new inventoryItem(req.body)
        await newItem.save()
        res.status(200).json(newItem)
    } catch (error) {
        res.status(500).json({error:"failed to add item"})
    }
}

//Generate addition bill
exports.itemAddition = async (req, res) => {
    try {
    const { items } = req.body;
    for (const item of items) {
        const addition = new InventoryAddition(item);
        console.log(addition,'9899999999');
        addition.save();
    }
    res.status(200).json({message:"success"});
    } catch (error) {
        res.status(500).json({error:"failed to add item addition"})
    }
}

//Generate consumption bill
exports.itemConsumption = async (req, res) => {
    try {
        const { items } = req.body;
        const consumptions = [];
    
        for (const item of items) {
          const consumption = new inventoryConsumption(item);
          consumptions.push(await consumption.save());
        }
    
        res.json(consumptions);
      } catch (error) {
        res.status(500).json({ error: 'Failed to generate consumption bill.' });
      }
}
