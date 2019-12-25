/** Returns true if path exists, false otherwise.
 * @param {*} object object/array to reference
 * @param {*} objectPath Path to get to the specific endpoint. Each key is seperated by a dot. e.g: 'country.province.city'
 ** notation: pathExists(object,objectPath)
 ** example: const obj1 = {a:1,b:[1,2,3]}
 *** objectPathExists(obj1,"b.1") //true
 *** objctPathExists(obj1,"a.x.2") //false
 */
const dataTransform = (
  arrObjOrig,
  { transformFields = {}, addFields = {}, deleteFields = [], renameFields = {} }
) => {
  let arrObj = JSON.parse(JSON.stringify(arrObjOrig));
  let newArr = arrObj.map((record) => {
    const newObj = {};
    for (const i in record) {
      if (transformFields.hasOwnProperty(i)) {
        newObj[i] = transformFields[i](record);
      } else {
        newObj[i] = record[i];
      }
    }

    for (const i in addFields) {
      newObj[i] = addFields[i](record);
    }

    for (const i of deleteFields) {
      delete newObj[i];
    }

    for (const i in renameFields) {
      if (newObj.hasOwnProperty(i)) {
        let temp = JSON.parse(JSON.stringify(newObj[i]));
        newObj[renameFields[i]] = JSON.parse(JSON.stringify(temp));
        delete newObj[i];
      }
    }
    return newObj;
  });

  return newArr;
};

module.exports = dataTransform;
