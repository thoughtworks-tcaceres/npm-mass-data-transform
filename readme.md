## object-path-exists

---

Determines if the path of an object is valid.  
This library supports arrays that are nested in objects.  
Returns true if path exists. Returns false if path does not exist.

## Installing

---

```
npm install object-path-exists
yarn add object-path-exists
```

## Initializing

---

```js
import objectPathExists from "objectPathExists";
var objectPathExists = require("objectPathExists");
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
objectPathExists(obj1, "country"); //true
objectPathExists(obj1, "country.province"); //true
objectPathExists(obj1, "country.province.city"); //true

//invalid paths
objectPathExists(obj1, "pikachu"); //false
objectPathExists(obj1, "country.pikachu"); //false
objectPathExists(obj1, "country.province.invalidKey"); //false;
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
objectPathExists(obj2, "element"); //true
objectPathExists(obj2, "element.batallion"); //true
objectPathExists(obj2, "element.batallion.unit"); //true
objectPathExists(obj2, "element.batallion.unit.squad"); //true
objectPathExists(obj2, "element.batallion.unit.squad.team"); //true

//invalid paths
objectPathExists(obj2, "element1"); //false
objectPathExists(obj2, "element.batallion1"); //false
objectPathExists(obj2, "element.batallion.unit1"); //false
objectPathExists(obj2, "element.batallion.unit.squad1"); //false
objectPathExists(obj2, "element.batallion.unit.squad.team1"); //false
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
objectPathExists(obj3, "123-country"); //true
objectPathExists(obj3, "123-country.123-province"); //true
objectPathExists(obj3, "123-country.123-province.123-city"); //true

//invalid path format
objectPathExists(obj1, ""); //false
objectPathExists(obj1, 123); //false
objectPathExists(obj1); //false
objectPathExists(obj1, []); //false
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
objectPathExists(obj4, "123-element"); //true
objectPathExists(obj4, "123-element.123-batallion"); //true
objectPathExists(obj4, "123-element.123-batallion.123-unit"); //true
objectPathExists(obj4, "123-element.123-batallion.123-unit.123-squad"); //true
objectPathExists(obj4, "123-element.123-batallion.123-unit.123-squad.123-team"); //true

//invalid object format
objectPathExists({}, "country"); //false
objectPathExists([], "country.province"); //false
objectPathExists("", "country.province.city"); //false
objectPathExists(null, "country.province.city"); //false
objectPathExists(undefined, "country.province.city"); //false
objectPathExists(false, "country.province.city"); //false
```

## TO DO

- [ ] create more advanced examples
- [ ] create section showing when to use when rendering objects (e.g in react instead)
- [ ] create table of contents
