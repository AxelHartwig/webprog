import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs'
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addToShoppingCart = ((salad) => setShoppingCart((prev) => new Array(...prev, salad)));

  let extras = Object.keys(inventory).filter(name => inventory[name].extra);



  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
    
    <ViewOrder shoppingCart={shoppingCart}/>
    <ComposeSalad inventory={inventory} addToShoppingCart={addToShoppingCart}/>

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }


  function ViewOrder(props) {

    return (
      <div className="container col-12">
        <div className="row h-100 p-5 bg-light border rounded-3">
          <h2>Varukorg: </h2>
          {props.shoppingCart.map((salad) => (
            <div
              className="row text-primary mt-2 p-3 border border-primary rounded-3"
              key={salad.uuid}
            >
              <div className="col p-1">
              {Object.keys({ ...salad.ingredients }).reduce(
                (prev, curr) => prev + curr + ", ",
                ""
              )}
              {"pris: " + salad.getPrice() + " kr"}
              </div>
            </div>
          ))}
  
          <div className="row text-white bg-primary border-primary mt-2 p-3 border rounded-3">
            Totalt:{" "}
            {props.shoppingCart.reduce((prev, curr) => prev + curr.getPrice(), 0)} kr
          </div>
        </div>
      </div>
    );
  };

export default App;