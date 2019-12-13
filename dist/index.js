const objectPathExists = (object, objectPath) => {
  const isObject = Object.prototype.toString.call(object) === "[object Object]";
  const isString = typeof objectPath === "string";

  if (!isObject || !isString) {
    return false;
  }

  const path = objectPath.split(".");
  let concatenatedPath = "";
  for (const varPath of path) {
    concatenatedPath += `['${varPath}']`;
    let data = eval(`object${concatenatedPath}`);
    if (!data) {
      return false;
    }
  }
  return true;
};

module.exports = objectPathExists;
