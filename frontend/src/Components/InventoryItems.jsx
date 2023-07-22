import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryItems = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory items:', error);
    }
  };

  const handleAddInventoryItem = async () => {
    try {
      const newItem = { name: itemName };
      const response = await axios.post('http://localhost:5000/api/items', newItem);
      setInventoryItems([...inventoryItems, response.data]);
      setItemName('');
    } catch (error) {
      console.error('Failed to add inventory item:', error);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  return (
    <div>
      <h2>Inventory Items</h2>
      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <button onClick={handleAddInventoryItem} style={{ backgroundColor: 'blue', color: 'white', margin: '2%' }}>
          Add Item
        </button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.currentStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryItems;
