// https://deckmaster.info/sets.php
const editions = require('./data/sets.json');

const findByCode = (code) =>{
  return editions.find( ({ productCode }) => productCode === code );
}

export const parse = (input, format) => {
  if(input){
    if(format === 'tcg'){
      return tcg(input);
    }
  } 
};

export const buildBasicList = (data) => {
  if(data){
    return data.map( card => {
      return `${card.quantity} ${card.name}`;
    }).join('\n');
  }
}

export const buildCardKingdom = (data) => {
  if(data){
    data = data.map( card => {
      return `"${card.name}", ${card.edition.name}, 0, ${card.quantity}`;
    });
    data.unshift('title,edition,foil,quantity')
    return data.join('\n');
  }
}

export const buildDeckbox = (data, coindition = '', language = '', foil = null) => {
  if(data){
    data = data.map( card => {
      return `${card.quantity},"${card.name}",${card.edition.name},${coindition},${language},${foil ? 'foil': ''}`;
    });
    data.unshift('Count,Name,Edition,Condition,Language,Foil')
    return data.join('\n');
  }
}

const tcg = (input) => {
  const parsedData = [];
  let array = input.match(/[^\r\n]+/g);

  array.forEach(line => {
    if (line.match(/(\d*) (.*) \[(.*)\]/)) {
      let regexp = /(\d*) (.*) \[(.*)\]/;
      let matchAll = line.match(regexp);
      let edition = findByCode(matchAll[3]);
  
      parsedData.push( {
        name: matchAll[2],
        edition,
        quantity: matchAll[1],
        foil: null
      });
    }
  });
  

  return parsedData;


}