let firstHalf = {
  'josh': ['sara', 'martha', 'chiara', 'lara', 'sofia'],
  'simon': ['chiara', 'lara', 'sofia', 'martha', 'sara'],
  'michael': ['sofia','sara', 'martha', 'lara', 'chiara'],
  'pete': ['lara', 'chiara', 'martha', 'lara', 'sofia'],
}

let secondHalf = {
  'sara': ['pete', 'josh', 'michael', 'simon'],
  'lara': ['michael', 'pete', 'josh', 'simon'],
  'martha': ['josh', 'simon', 'pete', 'michael'],
  'chiara': ['pete', 'michael', 'simon', 'josh'],
  'sofia': ['michael', 'simon']
}


let firstFreeHalf = []
let secondFreeHalf = []
let matches = []//arr of arrs///[josh, sara],[simon, martha]


const init = (personObject, object) => {
  for (person in personObject) {
    object.push(person)
  }
}


const findPairIndex = (secondPerson) => {
  for (let i = 0; i < matches.length; i++) {
    let couple = matches[i];
    if (couple[1] === secondPerson) {
      return i
    }
  }
}

const remove = (person, array) => {
  let idx = array.indexOf(person)
  array = array.splice(idx, 1)
}

const addLast = () => {
   let personLeft = secondFreeHalf[0];
   let firstLeft = secondHalf[personLeft][0];
   //guy.indexOf(person)
   for (let i = 0; i < matches.length; i++) {
    let couple = matches[i];
    if (couple[0] === firstLeft) {
      matches[i].push(personLeft)
    }
   }
}


const couple = (person) => {
  let firstHalfPreferences = firstHalf[person]
  let i = 0;
  while(i < firstHalfPreferences.length) {
    let secondPerson = firstHalfPreferences[i]
    if (secondFreeHalf.indexOf(secondPerson) > -1) {//if prson from second group is free
      matches.push([person, secondPerson])

      remove(person, firstFreeHalf)//take dude out of single bucket
      remove(secondPerson, secondFreeHalf)//take out lady out of bucket
      return;
    } else {//if she is not single
      let index = findPairIndex(secondPerson);
      let currentPerson = matches[index][0]
      if (secondHalf[secondPerson].indexOf(person) < secondHalf[secondPerson].indexOf(currentPerston)) { //if this boy is higher on the list then her current man
        matches[index][0] = person;
        remove(person, firstFreeHalf);
        firstFreeHalf.push(currentPerson)
      }
    }
    i++
  }
}

const matching = (first, second) => {
  firstHalf = first;
  secondHalf = second;
  init(first, firstFreeHalf);//working
  init(second, secondFreeHalf)

  while (firstFreeHalf.length > 0) { //while there are still men available
    firstFreeHalf.forEach((person) => {
      couple(person)
    })
  }

  if (secondFreeHalf.length > 0) {
    addLast()
  }
    return matches;
}


module.exports = {
  matching,
  remove
}
