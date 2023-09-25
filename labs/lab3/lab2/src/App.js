import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs'
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ViewOrder from './ViewOrder';
import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addToShoppingCart = ((salad) => setShoppingCart((prev) => new Array(...prev, salad)));

  let extras = Object.keys(inventory).filter(name => inventory[name].extra);



  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>

    <Navbar/>
    <Outlet context={{ addToShoppingCart, shoppingCart, inventory }}/>

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }

  function Navbar() {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Hem
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/compose-salad">
            Komponera en sallad
          </NavLink>
        </li>
        <li className ="nav-item">
          <NavLink className="navlink" to="/view-order">
            Se din beställning
          </NavLink>
        </li>
      </ul>
    );
  }

export default App;