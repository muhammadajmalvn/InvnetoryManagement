const mongoose = require('mongoose');
const InventoryItem = require('./../models/InventoryItem');

const inventoryAdditionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

inventoryAdditionSchema.pre('save',async function(next){
  try{
  const inventoryItem =await InventoryItem.findById(this.itemId)
  inventoryItem.currentStock += this.quantity
  await inventoryItem.save()
  next()
  }catch(err){
    next(err)
  }
})

const InventoryAddition = mongoose.model('InventoryAddition', inventoryAdditionSchema);
module.exports = InventoryAddition;
