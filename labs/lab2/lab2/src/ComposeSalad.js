import { useState } from 'react';
import Salad from './lab1.mjs';
import inventory from './inventory.mjs';
import App from './App.js'

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  //this.setShoppingCart = setShoppingCart;

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Ceasardressing');
  const [extra, setExtra] = useState(new Set(["Bacon", "Fetaost"]));

  function MySaladSelect({ options, value, onChange }) {
    return (
      <div className='ps-5 pb-5 pt-3'>
        <select value={value} onChange={onChange} className='col-4'>
          {options.map(name => <option key={name}> {name} </option>)}
        </select>
      </div>
    )
}

function MySaladCheckbox({ options, value, onChange }) {
  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      {options.map(name =>
        <div key={name} className="col-4">
          <input value={name} type="checkbox" checked={value.has(name)} onChange={(onChange)} />
          <span>{name}</span>
        </div>)}
    </div>
  )
}

function handleFoundationChange(event) {
  setFoundation(event.target.value);
}

function handleProteinChange(event) {
  setProtein(event.target.value);
}

function handleDressingChange(event) {
  setDressing(event.target.value);
}

function handleExtraChange(event) {
  if(extra.has(event.target.value)) {
    let temp = new Set(extra);
    temp.delete(event.target.value);
    setExtra(temp);
  } else {
    let temp = new Set(extra);
    temp.add(event.target.value);
    setExtra(temp);
  }
}

/* detta ger bug.
function clearForm() {
  setFoundation('Pasta');
  setProtein('Kycklingfilé');
  setDressing('Caesardressing');
  setExtra(new Set());
}*/

function clearForm() {
  setFoundation(foundations[0]);
	setProtein(proteins[0]);
	setDressing(dressings[0]);
	setExtra(new Set());
}

function handleSubmit(event) {
  event.preventDefault()
  let salad = new Salad();
  salad
    .add(foundation, inventory[foundation])
    .add(protein, inventory[protein])
    .add(dressing, inventory[dressing]);

  extra.forEach((item) => {salad.add(item, inventory[item])})
  props.addToShoppingCart(salad);
  clearForm();
  
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">

          <h2>Välj bas</h2>
            <MySaladSelect
              options={foundations}
              value={foundation}
              onChange={handleFoundationChange}
            />
          <h3>Välj protein</h3>
            <MySaladSelect
              options={proteins}
              value={protein}
              onChange={handleProteinChange}
            />
           <h4>Välj dressing</h4>
            <MySaladSelect
              options={dressings}
              value={dressing}
              onChange={handleDressingChange}
            />

            <MySaladCheckbox
              options={extras}
              value={extra}
              onChange={handleExtraChange}
            />
        </div>
      </div>
      <button type="submit" className="w-auto rounded-2" >Lägg till</button>
    </form>
  );
}
  export default ComposeSalad;
