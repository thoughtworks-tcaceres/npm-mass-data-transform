## mass-data-transform

Transforms an array of objects into a custom format. Was developed because I wanted my data to look a certain way after retrieving data from an API.
This library allows you to transform, add, delete, and rename fields.

## Installing

```
npm install mass-data-transform
yarn add mass-data-transform
```

## Initializing

```js
import transform from "mass-data-transform";
var transform = require("mass-data-transform");
```

## How To Use

### Syntax

```js
let transformedData = transform(arrObj, options);
```

### Parameters

```
arrObj : The array of objects
e.g:
const arrObj = [{id:1,name:'Bulbasaur',{id:2,name:'Squirtle'}}]
```

```
options : an object that exists of up to 4 different key values - transformFields, addFields, deleteFields, and renameFields. All 4 are optional.
e.g:
const options = {
  transformFields:/*optional object here*/,
  addFields:/*optional object here*/,
  deleteFields:/*optional array here*/,
  renameFields/*optional object here*/
}
Please refer to examples for more information.
```

#### options - in depth

```
transformFields: object that consists of the key value and functions used to transform the data.
```

```
addFields: object that consists of the new key value names and functions used for the new fields.
```

```
deleteFields: array that consists of the strings of the keys to be deleted.``The order of precedence for the operations is transform -> add -> delete -> rename.
```

## Examples

### Example set 1 - BASIC

```js
//arrObj1 used for all examples in set 1
const arrObj1 = [
  { id: 1, enabled: true, name: "Anakin Skywalker" },
  { id: 2, enabled: true, name: "Ahsoka Tano" },
  { id: 3, enabled: false, name: "Darth Maul" }
];
```

```js
//transformFields only
const options1 = {
  transformFields: {
    id: (r) => r.id + 1,
    name: (r) => r.name + " The Chosen One",
    enabled: (r) => (r.enabled = !r.enabled)
  }
};

transform(arrObj1, options1);
//output
[
  { id: 2, enabled: false, name: "Anakin Skywalker The Chosen One" },
  { id: 3, enabled: false, name: "Ahsoka Tano The Chosen One" },
  { id: 4, enabled: true, name: "Darth Maul The Chosen One" }
];
```

```js
//addFields only
const options2 = {
  addFields: {
    alignment: (r) => (r.id < 3 ? "good" : "evil")
  }
};

transform(arrObj1, options2);
//output
[
  { id: 1, enabled: true, name: "Anakin Skywalker", alignment: "good" },
  { id: 2, enabled: true, name: "Ahsoka Tano", alignment: "good" },
  { id: 3, enabled: false, name: "Darth Maul", alignment: "evil" }
];
```

```js
//deleteFields only
const options3 = {
  deleteFields: ["enabled", "id"]
};

transform(arrObj1, options3);
//output
[{ name: "Anakin Skywalker" }, { name: "Ahsoka Tano" }, { name: "Darth Maul" }];
```

```js
//renameFields only
const options4 = {
  renameFields: {
    id: "newId",
    enabled: "newEnabled"
  }
};

transform(arrObj1, options4);
//output
[
  { newId: 1, newEnabled: true, name: "Anakin Skywalker" },
  { newId: 2, newEnabled: true, name: "Ahsoka Tano" },
  { newId: 3, newEnabled: false, name: "Darth Maul" }
];
```

### Example set 2 - INTERMEDIATE

```js
//arrObj2 used for all examples in set 2
const arrObj2 = [
  {
    id: 0,
    series: "bleach",
    status: "enabled",
    name: { firstName: "ichigo", lastName: "kurosaki" },
    team: "soul society",
    hasWife: true
  },
  {
    id: 1,
    series: "naruto",
    status: "enabled",
    name: { firstName: "naruto", lastName: "uzumaki" },
    team: "leaf village",
    hasWife: true
  },
  {
    id: 2,
    series: "fairy tail",
    status: "disabled",
    name: { firstName: "natsu", lastName: "dragneel" },
    team: "fairy tail guild",
    hasWife: false
  }
];
```

```js
options5 = {
  transformFields: {
    id: (r) => ("000" + r.id).slice(-3)
  },
  addFields: {
    firstName: (r) => r.name.firstName,
    lastName: (r) => r.name.lastName,
    enabled: (r) => (r.status === "enabled" ? true : false)
  },
  deleteFields: ["name", "status"],
  renameFields: {
    hasWife: "hasPartner"
  }
};

transform(arrObj2, options5);
//output
[
  {
    id: "000",
    series: "bleach",
    enabled: true,
    firstName: "ichigo",
    lastName: "kurosaki",
    team: "soul society",
    hasPartner: true
  },
  {
    id: "001",
    series: "naruto",
    enabled: true,
    firstName: "naruto",
    lastName: "uzumaki",
    team: "leaf village",
    hasPartner: true
  },
  {
    id: "002",
    series: "fairy tail",
    enabled: false,
    firstName: "natsu",
    lastName: "dragneel",
    team: "fairy tail guild",
    hasPartner: false
  }
];
```

## To-Do

- more intermediate / advance examples
