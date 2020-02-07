const _ = require(`lodash`);

function sayHi(){
  const el = document.createElement(`div`);
  return el.innerText = _.join([`Hello`, `webpack`], ` `);
}

document.appendChild(sayHi())
