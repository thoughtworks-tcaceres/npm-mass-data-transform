## object-array-path-exists

---

Determines if the path of an object or array is valid.  
This library supports arrays that are nested in objects.  
Returns true if path exists. Returns false if path does not exist.

## Installing

---

```
npm install object-array-path-exists
yarn add object-array-path-exists
```

## Initializing

---

```js
import pathExists from "object-array-path-exists";
var pathExists = require("object-array-path-exists");
```

## Example

---

### Example 1 - BASIC

```js
//basic object
const obj1 = {
  country: {
    province: {
      city: "Toronto"
    }
  }
};

//valid paths
pathExists(obj1, "country"); //true
pathExists(obj1, "country.province"); //true
pathExists(obj1, "country.province.city"); //true

//invalid paths
pathExists(obj1, "pikachu"); //false
pathExists(obj1, "country.pikachu"); //false
pathExists(obj1, "country.province.invalidKey"); //false;
```

```js
//basic object
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

//valid paths
pathExists(obj2, "element"); //true
pathExists(obj2, "element.batallion"); //true
pathExists(obj2, "element.batallion.unit"); //true
pathExists(obj2, "element.batallion.unit.squad"); //true
pathExists(obj2, "element.batallion.unit.squad.team"); //true

//invalid paths
pathExists(obj2, "element1"); //false
pathExists(obj2, "element.batallion1"); //false
pathExists(obj2, "element.batallion.unit1"); //false
pathExists(obj2, "element.batallion.unit.squad1"); //false
pathExists(obj2, "element.batallion.unit.squad.team1"); //false
```

### Example 2 - INTERMEDIATE

```js
//object - non standard key (bracket notation)
const obj3 = {
  "123-country": {
    "123-province": {
      "123-city": "Toronto"
    }
  }
};

//valid paths
pathExists(obj3, "123-country"); //true
pathExists(obj3, "123-country.123-province"); //true
pathExists(obj3, "123-country.123-province.123-city"); //true

//invalid path format
pathExists(obj1, ""); //false
pathExists(obj1, 123); //false
pathExists(obj1); //false
pathExists(obj1, []); //false
```

```js
//object - non standard key (bracket notation)
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
pathExists(obj4, "123-element.123-batallion"); //true
pathExists(obj4, "123-element.123-batallion.123-unit"); //true
pathExists(obj4, "123-element.123-batallion.123-unit.123-squad"); //true
pathExists(obj4, "123-element.123-batallion.123-unit.123-squad.123-team"); //true

//invalid object/array format
pathExists("", "country.province.city"); //false
pathExists(null, "country.province.city"); //false
pathExists(undefined, "country.province.city"); //false
pathExists(false, "country.province.city"); //false
```

## TO DO

- [ ] create array examples
- [ ] trim down number of examples: more breadth, less depth
- [ ] create combination of array/object examples
- [ ] create section showing when to use when rendering objects (e.g in react instead)
- [ ] create table of contents
