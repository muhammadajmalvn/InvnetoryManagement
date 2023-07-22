import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdditionBills = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // Object to hold individual quantities for each item

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory items:', error);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const handleGenerateAdditionBill = async (itemId) => {
    try {
      const bill = { itemId, quantity: parseFloat(quantities[itemId]) };
      const response = await axios.post('http://localhost:5000/api/addition', { items: [bill] });
      console.log('Addition Bill Generated:', response.data);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: '', // Clear the quantity for the current item after generating the bill
      }));
      await fetchInventoryItems();
    } catch (error) {
      console.error('Failed to generate addition bill:', error);
    }
  };

  const handleChangeQuantity = (itemId, value) => {
    // Update the quantity for the specific item
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  return (
    <div>
      <h2>Generate Addition Bill</h2>
      <div>
        {inventoryItems.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                value={quantities[item._id] || ''}
                onChange={(e) => handleChangeQuantity(item._id, e.target.value)}
              />
              <button onClick={() => handleGenerateAdditionBill(item._id)}>Generate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionBills;
