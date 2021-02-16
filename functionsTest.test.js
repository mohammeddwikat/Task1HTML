const myFunctions = require("./task.js");
const map = myFunctions.map;
const filter = myFunctions.filter;
const some = myFunctions.some;
const every = myFunctions.every;
const find = myFunctions.find;
const findIndex = myFunctions.findIndex;
const joinToArray = myFunctions.joinToArray;
const removeDuplicate = myFunctions.removeDuplicate;
const flatten = myFunctions.flatten;
const reverse = myFunctions.reverse;
const keys = myFunctions.keys;
const values = myFunctions.values;
const mayBe = myFunctions.mayBe;
const pick = myFunctions.pick;
const omit = myFunctions.omit;
const entries = myFunctions.entries;
const toUpperCase = myFunctions.toUpperCase;
const toLowerCase = myFunctions.toLowerCase;
const pascalCase = myFunctions.pascalCase;
const kebabCase = myFunctions.kebabCase;

const array = [1,2,3,4,5,6];

test("Should return all terms as string", () => {
    expect(map(array, element => element.toString())).toEqual(
        [ "1", "2", "3", "4", "5", "6" ]
    );
});
test("Should add two to all elements", () => {
    expect(map(array, element => element+2)).toEqual(
        [ 3,4,5,6,7,8 ]
    );
});
test("Should return all odd elements", ()=> {
    expect(filter(array, element => element%2===1)).toEqual(
        [1,3,5]
    )
});
test("Should return all even elements", ()=> {
    expect(filter(array, element => element%2===0)).toEqual(
        [2,4,6]
    )
});
test("Should return true", ()=> {
    expect(some(array, element => element > 5)).toBe(
        true
    )
});
test("Should return false", ()=> {
    expect(some(array, element => element <= 0)).toBe(
        false
    )
});
test("Should return true", ()=> {
    expect(every(array, element => element > 0)).toBe(
        true
    )
});
test("Should return false", ()=> {
    expect(every(array, element => element > 10)).toBe(
        false
    )
});
test("Should return 5", ()=> {
    expect(find(array, 5)).toBe(
        5
    )
});
test("Should return null", ()=> {
    expect(find(array, 9)).toBe(
        null
    )
});
test("Should return 3", ()=> {
    expect(findIndex(array, 4)).toBe(
        3
    )
});
test("Should return null", ()=> {
    expect(findIndex(array, 9)).toBe(
        null
    )
});
test("Should return a string with ',' separator", ()=> {
    expect(joinToArray(array)).toEqual(
        "1,2,3,4,5,6"
    )
});
test("Should return a string with ' ' separator", ()=> {
    expect(joinToArray(array, ' ')).toEqual(
        "1 2 3 4 5 6"
    )
});
test("Should return a string with '/' separator", ()=> {
    expect(joinToArray(array, '/')).toEqual(
        "1/2/3/4/5/6"
    )
});
test("Should return a string with '-' separator", ()=> {
    expect(joinToArray(array, '-')).toEqual(
        "1-2-3-4-5-6"
    )
});
test("Should return a string with '_' separator", ()=> {
    expect(joinToArray(array, '_')).toEqual(
        "1_2_3_4_5_6"
    )
});
test("Should return a string with '|' separator", ()=> {
    expect(joinToArray(array, '|')).toEqual(
        "1|2|3|4|5|6"
    )
});
const duplicatedArray = [1,2,2,2,3,3,4,4,5,5,5,6];

test("Should return a new array with distinct elements", ()=> {
    expect(removeDuplicate(duplicatedArray)).toEqual(
        [1,2,3,4,5,6]
    )
});
const arrayOfArrays = [1,2,[2,3,4],[2,3,5]];

test("Should return a new array of elements from array contains arrays", ()=> {
    expect(flatten(arrayOfArrays)).toEqual(
        [1,2,2,3,4,2,3,5]
    )
});
test("Should return a new array with the reverse order for passed array", ()=> {
    expect(reverse(array)).toEqual(
        [6,5,4,3,2,1]
    )
});
const obj = {
    "Mohammed": "Student",
    "Sara" : "Student",
    "Ahmad": "Teacher",
    "Kareem": "Manager"
}
test("Should return the keys as an array for the passed object", ()=> {
    expect(keys(obj)).toEqual(
        ["Mohammed", "Sara", "Ahmad", "Kareem"]
    )
});
test("Should return the values as an array for the passed object", ()=> {
    expect(values(obj)).toEqual(
        ["Student", "Student", "Teacher", "Manager"]
    )
});

const studentObj = {
    name:{
        firstName: "Mohammed",
        lastName: "Dwikat"
    },
    major:{
        engineer:{
            department:"computer"
        }
    }
}

test("Should return the value of the properties passed", ()=> {
    expect(mayBe(studentObj, "major.engineer.department")).toBe(
        "computer"
    )
});
test("Should return the value of the properties passed", ()=> {
    expect(mayBe(studentObj, "name.lastName")).toBe(
        "Dwikat"
    )
});
test("Should return a new object from an object with a specific properties", ()=> {
    expect(pick(obj, ["Mohammed", "Kareem"])).toEqual(
        {"Mohammed":"Student", "Kareem":"Manager"}
    )
});
test("Should delete a properties from the object", ()=> {
    omit(obj, ["Ahmad", "Sara"]);
    expect(obj).toEqual(
        {"Mohammed":"Student", "Kareem":"Manager"}
    )
});
test("Should return a new array of arrays each array from key and value", ()=> {
    expect(entries(obj)).toEqual(
        [["Mohammed","Student"], ["Kareem","Manager"]]
    )
});
const str = "MohaMMed Saleh";
test("Should return a new string, all characters uppercase", ()=> {
    expect(toUpperCase(str)).toBe(
        "MOHAMMED SALEH"
    )
});
test("Should return a new string, all characters lowercase", ()=> {
    expect(toLowerCase(str)).toBe(
        "mohammed saleh"
    )
});
test("Should return a new string, with pascal format", ()=> {
    expect(pascalCase(str)).toBe(
        "MohammedSaleh"
    )
});
test("Should return a new string, with kebabCase format", ()=> {
    expect(kebabCase(str)).toBe(
        "mohammed-saleh"
    )
});


