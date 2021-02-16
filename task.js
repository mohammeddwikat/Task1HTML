/** Array utils functions */

const map = (array, mapper) => {
  const newArray = [];
  for (let i in array) {
    newArray.push(mapper(array[i]));
  }
  return newArray;
};

const filter = (array, predicate) => {
  const newArray = [];
  for (let i of array) {
    if (predicate(i)) {
      newArray.push(i);
    }
  }
  return newArray;
};

const some = (array, predicate) => {
  for (let i of array) {
    if (predicate(i)) {
      return true;
    }
  }
  return false;
};

const every = (array, predicate) => {
  for (let i of array) {
    if (!predicate(i)) {
      return false;
    }
  }
  return true;
};

const find = (array, predicate) => {
  for (let i of array) {
    if (i === predicate) {
      return i;
    }
  }
  return null;
};

const findIndex = (array, predicate) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === predicate) {
      return i;
    }
  }
  return null;
};

const joinToArray = (array, separator = ",") => {
  let arrayAsString = "";
  for (let i = 0; i < array.length - 1; i++) {
    arrayAsString += array[i].toString() + separator;
  }
  arrayAsString += array[array.length - 1].toString();
  return arrayAsString;
};

const removeDuplicate = (array) => {
  let hashTable = {};
  for (let i of array) {
    if (hashTable.hasOwnProperty(i)) {
      continue;
    } else {
      hashTable[i] = i;
    }
  }
  return Object.values(hashTable);
};

const flatten = (array) => {
  const newArray = [];
  for (let i of array) {
    if (i.length > 0) {
      for (let j of i) {
        newArray.push(j);
      }
    } else {
      newArray.push(i);
    }
  }
  return newArray;
};

const reverse = (array) => {
  const newArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i]);
  }
  return newArray;
};

/** Object functions */
const keys = (object) => {
  const newArray = [];
  for (let i in object) {
    newArray.push(i);
  }
  return newArray;
};

const values = (object) => {
  const newArray = [];
  for (let i in object) {
    newArray.push(object[i]);
  }
  return newArray;
};

const mayBe = (obj, property) => {
  const keys = property.split(".");
  let value = obj;
  for (let i of keys) {
    value = value[i];
  }
  return value;
};

const pick = (object, keys) => {
  let newObject = {};
  for (let key of keys) {
    newObject[key] = object[key];
  }
  return newObject;
};

const omit = (object, keys) => {
  for (let key of keys) {
    delete object[key];
  }
};

const entries = (object) => {
  const newArr = [];
  for (let i in object) {
    newArr.push([i, object[i]]);
  }
  return newArr;
};

/** String functions */
const toUpperCase = (str) => {
  let newStr = "";
  for (let char in str) {
    if (str.charCodeAt(char) >= 65 && str.charCodeAt(char) <= 90) {
      newStr += str[char];
    } else if(str[char] === ' '){
        newStr += str[char];
    } 
    else {
      newStr += String.fromCharCode(str.charCodeAt(char) - 32);
    }
  }
  return newStr;
};

const toLowerCase = (str) => {
  let newStr = "";
  for (let char in str) {
    if (str.charCodeAt(char) >= 65 && str.charCodeAt(char) <= 90) {
      newStr += String.fromCharCode(str.charCodeAt(char) + 32);
    } else {
      newStr += str[char];
    }
  }
  return newStr;
};

const pascalCase = (str) => {
  const arrOfStrings = str.split(/[\-_,/\s]/);
  let newStr = "";
  for (let i of arrOfStrings) {
    newStr += toUpperCase(i[0]) + toLowerCase(i.slice(1, i.length));
  }
  return newStr;
};

const kebabCase = (str) => {
  const arrOfStrings = str.split(/[\-_,/\s ]/);
  let newStr = "";
  for (let i = 0; i < arrOfStrings.length - 1; i++) {
    newStr += toLowerCase(arrOfStrings[i]) + "-";
  }
  newStr += toLowerCase(arrOfStrings[arrOfStrings.length - 1]);
  return newStr;
};

module.exports = {
  map,
  filter,
  some,
  every,
  find,
  findIndex,
  joinToArray,
  removeDuplicate,
  flatten,
  reverse,
  keys,
  values,
  mayBe,
  pick,
  omit,
  entries,
  toUpperCase,
  toLowerCase,
  pascalCase,
  kebabCase,
};
