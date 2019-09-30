let boys = {
  'josh': ['sara', 'martha', 'chiara', 'lara', 'sofia'],
  'simon': ['chiara', 'lara', 'sofia', 'martha', 'sara'],
  'michael': ['sofia','sara', 'martha', 'lara', 'chiara'],
  'pete': ['lara', 'chiara', 'martha', 'lara', 'sofia'],

}

let ladies = {
  'sara': ['pete', 'josh', 'michael', 'simon'],
  'lara': ['michael', 'pete', 'josh', 'simon'],
  'martha': ['josh', 'simon', 'pete', 'michael'],
  'chiara': ['pete', 'michael', 'simon', 'josh'],
  'sofia': ['michael', 'simon']
}


let singleMen = []
let singleLadies = []
let matches = []//arr of arrs///[josh, sara],[simon, martha]


const initMen = (boysObject) => {
  for (boy in boysObject) {
    singleMen.push(boy)
  }
}

const initWomen = (ladiesObject) => {
  for (lady in ladiesObject) {
    singleLadies.push(lady)
  }
}





const findCoupleIndex = (lady) => {
  for (let i = 0; i < matches.length; i++) {
    let couple = matches[i];
    if (couple[1] === lady) {
      return i
    }
  }
}

const remove = (person, array) => {
  let idx = array.indexOf(person)
  array = array.splice(idx, 1)
}

const addLast = () => {

   let personLeft = singleLadies[0];
   let guy = ladies[personLeft][0];
   //guy.indexOf(person)
   for (let i = 0; i < matches.length; i++) {
    let couple = matches[i];
    if (couple[0] === guy) {
      matches[i].push(personLeft)
    }
   }
}


const couple = (boy) => {
  let boysChoises = boys[boy]

  let i = 0;
  while(i < boysChoises.length) {
    let lady = boysChoises[i]
    if (singleLadies.indexOf(lady) > -1) {//if she is single
      matches.push([boy, lady])

      remove(boy, singleMen)//take dude out of single bucket
      remove(lady, singleLadies)//take out lady out of bucket
      return;
    } else {//if she is not single
      let index = findCoupleIndex(lady);
      let currentMan = matches[index][0]
      if (ladies[lady].indexOf(boy) < ladies[lady].indexOf(currentMan)) { //if this boy is higher on the list then her current man
        matches[index][0] = boy;
        remove(boy, singleMen);
        singleMen.push(currentMan)
      }
    }
    i++
  }

}


const matching = (boys, ladies) => {
  initMen(boys);//working
  initWomen(ladies)

  while (singleMen.length > 0) { //while there are still men available
    singleMen.forEach((man) => {
      couple(man)
    })
  }

  if (singleLadies.length > 0) {
    addLast()
  }
    return matches;
}

matching(boys, ladies)
