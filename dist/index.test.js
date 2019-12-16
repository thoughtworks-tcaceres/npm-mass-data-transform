const pathExists = require("./index");

const obj1 = { country: { province: { city: "Toronto" } } };
const obj2 = { element: { batallion: { unit: { squad: { team: "Alpha" } } } } };
const obj3 = { "123-country": { "123-province": { "123-city": 5 } } };
const obj4 = {
  "123-element": { "123-batallion": { "123-unit": { "123-squad": { "123-team": "Alpha" } } } }
};
const obj5 = [{ id: 1, name: "name 1" }, { id: 2, name: "name 2" }];

describe("more complex", () => {
  it("more complex", () => {
    console.log(obj5[0]);
    expect(pathExists(obj5, "0.id")).toBeTruthy();
    expect(pathExists(obj5, "0.name")).toBeTruthy();
    expect(pathExists(obj5, "1.id")).toBeTruthy();
    expect(pathExists(obj5, "1.name")).toBeTruthy();
    expect(pathExists(obj5, "0.id.x")).toBeFalsy();
  });
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
