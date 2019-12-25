const dataTransform = require("./index");

const arrObj1 = [
  { id: 1, enabled: true, name: "Anakin Skywalker" },
  { id: 2, enabled: true, name: "Ahsoka Tano" },
  { id: 3, enabled: false, name: "Darth Maul" }
];

const options1 = {
  transformFields: {
    id: (r) => r.id + 1,
    name: (r) => r.name + " The Chosen One",
    enabled: (r) => (r.enabled = !r.enabled)
  }
};

const options2 = {
  addFields: {
    alignment: (r) => (r.id < 3 ? "good" : "evil")
  }
};

const options3 = {
  deleteFields: ["enabled", "id"]
};

const options4 = {
  renameFields: {
    id: "newId",
    enabled: "newEnabled",
    fakeName: "newName"
  }
};

describe("basic", () => {
  it("only transform fields", () => {
    expect(dataTransform(arrObj1, options1)).toStrictEqual([
      { id: 2, enabled: false, name: "Anakin Skywalker The Chosen One" },
      { id: 3, enabled: false, name: "Ahsoka Tano The Chosen One" },
      { id: 4, enabled: true, name: "Darth Maul The Chosen One" }
    ]);
  });
  it("only adds fields", () => {
    expect(dataTransform(arrObj1, options2)).toStrictEqual([
      { id: 1, enabled: true, name: "Anakin Skywalker", alignment: "good" },
      { id: 2, enabled: true, name: "Ahsoka Tano", alignment: "good" },
      { id: 3, enabled: false, name: "Darth Maul", alignment: "evil" }
    ]);
  });
  it("only deletes fields", () => {
    expect(dataTransform(arrObj1, options3)).toStrictEqual([
      { name: "Anakin Skywalker" },
      { name: "Ahsoka Tano" },
      { name: "Darth Maul" }
    ]);
  });
  it("only renames fields", () => {
    expect(dataTransform(arrObj1, options4)).toStrictEqual([
      { newId: 1, newEnabled: true, name: "Anakin Skywalker" },
      { newId: 2, newEnabled: true, name: "Ahsoka Tano" },
      { newId: 3, newEnabled: false, name: "Darth Maul" }
    ]);
  });
});
