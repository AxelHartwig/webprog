import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs'
import {useEffect, useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ViewOrder from './ViewOrder';
import "bootstrap/dist/js/bootstrap.bundle.min";
import inventoryLoader from './InventoryLoader';
import BootstrapSpinner from './BootstrapSpinner';
import {useNavigation, useLocation} from 'react-router-dom';
import * as bootstrap from 'bootstrap';





function App() {
  const [shoppingCart, setShoppingCart] = useState(localStorage.getItem("shoppingCart") === null ? [] : Salad.parse(localStorage.getItem("shoppingCart")));
  const navigation = useNavigation();

  const addToShoppingCart = ((salad) => setShoppingCart((prev) => new Array(...prev, salad)));
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));





  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>

    <Navbar/>

    {navigation.state === 'loading' || navigation.state === 'submitting' ? (
				<BootstrapSpinner />
			) : (
				<Outlet context={{addToShoppingCart, shoppingCart}} />
			)}

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
          <NavLink className="nav-link" to="/view-order">
            Se din beställning
          </NavLink>
        </li>
      </ul>
    );
  }
export default App;