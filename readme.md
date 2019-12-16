## object-array-path-exists

Determines if the path of an object or array is valid.  
This library supports arrays that are nested in objects.  
Returns true if path exists. Returns false if path does not exist.

## Installing

```
npm install object-array-path-exists
yarn add object-array-path-exists
```

## Initializing

```js
import pathExists from "object-array-path-exists";
var pathExists = require("object-array-path-exists");
```

## Examples

### Example set 1 - BASIC

```js
//basic nested object
const obj1 = {
  country: {
    province: {
      city: "Toronto"
    }
  }
};

//valid
pathExists(obj1, "country"); //true
pathExists(obj1, "country.province.city"); //true

//invalid
pathExists(obj1, "country.pikachu"); //false
pathExists(obj1, "country.province.invalidKey"); //false;
```

```js
//basic nested object
const obj2 = {
  element: {
    batallion: {
      unit: {
        squad: {
          team: "Alpha"
        }
      }
    }
  }
};

//valid
pathExists(obj2, "element"); //true
pathExists(obj2, "element.batallion.unit.squad.team"); //true

//invalid
pathExists(obj2, "element1"); //false
pathExists(obj2, "element.batallion.unit.squad.team1"); //false
```

```js
//basic array
const arr1 = [1, 2, 3];

//valid
pathExists(arr1, "0"); //true
pathExists(arr1, "2"); //true

//invalid
pathExists(arr1, "3"); //false
pathExists(arr2, "0.0"); //false
```

```js
//basic nested array
const arr2 = [1, ["2a", "2b"], 3, ["4a", "4b"]];

//valid
pathExists(arr2, "1.1"); //true
pathExists(arr2, "3.0"); //true

//invalid
pathExists(arr2, "0.0"); //false
pathExists(arr2, "3.2.1.0"); //false
```

### Example set 2 - INTERMEDIATE

```js
//nested object - non standard key (bracket notation)
const obj3 = {
  "123-country": {
    "123-province": {
      "123-city": "Toronto"
    }
  }
};

//valid
pathExists(obj3, "123-country"); //true
pathExists(obj3, "123-country.123-province.123-city"); //true

//invalid (Note: incorrect path formats)
pathExists(obj1, 123); //false
pathExists(obj1); //false
pathExists(obj1, []); //false
```

```js
//nested object - non standard key (bracket notation)
const obj4 = {
  "123-element": {
    "123-batallion": {
      "123-unit": {
        "123-squad": {
          "123-team": "Alpha"
        }
      }
    }
  }
};

//valid paths
pathExists(obj4, "123-element"); //true
pathExists(obj4, "123-element.123-batallion.123-unit.123-squad.123-team"); //true

//invalid (Note: incorrect object/array format)
pathExists("", "country.province.city"); //false
pathExists(null, "country.province.city"); //false
pathExists(undefined, "country.province.city"); //false
pathExists(false, "country.province.city"); //false
```

### Example set 3 - ADVANCED

```js
//object and array combination
const arrObj1 = [{ id: 0, name: "name 0" }, { id: 1, name: "name 1" }];

//valid
pathExists(arrObj1, "0.id"); //true
pathExists(arrObj1, "1.name"); //true

//invalid
pathExists(arrObj1, "0.id.x"); //false
pathExists(arrObj1, "0.2.x"); //false
```

```js
//object and array combination
const arrObj2 = {
  series: "pokemon",
  name: {
    firstName: "pika",
    lastName: "chu"
  },
  type: "electric",
  species: "mouse",
  movies: [
    "movie 0",
    ["movie 1a", "movie 1b", "movie 1c"],
    "movie 2",
    "movie 3",
    "movie 4",
    "movie 5"
  ]
};

//valid
pathExists(arrObj2, "movies.5"); //true
pathExists(arrObj2, "movies.1.2"); //true

//invalid
pathExists(arrObj2, "name.middleName"); //false
pathExists(arrObj2, "movies.2.0"); //false
```

## TO DO

~~- create array examples~~  
~~- trim down number of examples: more breadth, less depth~~  
~~- create combination of array/object examples~~

- create section showing when to use when rendering objects (e.g in react instead)
- create table of contents
