const pathExists = require("./index");

const obj1 = { country: { province: { city: "Toronto" } } };
const obj2 = { element: { batallion: { unit: { squad: { team: "Alpha" } } } } };
const obj3 = { "123-country": { "123-province": { "123-city": 5 } } };
const obj4 = {
  "123-element": { "123-batallion": { "123-unit": { "123-squad": { "123-team": "Alpha" } } } }
};
const arrObj1 = [{ id: 0, name: "name 0" }, { id: 1, name: "name 1" }];
const arrObj2 = {
  series: "pokemon",
  name: "pikachu",
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

const arr1 = [1, 2, 3];
const arr2 = [1, ["2a", "2b"], 3, ["4a", "4b"]];

describe("arr - object - intermediate", () => {
  it("more complex", () => {
    expect(pathExists(arr1, "0")).toBeTruthy();
    expect(pathExists(arr1, "3")).toBeFalsy();
    expect(pathExists(arr2, "0.0")).toBeFalsy();
    expect(pathExists(arr2, "1.1")).toBeTruthy();
    expect(pathExists(arr2, "3.2.1.0")).toBeFalsy();
  });
});

describe("arr - object - intermediate", () => {
  it("more complex", () => {
    expect(pathExists(arrObj1, "0.id")).toBeTruthy();
    expect(pathExists(arrObj1, "0.name")).toBeTruthy();
    expect(pathExists(arrObj1, "1.id")).toBeTruthy();
    expect(pathExists(arrObj1, "1.name")).toBeTruthy();
    expect(pathExists(arrObj1, "0.id.x")).toBeFalsy();
    expect(pathExists(arrObj1, "0.2.x")).toBeFalsy();
    expect(pathExists(arrObj2, "movies.5")).toBeTruthy();
    expect(pathExists(arrObj2, "movies.1.2")).toBeTruthy();
  });
});

describe("intermediate problem", () => {
  it("array and object", () => {});
});

describe("valid nested paths", () => {
  it("object 1", () => {
    expect(pathExists(obj1, "country")).toBeTruthy();
    expect(pathExists(obj1, "country.province")).toBeTruthy();
    expect(pathExists(obj1, "country.province.city")).toBeTruthy();
  });
  it("object 2", () => {
    expect(pathExists(obj2, "element")).toBeTruthy();
    expect(pathExists(obj2, "element.batallion")).toBeTruthy();
    expect(pathExists(obj2, "element.batallion.unit")).toBeTruthy();
    expect(pathExists(obj2, "element.batallion.unit.squad")).toBeTruthy();
    expect(pathExists(obj2, "element.batallion.unit.squad.team")).toBeTruthy();
  });
});

describe("valid nested paths that can't be used with dot notation", () => {
  it("object 3", () => {
    expect(pathExists(obj3, "123-country")).toBeTruthy();
    expect(pathExists(obj3, "123-country.123-province")).toBeTruthy();
    expect(pathExists(obj3, "123-country.123-province.123-city")).toBeTruthy();
  });
  it("object 4", () => {
    expect(pathExists(obj4, "123-element")).toBeTruthy();
    expect(pathExists(obj4, "123-element.123-batallion")).toBeTruthy();
    expect(pathExists(obj4, "123-element.123-batallion.123-unit")).toBeTruthy();
    expect(pathExists(obj4, "123-element.123-batallion.123-unit.123-squad")).toBeTruthy();
    expect(pathExists(obj4, "123-element.123-batallion.123-unit.123-squad.123-team")).toBeTruthy();
  });
});

describe("invalid nested paths", () => {
  it("object 1", () => {
    expect(pathExists(obj1, "pikachu")).toBeFalsy();
    expect(pathExists(obj1, "country.pikachu")).toBeFalsy();
    expect(pathExists(obj1, "country.province.invalidKey")).toBeFalsy();
  });
  it("object 2", () => {
    expect(pathExists(obj2, "element1")).toBeFalsy();
    expect(pathExists(obj2, "element.batallion1")).toBeFalsy();
    expect(pathExists(obj2, "element.batallion.unit1")).toBeFalsy();
    expect(pathExists(obj2, "element.batallion.unit.squad1")).toBeFalsy();
    expect(pathExists(obj2, "element.batallion.unit.squad.team1")).toBeFalsy();
  });
});

describe("invalid object path format", () => {
  it("invalid", () => {
    expect(pathExists(obj1, "")).toBeFalsy();
    expect(pathExists(obj1, 123)).toBeFalsy();
    expect(pathExists(obj1)).toBeFalsy();
    expect(pathExists(obj1, [])).toBeFalsy();
  });
});

describe("invalid object format", () => {
  it("invalid", () => {
    expect(pathExists("", "country.province.city")).toBeFalsy();
    expect(pathExists(null, "country.province.city")).toBeFalsy();
    expect(pathExists(undefined, "country.province.city")).toBeFalsy();
    expect(pathExists(false, "country.province.city")).toBeFalsy();
  });
});
