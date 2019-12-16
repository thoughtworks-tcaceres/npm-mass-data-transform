const objectPathExists = require("./index");

const obj1 = { country: { province: { city: "Toronto" } } };
const obj2 = { element: { batallion: { unit: { squad: { team: "Alpha" } } } } };
const obj3 = { "123-country": { "123-province": { "123-city": 5 } } };
const obj4 = {
  "123-element": { "123-batallion": { "123-unit": { "123-squad": { "123-team": "Alpha" } } } }
};

describe("valid nested paths", () => {
  it("object 1", () => {
    expect(objectPathExists(obj1, "country")).toBeTruthy();
    expect(objectPathExists(obj1, "country.province")).toBeTruthy();
    expect(objectPathExists(obj1, "country.province.city")).toBeTruthy();
  });
  it("object 2", () => {
    expect(objectPathExists(obj2, "element")).toBeTruthy();
    expect(objectPathExists(obj2, "element.batallion")).toBeTruthy();
    expect(objectPathExists(obj2, "element.batallion.unit")).toBeTruthy();
    expect(objectPathExists(obj2, "element.batallion.unit.squad")).toBeTruthy();
    expect(objectPathExists(obj2, "element.batallion.unit.squad.team")).toBeTruthy();
  });
});

describe("valid nested paths that can't be used with dot notation", () => {
  it("object 3", () => {
    expect(objectPathExists(obj3, "123-country")).toBeTruthy();
    expect(objectPathExists(obj3, "123-country.123-province")).toBeTruthy();
    expect(objectPathExists(obj3, "123-country.123-province.123-city")).toBeTruthy();
  });
  it("object 4", () => {
    expect(objectPathExists(obj4, "123-element")).toBeTruthy();
    expect(objectPathExists(obj4, "123-element.123-batallion")).toBeTruthy();
    expect(objectPathExists(obj4, "123-element.123-batallion.123-unit")).toBeTruthy();
    expect(objectPathExists(obj4, "123-element.123-batallion.123-unit.123-squad")).toBeTruthy();
    expect(
      objectPathExists(obj4, "123-element.123-batallion.123-unit.123-squad.123-team")
    ).toBeTruthy();
  });
});

describe("invalid nested paths", () => {
  it("object 1", () => {
    expect(objectPathExists(obj1, "pikachu")).toBeFalsy();
    expect(objectPathExists(obj1, "country.pikachu")).toBeFalsy();
    expect(objectPathExists(obj1, "country.province.invalidKey")).toBeFalsy();
  });
  it("object 2", () => {
    expect(objectPathExists(obj2, "element1")).toBeFalsy();
    expect(objectPathExists(obj2, "element.batallion1")).toBeFalsy();
    expect(objectPathExists(obj2, "element.batallion.unit1")).toBeFalsy();
    expect(objectPathExists(obj2, "element.batallion.unit.squad1")).toBeFalsy();
    expect(objectPathExists(obj2, "element.batallion.unit.squad.team1")).toBeFalsy();
  });
});

describe("invalid object path format", () => {
  it("invalid", () => {
    expect(objectPathExists(obj1, "")).toBeFalsy();
    expect(objectPathExists(obj1, 123)).toBeFalsy();
    expect(objectPathExists(obj1)).toBeFalsy();
    expect(objectPathExists(obj1, [])).toBeFalsy();
  });
});

describe("invalid object format", () => {
  it("invalid", () => {
    expect(objectPathExists({}, "country")).toBeFalsy();
    expect(objectPathExists([], "country.province")).toBeFalsy();
    expect(objectPathExists("", "country.province.city")).toBeFalsy();
    expect(objectPathExists(null, "country.province.city")).toBeFalsy();
    expect(objectPathExists(undefined, "country.province.city")).toBeFalsy();
    expect(objectPathExists(false, "country.province.city")).toBeFalsy();
  });
});
