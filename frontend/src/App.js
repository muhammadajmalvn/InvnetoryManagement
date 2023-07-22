import React from 'react'
import InventoryItems from './Components/InventoryItems'
import AdditionBills from './Components/AdditionBills'
import ConsumptionBills from './Components/ConsumptionBills'
import './App.css'

const App = () => {
  return (
    <div className="centered-container">
       <div className='app'> <h1>Inventory Management System</h1>
        <InventoryItems />
         <AdditionBills />
         <ConsumptionBills />
      </div>
    </div>
  )
}

export default App