'use strict';
/**
 * Reflection question 1
 * Undefined har värdet false i JS.
 */

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * De hade inte gett samma resultat ifall inventory hade ärvt uppräkningsbara propeties.
 * Funktioner som forEach() printas inte eftersom de ej är uppräkningsbara.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  let items = Object.keys(inv);
  return items
    .filter((item) => inv[item][prop])
    .map((item) => `<option value="${item}" key="${item}"> ${item}, ${inv[item].price} kr</option>\n`)
    .reduce((prev, curr) => prev + curr, "");
  return items
}
console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')

class Salad {
  ingredients = {};

  constructor(salad) {
    if(salad instanceof Salad) {
      this.ingredients = salad.ingredients;
    }
  }

  static parse(json) {
    if(typeof json === String) {
      return new Salad()
    } else if(Array.isArray(json)) {
      return new Array() 
    }
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((prev, curr) => prev+curr.price, 0);
}

Salad.prototype.count = function(property) {
  return Object.values(this.ingredients).filter((item) => item[property]).length;
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');



console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
/*
* Klasser representeras som funktioner.
* Ärvda properties representeras genom propertyn "prototype", som skapar prototypkedjor.
*/

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
/*
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
*/
console.log('\n--- Assignment 6 ---------------------------------------')
/*
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
*/

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
