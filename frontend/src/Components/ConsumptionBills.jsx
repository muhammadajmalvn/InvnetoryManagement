import React, { useState } from 'react';
import axios from 'axios';

const ConsumptionBills = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleGenerateConsumptionBill = async () => {
    try {
      const bill = { itemId, quantity: parseFloat(quantity) };
      const response = await axios.post('http://localhost:5000/api/consumption', { items: [bill] });
      console.log('Consumption Bill Generated:', response.data);
      setItemId('');
      setQuantity('');
    } catch (error) {
      console.error('Failed to generate consumption bill:', error);
    }
  };
  

  return (
    <div>
      <h2>Generate Consumption Bill</h2>
      <div>
        <input
          type="text"
          placeholder="Item ID (MongoDB ObjectId)"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleGenerateConsumptionBill}>Generate Consumption Bill</button>
      </div>
    </div>
  );
};

export default ConsumptionBills;
