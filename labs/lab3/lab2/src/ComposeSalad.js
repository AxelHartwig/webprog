import { useState } from 'react';
import Salad from './lab1.mjs';
import inventory from './inventory.mjs';
//import App from './App.js'
import { useOutletContext, useNavigate } from 'react-router-dom';


function ComposeSalad() {
  const props = useOutletContext();
  const nav = useNavigate();


  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  //this.setShoppingCart = setShoppingCart;

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extra, setExtra] = useState(new Set());

  function MySaladSelect({ options, value, onChange }) {
    return (
      <div className='ps-5 pb-5 pt-3'>
        <select value={value} onChange={onChange} required className='col-4 form-select'>
          <option value=''>Gör ditt val</option>
          {options.map(name => <option key={name}> {name} </option>)}
        </select>
        <div className = "valid-feedback">Korrekt!</div>
        <div className = "invalid-feedback">Välj en ingrediens!</div>
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
  //event.target.parentElement.classList.add("was-validated");
}

function handleProteinChange(event) {
  setProtein(event.target.value);
  event.target.parentElement.classList.add("was-validated");
}

function handleDressingChange(event) {
  setDressing(event.target.value);
  event.target.parentElement.classList.add("was-validated");
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

function clearForm() {
  setFoundation("");
	setProtein("");
	setDressing("");
	setExtra(new Set());
}

function handleSubmit(event) {
  event.preventDefault()
  event.target.classList.add("was-validated");

  if(event.target.checkValidity()) {

  let salad = new Salad();
  salad
    .add(foundation, inventory[foundation])
    .add(protein, inventory[protein])
    .add(dressing, inventory[dressing]);

  extra.forEach((item) => {salad.add(item, inventory[item])})
  props.addToShoppingCart(salad);
  clearForm();
  event.target.reset();
  event.target.classList.remove("was-validated");
  nav(`/view-order/confirm/${salad.uuid}`);

}
  
}

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="container col-12">
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
          <h4>Välj tillbehör</h4>
            <MySaladCheckbox
              options={extras}
              value={extra}
              onChange={handleExtraChange}
            />

          <h5>Välj dressing</h5>
            <MySaladSelect
              options={dressings}
              value={dressing}
              onChange={handleDressingChange}
            />
        </div>
      </div>
      <button type="submit" className="w-auto rounded-2" >Lägg till</button>
    </form>
  );
}
  export default ComposeSalad;
